import { weatherOptions } from "@shared/weather-options.type";
import { weather } from "@shared/weather.type";
import axios from "axios";
export default class weatherService {
  static getWeather = async (options: weatherOptions) => {
    console.log("1");
    const ACCU_WEATHER_BASE_URL = `https://www.accuweather.com/en/gb/${options.city}/ec4a-2`;
    const WEATHER_TYPE = "daily-weather-forecast";
    const DAYS_FROM_TODAY = weatherService.daysFromToday(options.date);
    const DAY_WEATHER_URL = `${ACCU_WEATHER_BASE_URL}/${WEATHER_TYPE}/328328?day=${DAYS_FROM_TODAY}`;

    await axios.get(
      "https://weather.com/he-IL/weather/today/l/ISXX0010:1:IS?Goto=Redirected"
    );
    console.log("3");
    let weathersDivs;

    try {
      weathersDivs = await axios.request({
        method: "GET",
        url: DAY_WEATHER_URL,
        timeout: 1000 * 10,
        responseType: "arraybuffer",
        reponseEncoding: "binary",
      } as any);
    } catch (err) {
      console.log(err);
    }

    console.log("2");

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

    const icon = divData
      .split('data-src="')[1]
      .split('"')[0]
      .split("weathericons/")[1]
      .split(".svg")[0];

    const iconn = weatherService.iconFromSVGNumber(Number(icon));

    return { temp, icon: weatherService.iconFromSVGNumber(Number(icon)) };
  }

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
