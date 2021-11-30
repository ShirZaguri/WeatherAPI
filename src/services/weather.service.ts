import { weatherOptions } from "@shared/weather-options.type";
import axios from "axios";
export default class weatherService {
  static getWeather = async (options: weatherOptions) => {
    // WEATHER API
    const ACCU_WEATHER_BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=2645eb7abe144c09a0d85959212911&q=${options.city}&days=10&aqi=no&alerts=no`;

    let daysFromToday = weatherService.daysFromToday(options.date);
    daysFromToday = daysFromToday < 4 ? daysFromToday - 1 : 2;
    const weather = await axios.request({
      method: "GET",
      url: ACCU_WEATHER_BASE_URL,
    } as any);

    const hoursTemps = weather.data.forecast.forecastday[daysFromToday].hour;
    const day = hoursTemps.reduce((prev: any, current: any) => {
      return prev.temp_c > current.temp_c ? prev : current;
    });

    const night = hoursTemps.reduce((prev: any, current: any) => {
      return current.temp_c > prev.temp_c ? prev : current;
    });

    return {
      day: {
        temp: Math.round(day.temp_c),
        icon: day.condition.icon,
      },
      night: {
        temp: Math.round(night.temp_c),
        icon: night.condition.icon,
      },
    };
  };

  static iconFromSVGNumber(iconNumber: number): string {
    const icons_map = [
      { icon: "sunny", numbers: [0, 1, 2, 3, 4, 5, 6] },
      { icon: "storm", numbers: [7, 8] },
      {
        icon: "cold",
        numbers: [11, 12, 13, 14, 15, 18, 32, 33, 34, 35, 36, 37],
      },
      { icon: "snow", numbers: [19, 20, 21, 22, 23, 24, 25, 26, 29] },
      { icon: "default", numbers: [] },
    ];

    let matchingWeather = icons_map.find((weather) =>
      weather.numbers.includes(iconNumber)
    );
    matchingWeather = matchingWeather
      ? matchingWeather
      : icons_map.find((weather) => weather.icon === "default");
    return matchingWeather.icon;
  }

  static daysFromToday(date: number): number {
    const TODAY = new Date();
    const TO = new Date(date);

    const diff = TO.getTime() - TODAY.getTime();
    const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffInDays + 1;
  }
}
