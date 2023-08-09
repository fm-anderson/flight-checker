import { fetchCountries, fetchAirports, fetchFlights } from "./api";

const navbar = document.querySelector("#navbar");
const content = document.querySelector("#content");
const footer = document.querySelector("#footer");

navbar.addEventListener("click", (e) =>
  console.log("navbar clicked", e.target)
);
content.addEventListener("click", (e) =>
  console.log("navbar clicked", e.target)
);
footer.addEventListener("click", (e) =>
  console.log("navbar clicked", e.target)
);
