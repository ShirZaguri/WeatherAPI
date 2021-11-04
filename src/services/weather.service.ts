import { weatherOptions } from "@shared/weather-options.type";
import { weather } from "@shared/weather.type";
import axios from "axios";
export default class weatherService {
  static getWeather = async (options: weatherOptions) => {
    const ACCU_WEATHER_BASE_URL =
      "https://www.accuweather.com/en/at/vienna/31868";
    const WEATHER_TYPE = "daily-weather-forecast";
    const DAYS_FROM_TODAY = weatherService.daysFromToday(options.date);
    const DAY_WEATHER_URL = `${ACCU_WEATHER_BASE_URL}/${WEATHER_TYPE}/31868?day=${
      DAYS_FROM_TODAY + 1
    }`;

    const weathersDivs = await axios.request({
      method: "GET",
      url: DAY_WEATHER_URL,
      responseType: "arraybuffer",
      reponseEncoding: "binary",
    } as any);

    const pageReq: string = weathersDivs.data.toString("latin1");
    const [dayDiv, nightDiv] = pageReq
      .split("half-day-card-header")
      .slice(1, 4);

    return {
      day: weatherService.getWeatherFromWeatherDiv(dayDiv),
      night: weatherService.getWeatherFromWeatherDiv(nightDiv),
    };
  };

  static getWeatherFromWeatherDiv(divData: string): weather {
    const temp = divData
      .split('class="temperature">')[1]
      .split("<span")[0]
      .split(`\n\t\t\t`)[1]
      .split("&")[0];
    const icon = divData.split('data-src="')[1].split('"')[0];

    return { temp, icon };
  }

  static daysFromToday(date: number): number {
    const TODAY = new Date();
    const TO = new Date(date);

    const diff = TO.getTime() - TODAY.getTime();
    const diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffInDays;
  }
}
