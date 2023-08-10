import { fetchCountries, fetchAirports, fetchFlights } from "./api";
import {
  airportInput,
  clearButton,
  countryInput,
  heroDiv,
  invalidText,
  mainContent,
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
  createFlightsList(airportInput.dataset.value);
});

//         --         FETCH FLIGTH LOGIC TEMPORARILY HERE         --         //

async function createFlightsList(airportCode) {
  heroDiv.classList.add("hidden");

  const flights = await fetchFlights(airportCode);

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
  const tableBody = table.querySelector("#table-content");

  sortedFlights.forEach((flight) => {
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
    airlineData.textContent = flight.airline_iata;
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
    mainContent.appendChild(table);
  });
}
