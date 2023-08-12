# Flight Checker

<img src="./src/images/screenshots/intro-light.png" width="600"/>

## About The Project

Instantly access real-time flight updates for global airports. Whether you're planning a trip, picking up a loved one, or just staying informed, get accurate, up-to-the-minute details all from the comfort of your home.

**Built with:** [Vite](https://vitejs.dev/) • [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) • [JavaScript](https://www.javascript.com/) • [TailwindCSS](https://tailwindcss.com/) • [DaisyUI](https://daisyui.com/)

### Features

- Country auto complete
- Airport auto complete
- Real-time flight updates
- Flight delay indications
- Dark and Light theme

**Try it →** https://flightchecker.netlify.app

## Getting Started

### Prerequisites

This project was bootstrapped with [Vite](https://github.com/vitejs/vite). Ensure you have Node.js and npm (or any other package manager) installed on your local machine.

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/fm-anderson/flight-checker.git
   ```
2. Navigate to the project directory
   ```sh
   cd flight-checker
   ```
3. Create a .env file in the project directory and add your API key:

   ```sh
   echo "VITE_API_KEY=paste-api-key-without-quotes-here" > .env
   ```

4. Install dependencies
   ```sh
   npm install
   ```
5. Run the application
   ```sh
   npm run dev
   ```
6. The website should be running on http://localhost:3000

## Contributing

[Git/Github Workflow](https://fm-anderson.notion.site/fm-anderson/GIT-GITHUB-WORKFLOW-36c62b18a2c4439797149d7c79a22d12)

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Libraries

| Library       | GitHub                                      |
| ------------- | ------------------------------------------- |
| tailwindcss   | https://github.com/tailwindlabs/tailwindcss |
| daisyui       | https://github.com/saadeghi/daisyui         |
| theme-change  | https://github.com/saadeghi/theme-change    |
| autocompleter | https://github.com/kraaden/autocomplete     |

## API

[AirLabs](https://airlabs.co/) provides real-time flight status.

[VatComply](https://vatcomply.com/) provides user geolocation.

[RestCountries](https://restcountries.com/) provides auto-complete list.

## Screenshots (Desktop)


<img src="./src/images/screenshots/intro-light.png" width="600"/>

---


<img src="./src/images/screenshots/intro-dark.png" width="600"/>

---

<img src="./src/images/screenshots/table-light.png" width="600"/>

---

<img src="./src/images/screenshots/table-dark.png" width="600"/>

---

## Screenshots (Mobile)

<img src="./src/images/screenshots/intro-light-m.png" width="200"/>

---

<img src="./src/images/screenshots/intro-dark-m.png" width="200"/>

---
