import { API_CONFIG } from "./config";
import type {
  WeatherData,
  ForecastData,
  GeocodingResponse,
  Coordinates,
} from "./types";

import { MOCK_WEATHER, MOCK_FORECAST, MOCK_LOCATIONS } from "./mock-data";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    if (API_CONFIG.API_KEY === "DEMO") {
      console.log("Using Mock Data (Demo Mode)");
      throw new Error("Demo Mode: Handled in methods");
    }

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = response.status === 401 
        ? "Invalid API Key. Please check your .env file."
        : response.statusText;
      throw new Error(`Weather API Error: ${errorText}`);
    }

    return response.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    if (API_CONFIG.API_KEY === "DEMO") return MOCK_WEATHER;

    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData<WeatherData>(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    if (API_CONFIG.API_KEY === "DEMO") return MOCK_FORECAST;

    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    if (API_CONFIG.API_KEY === "DEMO") return [MOCK_LOCATIONS[0]];

    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    if (API_CONFIG.API_KEY === "DEMO") {
      return MOCK_LOCATIONS.filter((loc) => 
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
