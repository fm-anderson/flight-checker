import autocomplete from "autocompleter";
import { countryInput, airportInput } from "./const";
import { airports } from "./utils";
import { countries } from "./helpers";

// country input
autocomplete({
  input: countryInput,
  debounceWaitMs: 200,
  className:
    "menu dropdown-content rounded-box z-[1] w-52 cursor-pointer bg-base-100 p-2 shadow",
  fetch: function (text, update) {
    text = text.toLowerCase();
    let suggestions = countries.filter((n) =>
      n.label.toLowerCase().startsWith(text)
    );
    update(suggestions);
  },
  onSelect: function (item) {
    countryInput.value = item.label;
    countryInput.dataset.value = item.value;
  },
});

// airport input
autocomplete({
  input: airportInput,
  debounceWaitMs: 200,
  className:
    "menu dropdown-content rounded-box z-[1] w-52 cursor-pointer bg-base-100 p-2 shadow",
  fetch: function (text, update) {
    text = text.toLowerCase();
    let suggestions = airports
      .filter(
        (n) =>
          n.iata_code.toLowerCase().startsWith(text) ||
          n.name.toLowerCase().includes(text)
      )
      .map((n) => ({
        label: `${n.iata_code} - ${n.name}`,
        value: n.iata_code,
      }))
      .slice(0, 6);
    update(suggestions);
  },
  onSelect: function (item) {
    airportInput.value = item.label;
    airportInput.dataset.value = item.value;
  },
});
