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

export function clearInputs(input) {
  input.value = null;
  input.dataset.value = null;
}

export function setImageSrc(element) {
  if (localStorage.getItem("theme") === "dracula") {
    element.setAttribute("src", "./src/assets/images/logo-light.png");
  } else {
    element.setAttribute("src", "./src/assets/images/logo-dark.png");
  }
}
