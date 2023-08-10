import { fetchCountries, fetchAirports } from "./api";
import { countryInput, invalidText } from "./const";

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
countryInput.addEventListener("blur", validateCountry);
