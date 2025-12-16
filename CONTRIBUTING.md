# Contributing

## Airline ICAO

Package relies on airline icao list to map the ICAO to the airline name, it's stored in file [airline-icao-list.json](./src/utils/airline-icao-list.json).

Here is an [online list](https://www.flightradar24.com/data/airlines) for all available airlines.

To update, I recommend using this package: [FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI)

It also stores airline icons inside public directory, code will check if it has a logo to display it.
