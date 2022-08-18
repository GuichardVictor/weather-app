import axios from 'axios'
import type IWeatherData from '../types/WeatherData';

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

function getCityCoordinates(city: string): number[] {
    // return [0.0, 0.0]

    return [48.866667, 2.333333]
}


export class CityData {
    private data: IWeatherData

    constructor(data: IWeatherData) {
        this.data = data
    }

    get city(): string {
        return this.data.name
    }

    get countryCode(): string {
        return this.data.sys.country
    }

    get temperature(): number {
        return this.data.main.temp
    }

    get minTemperature(): number {
        return this.data.main.temp_min
    }

    get maxTemperature(): number {
        return this.data.main.temp_max
    }

    get description(): string {
        return this.data.weather[0].description
    }

    get iconUrl(): string {
        return `http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`
    }

    async refresh(): Promise<CityData> {
        return await axios.get( OPEN_WEATHER_URL, {
            params: {
                q: this.city,
                units: 'metric',
                appid: OPEN_WEATHER_API_KEY
            }
        }).then(response => {
            return new CityData(response.data)
        })
    }
}


export class WeatherClient {
    static async getCity(city: string): Promise<CityData> {
        
        // const [lat, lon] = getCityCoordinates(city)

        return await axios.get(
            OPEN_WEATHER_URL, {
                params: {
                    q: city,
                    // lat: lat,
                    // lon: lon,
                    units: 'metric',
                    appid: OPEN_WEATHER_API_KEY
                }
            }).then(
                response => new CityData(response.data)
            )
    }
}


export default {WeatherClient, CityData}