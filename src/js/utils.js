import { themeChange } from "theme-change";
import ArrivalFlightsList from "../components/ArrivalsFlightsList";
import DepartureFlightsList from "../components/DepartureFlightsList";
import { fetchAirports } from "./api";
import { countries, loadCountries, setImageSrc } from "./helpers";
import {
  airportInput,
  clearButton,
  countryInput,
  heroImage,
  invalidText,
  mainForm,
  navLogo,
  themeSelector,
} from "./const";

// Set images src based on theme saved to local storage.
themeChange();
setImageSrc(navLogo);
setImageSrc(heroImage);
loadCountries();
export let airports = [];

countryInput.addEventListener("input", validateCountry);
themeSelector.addEventListener("click", handleThemeSelector);
clearButton.addEventListener("click", handleClearButton);
countryInput.addEventListener("blur", validateCountry);
mainForm.addEventListener("submit", handleFormSubmit);

function handleThemeSelector() {
  setTimeout(() => {
    setImageSrc(navLogo);
    setImageSrc(heroImage);
  }, 20);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const countryCode = countryInput.dataset.value;
  const depFlightsList = new DepartureFlightsList(countryCode);
  const arrFlightsList = new ArrivalFlightsList(countryCode);
  depFlightsList.createList(airportInput.dataset.value);
  arrFlightsList.createList(airportInput.dataset.value);
}

function handleClearButton() {
  location.reload();
}

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
