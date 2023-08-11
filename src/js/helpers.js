import { fetchCountries } from "./api";

export function parseTime(date) {
  if (!(date instanceof Date && !isNaN(date.getTime()))) {
    return "Invalid Date";
  }
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function setImageSrc(element) {
  let theme = localStorage.getItem("theme");

  if (theme === "dracula") {
    return element.setAttribute("src", "/logo-light.png");
  } else {
    return element.setAttribute("src", "/logo-dark.png");
  }
}

export let countries = [];
export async function loadCountries() {
  countries = await fetchCountries();
}
