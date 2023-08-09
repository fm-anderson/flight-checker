const baseUrl = "https://airlabs.co/api/v9";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    const countries = data.map((item) => ({
      name: item.name.common,
      continent: item.region,
      code: item.cca2,
    }));
    return countries;
  } catch (err) {
    console.error("Error fetching countries: ", err);
  }
};

export const fetchAirports = async (country) => {
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
};

export const fetchFlights = async (airport) => {
  try {
    const response = await fetch(
      `${baseUrl}/schedules?api_key=${apiKey}&dep_iata=${airport}`
    );
    let data = await response.json();
    const flights = data.response;
    return flights;
  } catch (err) {
    console.error("Error fetching flights: ", err);
  }
};
