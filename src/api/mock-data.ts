import { WeatherData, ForecastData, GeocodingResponse } from "./types";

export const MOCK_WEATHER: WeatherData = {
  coord: { lat: 51.5074, lon: -0.1278 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 22.5,
    feels_like: 21.8,
    temp_min: 20,
    temp_max: 24,
    pressure: 1012,
    humidity: 45,
  },
  visibility: 10000,
  wind: { speed: 4.1, deg: 240 },
  clouds: { all: 0 },
  dt: Math.floor(Date.now() / 1000),
  sys: { type: 1, id: 1414, country: "GB", sunrise: 1625024400, sunset: 1625083200 },
  timezone: 3600,
  id: 2643743,
  name: "London",
  cod: 200,
};

export const MOCK_FORECAST: ForecastData = {
  list: Array.from({ length: 40 }).map((_, i) => ({
    dt: Math.floor(Date.now() / 1000) + i * 3600 * 3,
    main: {
      temp: 20 + Math.random() * 5,
      feels_like: 19 + Math.random() * 5,
      temp_min: 18,
      temp_max: 26,
      pressure: 1012,
      humidity: 50,
    },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 3.5, deg: 180 },
    dt_txt: new Date(Date.now() + i * 3600 * 3000).toISOString(),
  })),
  city: { name: "London", country: "GB", timezone: 3600, sunrise: 0, sunset: 0 },
};

export const MOCK_LOCATIONS: GeocodingResponse[] = [
  { name: "London", lat: 51.5074, lon: -0.1278, country: "GB", state: "England" },
  { name: "Delhi", lat: 28.6139, lon: 77.209, country: "IN", state: "Delhi" },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, country: "IN", state: "Maharashtra" },
];
