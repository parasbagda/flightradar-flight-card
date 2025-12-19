import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import * as v from 'valibot';

import { CARD_NAME, CardConfig, DEFAULT_CONFIG } from './const';
import { AreaFlight } from './flight-area-card';
import { KeyString, localize } from './localize/localize';
import { cardStyles, resetStyles } from './styles';
import { ChangedProps, HomeAssistant } from './types/homeassistant';
import { computeAirlineIcao, getAirlineName } from './utils/airline-icao';
import { hasConfigChanged, hasEntityChanged } from './utils/has-changed';
import { areaFlightSchema, mostTrackedFlightSchema } from './utils/schemas';
import { defined } from './utils/type-guards';

@customElement(CARD_NAME)
export class FlightradarFlightCard extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config!: CardConfig;

  static styles = [resetStyles, cardStyles];

  public setConfig(config: Partial<CardConfig>): void {
    if (!config.entities || config.entities.length === 0) {
      throw new Error('Please define at least one entity');
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      entities: config.entities,
    };
  }

  public getCardSize(): number {
    return 3;
  }

  protected shouldUpdate(changedProps: ChangedProps): boolean {
    if (!this._config) {
      return false;
    }

    return (
      hasConfigChanged(this.hass, changedProps) ||
      hasEntityChanged(
        this.hass,
        changedProps,
        this._config.entities.map((entity) => entity.entity_id)
      )
    );
  }

  protected render() {
    if (!this._config || !this.hass) {
      console.error('Missing config or hass');
      return html`<hui-error-card>Something went wrong: check console for errors</hui-error-card>`;
    }

    const t = (key: KeyString, params?: Record<string, string>) => {
      return localize(key, this.hass.locale.language, params);
    };

    const entries = this._config.entities
      .map((entity) => {
        const stateObj = this.hass.states[entity.entity_id];
        if (!stateObj) {
          console.error(`Entity not found: ${entity.entity_id}`);
          return undefined;
        }

        const data = stateObj.attributes.flights[0];

        return {
          title: entity.title,
          flight: v.parse(
            v.fallback(
              v.union([
                mostTrackedFlightSchema,
                areaFlightSchema,
                v.object({ _type: v.literal('unknown') }),
              ]),
              { _type: 'unknown' }
            ),
            data
          ),
        };
      })
      .filter(defined)
      .sort((a, b) => {
        // Put not passed schema objects at the end
        if (a.flight._type === 'unknown') return 1;
        if (b.flight._type === 'unknown') return -1;
        return 0;
      });

    const { flight: f, title: cardTitle } = entries[0];

    if (f._type === 'area') {
      const distance = f.closest_distance ?? f.distance;

      const flight: AreaFlight = {
        id: f.id,
        title: cardTitle || t('title.default_area'),
        flightNumber: f.flight_number,
        callsign: f.callsign,
        airlineIcao:
          f.airline_icao ??
          computeAirlineIcao({
            flightNumber: f.flight_number,
            callsign: f.callsign,
          }),
        get airlineLabel() {
          const airline = f.airline_short || f.airline;

          if (airline === 'Private owner') {
            return t('airline.private');
          }

          return airline;
        },
        aircraftRegistration: f.aircraft_registration,
        aircraftPhoto: f.aircraft_photo_small,
        aircraftCode: f.aircraft_code,
        aircraftModel: f.aircraft_model,
        origin: f.airport_origin_city,
        destination: f.airport_destination_city,
        distance,
        altitude: f.altitude,
        groundSpeed: f.ground_speed,
        departureTime: f.time_real_departure ?? undefined,
        arrivalTime: f.time_estimated_arrival ?? f.time_scheduled_arrival ?? undefined,
        get isLive() {
          if (!this.arrivalTime) return false;

          return this.arrivalTime > Date.now() / 1000;
        },
      };

      return html`<flight-area-card .hass=${this.hass} .flight=${flight}></flight-area-card>`;
    }

    if (f._type === 'tracked') {
      const airlineIcao = computeAirlineIcao({
        flightNumber: f.flight_number,
        callsign: f.callsign,
      });

      const airlineLabel = airlineIcao ? getAirlineName(airlineIcao) : null;

      const flight: AreaFlight = {
        id: f.id,
        title: cardTitle || t('title.default_mosttracked'),
        flightNumber: f.flight_number,
        callsign: f.callsign,
        airlineIcao,
        airlineLabel,
        aircraftRegistration: null,
        aircraftPhoto: null,
        aircraftCode: f.aircraft_code,
        aircraftModel: f.aircraft_model,
        origin: f.airport_origin_city,
        destination: f.airport_destination_city,
        isLive: true,
      };

      return html`<flight-area-card .hass=${this.hass} .flight=${flight}></flight-area-card>`;
    }

    return html`<hui-error-card>Unhandled flight type</hui-error-card>`;
  }
}
