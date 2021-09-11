import { weatherOptions } from "@shared/weather-options.type";
// import fetch from "node-fetch";

export default class weatherService {
  static getWeather = async (options: weatherOptions) => {
    // const cityDetails = await (
    //   await fetch(
    //     `https://api.weather.com/v3/location/search?query=${options.city}&locationType=locale&language=en-US&format=json&apiKey=21d8a80b3d6b444998a80b3d6b1449d3`
    //   )
    // ).json();
    // console.log(cityDetails);
  };
}
