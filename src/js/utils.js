import {
  fetchCountries,
  fetchAirports,
  fetchDepFlights,
  fetchAirlineName,
  fetchArrFlights,
} from "./api";
import {
  airportInput,
  clearButton,
  countryInput,
  heroDiv,
  invalidText,
  mainForm,
  resFields,
  template,
} from "./const";
import { parseTime } from "./helpers";

let countries = await fetchCountries();
export let airports = [];

export async function validateCountry() {
  const inputVal = countryInput.value.trim();
  const countryCode = countryInput.dataset.value;
  const isValidCountry = countries.some(
    (country) => country.label.toLowerCase() === inputVal.toLowerCase()
  );

  if (!isValidCountry && inputVal !== "") {
    setTimeout(() => {
      invalidText.innerText = "Invalid country.";
    }, 100);
  } else {
    invalidText.innerText = "";
    airports = await fetchAirports(countryCode);
  }
}

countryInput.addEventListener("input", validateCountry);
clearButton.addEventListener("click", () => {
  heroDiv.classList.remove("hidden");
  const depTable = document.querySelector("#dep-table");
  if (depTable) {
    depTable.remove();
  }
});
countryInput.addEventListener("blur", validateCountry);
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createDepFlightsList(airportInput.dataset.value);
  createArrFlightsList(airportInput.dataset.value);
});

// departure flights list
async function createDepFlightsList(airportCode) {
  heroDiv.classList.add("hidden");

  const flights = await fetchDepFlights(airportCode);

  const validFlights = flights.filter((flight) => {
    return resFields.every(
      (field) => flight[field] !== null && flight[field] !== undefined
    );
  });

  const sortedFlights = validFlights.sort((a, b) => {
    const arrivalTimeA = new Date(a.arr_time).getTime();
    const arrivalTimeB = new Date(b.arr_time).getTime();
    return arrivalTimeA - arrivalTimeB;
  });

  const table = document.importNode(template.content, true);
  const tableDiv = table.querySelector("div");
  tableDiv.id = "dep-table";
  const title = table.querySelector("#table-title");
  title.textContent = "departure";
  const tableBody = table.querySelector("#table-content");

  let flightCounter = 0;

  await Promise.all(
    sortedFlights.map(async (flight) => {
      if (flightCounter >= 50) {
        return;
      }
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
      const airlineName = await fetchAirlineName(flight.airline_iata);
      airlineData.textContent = airlineName;
      row.appendChild(airlineData);

      const flightDataElem = document.createElement("td");
      flightDataElem.textContent = flight.flight_iata;
      row.appendChild(flightDataElem);

      const originData = document.createElement("td");
      originData.textContent = flight.dep_iata;
      row.appendChild(originData);

      const statusData = document.createElement("td");
      statusData.textContent = flight.status;
      row.appendChild(statusData);

      tableBody.appendChild(row);
      flightCounter++;
    })
  );
  const tableContainer = document.querySelector("#dep-container");
  tableContainer.appendChild(table);
}

// arrivals flights list
async function createArrFlightsList(airportCode) {
  heroDiv.classList.add("hidden");

  const flights = await fetchArrFlights(airportCode);

  const validFlights = flights.filter((flight) => {
    return resFields.every(
      (field) => flight[field] !== null && flight[field] !== undefined
    );
  });

  const sortedFlights = validFlights.sort((a, b) => {
    const arrivalTimeA = new Date(a.arr_time).getTime();
    const arrivalTimeB = new Date(b.arr_time).getTime();
    return arrivalTimeA - arrivalTimeB;
  });

  const table = document.importNode(template.content, true);
  const tableDiv = table.querySelector("div");
  tableDiv.id = "arr-table";
  const title = table.querySelector("#table-title");
  title.textContent = "arrivals";
  const tableBody = table.querySelector("#table-content");

  let flightCounter = 0;

  await Promise.all(
    sortedFlights.map(async (flight) => {
      if (flightCounter >= 50) {
        return;
      }
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
      const airlineName = await fetchAirlineName(flight.airline_iata);
      airlineData.textContent = airlineName;
      row.appendChild(airlineData);

      const flightDataElem = document.createElement("td");
      flightDataElem.textContent = flight.flight_iata;
      row.appendChild(flightDataElem);

      const originData = document.createElement("td");
      originData.textContent = flight.dep_iata;
      row.appendChild(originData);

      const statusData = document.createElement("td");
      statusData.textContent = flight.status;
      row.appendChild(statusData);

      tableBody.appendChild(row);
      flightCounter++;
    })
  );
  const tableContainer = document.querySelector("#arr-container");
  tableContainer.appendChild(table);
}
