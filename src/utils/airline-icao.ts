import { AIRLINE_LOGOS } from 'virtual:airline-logos';

import airlinesList from './airline-icao-list.json';

export { AIRLINE_LOGOS as airlineLogos };

type AirlineIcao = (typeof AIRLINE_LOGOS)[number];

export function isValidAirlineLogo(airlineIcao?: string | null): airlineIcao is AirlineIcao {
  if (!airlineIcao) return false;

  return AIRLINE_LOGOS.includes(airlineIcao);
}

export function computeAirlineIcao({
  flightNumber,
  callsign,
}: {
  flightNumber: string | null;
  callsign: string | null;
}): AirlineIcao | null {
  for (const input of [flightNumber, callsign]) {
    if (input && input.length >= 3) {
      const icao = input.slice(0, 3).toUpperCase();

      if (isValidAirlineLogo(icao)) {
        return icao;
      }
    }
  }

  return null;
}

export function getAirlineName(airlineIcao: string): string | null {
  const airline = airlinesList.find((airline) => airline.icao === airlineIcao);
  return airline?.name ?? null;
}
