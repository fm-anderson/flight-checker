import { themeChange } from "theme-change";
import ArrivalFlightsList from "../components/ArrivalsFlightsList";
import DepartureFlightsList from "../components/DepartureFlightsList";
import { fetchCountries, fetchAirports } from "./api";
import { clearInputs, setImageSrc } from "./helpers";
import {
  airportInput,
  clearButton,
  countryInput,
  heroDiv,
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

// const countries = await fetchCountries();
export let airports = [];

countryInput.addEventListener("input", validateCountry);
themeSelector.addEventListener("click", handleThemeSelector);
clearButton.addEventListener("click", handleClearButton);
countryInput.addEventListener("blur", validateCountry);
mainForm.addEventListener("submit", handleFormSubmit);

function handleThemeSelector() {
  setImageSrc(heroImage);
  setImageSrc(navLogo);
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
  // heroDiv.classList.remove("hidden");
  // document.querySelector("#dep-table").remove();
  // document.querySelector("#arr-table").remove();
  // clearInputs(countryInput);
  // clearInputs(airportInput);
  // clearButton.classList.add("hidden");
  location.reload();
}

async function validateCountry() {
  const countries = await fetchCountries();
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
