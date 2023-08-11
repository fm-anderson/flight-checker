import ArrivalFlightsList from "../components/ArrivalsFlightsList";
import DepartureFlightsList from "../components/DepartureFlightsList";
import { fetchCountries, fetchAirports } from "./api";
import { themeChange } from "theme-change";
import {
  airportInput,
  clearButton,
  countryInput,
  heroDiv,
  invalidText,
  mainForm,
} from "./const";

themeChange();
const depFlightsList = new DepartureFlightsList();
const arrFlightsList = new ArrivalFlightsList();
let countries = await fetchCountries();
export let airports = [];

async function validateCountry() {
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
  document.querySelector("#dep-table").remove();
  document.querySelector("#arr-table").remove();
  countryInput.value = null;
  countryInput.dataset.value = null;
  airportInput.value = null;
  airportInput.dataset.value = null;
  clearButton.classList.add("hidden");
});
countryInput.addEventListener("blur", validateCountry);
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  depFlightsList.createList(airportInput.dataset.value);
  arrFlightsList.createList(airportInput.dataset.value);
});
