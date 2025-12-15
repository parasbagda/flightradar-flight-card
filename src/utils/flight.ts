/**
 * Generates a label and URL for a flight, using the provided data.
 * URL path changes based on availability of some properties.
 *
 * @returns {{label: string, url: URL|null}} Object containing the label to display and a Flightradar24 URL.
 */
export function getFlightLabel(data: {
  id: string;
  flightNumber: string | null;
  callsign: string | null;
  aircraftRegistration: string | null;
  aircraftCode: string;
  isLive: boolean;
}): { label: string; url: URL | null } {
  if (
    !data.flightNumber &&
    (!data.callsign || data.callsign === 'Blocked') &&
    !data.aircraftRegistration
  ) {
    return { label: data.aircraftCode, url: null };
  }

  const url = new URL(`https://www.flightradar24.com`);
  url.pathname = `/data/aircraft/${data.aircraftRegistration}`;

  if (data.flightNumber) {
    url.pathname = `/data/flights/${data.flightNumber}`;
  }

  if (data.isLive) {
    const urlPath = [data.id];

    if (data.callsign) {
      urlPath.unshift(data.callsign);
    } else if (data.aircraftCode) {
      urlPath.unshift(data.aircraftCode);
    }

    url.pathname = `/${urlPath.join('/')}`;
  }

  const label =
    data.flightNumber ?? data.callsign ?? data.aircraftRegistration ?? data.aircraftCode;

  return { label, url };
}
