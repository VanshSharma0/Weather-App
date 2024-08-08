# Weather App

## Overview

The Weather App is a user-friendly application that provides current weather information and forecasts for any location. Users can search for a city or region to get real-time weather updates, including temperature, humidity, and weather conditions. The app also displays a forecast for the coming days.

## Features

- **Current Weather:** View the current temperature, weather conditions, and humidity for any location.
- **Forecast:** Get a detailed weather forecast for the next few days.
- **Search Functionality:** Search for weather information by city or region.
- **Responsive Design:** The app is optimized for both desktop and mobile devices.

## Installation

To run the Weather App locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/VanshSharma0/Weather-app.git
   cd Weather-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open the app:**
   Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Usage

1. **Search for weather:**
   - Enter a city or region in the search bar and press enter or click the search button.

2. **View current weather:**
   - The app will display the current temperature, weather conditions, and humidity for the searched location.

3. **Check the forecast:**
   - The app provides a weather forecast for the next few days.

## Technologies Used

- **React.js:** For building the user interface.
- **Axios:** For making API requests to fetch weather data.
- **TailWindCSS:** For styling the application.

## API

The app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You will need to sign up for an API key from OpenWeatherMap and add it to your project.

1. **Get your API key:**
   - Sign up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and get your API key.

2. **Add the API key to your project:**
   - Create a `.env` file in the root of your project and add your API key:
     ```sh
     REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
     ```

## Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to submit a pull request or open an issue.

## Contact

If you have any questions or suggestions, feel free to reach out to me at vanished934@gmail.com
