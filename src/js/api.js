const baseUrl = "https://airlabs.co/api/v9";
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchLocation() {
  try {
    const response = await fetch("https://api.vatcomply.com/geolocate");
    let data = await response.json();
    const location = {
      label: data.name,
      value: data.iso2,
      flag: data.emoji,
    };
    return location;
  } catch (err) {
    console.error("Error fetching location: ", err);
  }
}

export async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    const countries = data.map((item) => ({
      label: item.name.common,
      continent: item.region,
      value: item.cca2,
    }));
    return countries;
  } catch (err) {
    console.error("Error fetching countries: ", err);
  }
}

export async function fetchAirports(country) {
  try {
    const response = await fetch(
      `${baseUrl}/airports?api_key=${apiKey}&country_code=${country}`
    );
    let data = await response.json();
    const airports = data.response.filter((airport) => airport.iata_code);
    return airports;
  } catch (err) {
    console.error("Error fetching airports: ", err);
  }
}

export async function fetchDepFlights(airport) {
  try {
    const response = await fetch(
      `${baseUrl}/schedules?api_key=${apiKey}&dep_iata=${airport}`
    );
    let data = await response.json();
    const depFlights = data.response;
    return depFlights;
  } catch (err) {
    console.error("Error fetching departure flights: ", err);
  }
}

export async function fetchArrFlights(airport) {
  try {
    const response = await fetch(
      `${baseUrl}/schedules?api_key=${apiKey}&arr_iata=${airport}`
    );
    let data = await response.json();
    const arrFlights = data.response;
    return arrFlights;
  } catch (err) {
    console.error("Error fetching arrival flights: ", err);
  }
}

export async function fetchAirlines(country) {
  try {
    const response = await fetch(
      `${baseUrl}/airlines?api_key=${apiKey}&country_code=${country}`
    );
    let data = await response.json();
    const validAirlines = data.response.filter(
      (airline) => airline.iata_code !== null && airline.name !== null
    );
    return validAirlines;
  } catch (err) {
    console.error("Error fetching flights: ", err);
  }
}
