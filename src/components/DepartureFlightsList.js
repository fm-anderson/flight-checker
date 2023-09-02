import { fetchDepFlights } from "../js/api";
import { heroDiv, template } from "../js/const";
import FlightsList from "./FlightsList";

export default class DepartureFlightsList extends FlightsList {
  constructor(countryCode) {
    super(countryCode, "departure");
  }
  async createList(airportCode) {
    this.showClearButton();
    heroDiv.classList.add("hidden");

    await this.fetchAirlines();
    const flights = await fetchDepFlights(airportCode);
    const validFlights = await this.getValidFlights(flights);
    const sortedFlights = this.sortFlights(validFlights);

    const table = document.importNode(template.content, true);

    const originHeader = table.querySelector("th:nth-child(4)");
    const destinHeader = table.querySelector("th:nth-child(5)");
    if (this.type === "departure") {
      originHeader.className = "hidden md:table-cell";
    } else if (this.type === "arrival") {
      destinHeader.className = "hidden md:table-cell";
    }

    const tableDiv = table.querySelector("div");
    tableDiv.id = "dep-table";

    const title = table.querySelector(".flights__title");
    title.textContent = "departure";

    const tableBody = table.querySelector("#table-content");

    for (let flight of sortedFlights) {
      if (this.flightCounter >= 50) {
        break;
      }
      const row = this.createFlightRow(flight, "departure");
      tableBody.appendChild(row);
      this.flightCounter++;
    }

    const tableContainer = document.querySelector("#dep-container");
    tableContainer.appendChild(table);
  }
}
