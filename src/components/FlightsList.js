import { fetchAirlines } from "../js/api";
import { resFields } from "../js/const";
import { parseTime } from "../js/helpers";

export default class FlightsList {
  constructor(countryCode) {
    this.flightCounter = 0;
    this.airlinesMap = {};
    this.countryCode = countryCode;
  }

  async fetchAirlines() {
    const allAirlines = await fetchAirlines(this.countryCode);
    const validAirlines = allAirlines.filter(
      (airline) => airline.name && airline.iata_code.length !== 3
    );
    validAirlines.forEach((airline) => {
      this.airlinesMap[airline.iata_code] = airline.name;
    });
  }

  async getValidFlights(flights) {
    return flights.filter((flight) => {
      const isValidFields = resFields.every(
        (field) => flight[field] !== null && flight[field] !== undefined
      );
      const isAirlinePresent = !!this.airlinesMap[flight.airline_iata];
      return isValidFields && isAirlinePresent;
    });
  }

  showClearButton() {
    const clearButton = document.querySelector("#clear-button");
    if (clearButton) {
      clearButton.classList.remove("hidden");
    }
  }

  sortFlights(flights) {
    return flights.sort((a, b) => {
      const arrivalTimeA = new Date(a.arr_time).getTime();
      const arrivalTimeB = new Date(b.arr_time).getTime();
      return arrivalTimeA - arrivalTimeB;
    });
  }

  createFlightRow(flight) {
    const row = document.createElement("tr");
    const timeData = document.createElement("td");

    if (flight.arr_delayed) {
      const delayedTimeSpan = document.createElement("span");
      delayedTimeSpan.className = "text-red-600 line-through";
      delayedTimeSpan.textContent = parseTime(new Date(flight.arr_time));
      timeData.appendChild(delayedTimeSpan);

      const estimatedTimeText = document.createTextNode(
        ` ${parseTime(new Date(flight.arr_estimated))}`
      );
      timeData.appendChild(estimatedTimeText);
    } else {
      timeData.textContent = parseTime(new Date(flight.arr_time));
    }
    row.appendChild(timeData);

    const airlineData = document.createElement("td");
    const airlineName = this.airlinesMap[flight.airline_iata];
    airlineData.textContent = airlineName;
    row.appendChild(airlineData);

    const flightDataElem = document.createElement("td");
    flightDataElem.textContent = flight.flight_iata;
    row.appendChild(flightDataElem);

    const originData = document.createElement("td");
    originData.textContent = flight.dep_iata;
    row.appendChild(originData);

    const destinationData = document.createElement("td");
    destinationData.textContent = flight.arr_iata;
    row.appendChild(destinationData);

    const statusData = document.createElement("td");
    statusData.textContent = flight.status;
    row.appendChild(statusData);

    return row;
  }
}
