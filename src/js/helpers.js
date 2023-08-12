import { fetchCountries } from "./api";
import blackLogo from "../images/logo-dark.png";
import whiteLogo from "../images/logo-light.png";

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

export function checkIfTheme() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }
}

export function setImageSrc(element) {
  let theme = localStorage.getItem("theme");

  if (theme === "dracula") {
    return element.setAttribute("src", whiteLogo);
  } else {
    return element.setAttribute("src", blackLogo);
  }
}

export let countries = [];
export async function loadCountries() {
  countries = await fetchCountries();
}
