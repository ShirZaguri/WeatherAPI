import { weatherOptions } from "@shared/weather-options.type";
import axios from "axios";

export default class weatherService {
  static getWeather = async (options: weatherOptions) => {
    const { placeId } = (
      await axios.get(
        `https://api.weather.com/v3/location/search?query=${options.city}&locationType=locale&language=en-US&format=json&apiKey=21d8a80b3d6b444998a80b3d6b1449d3`
      )
    ).data.location;

    const { latitude, longitude } = (
      await axios.get(
        `https://api.weather.com/v3/location/point?format=json&apiKey=21d8a80b3d6b444998a80b3d6b1449d3&language=en-US&placeid=${placeId[0]}`
      )
    ).data.location;

    const geoCode = this.createGeo(latitude, longitude);

    const placeWeather = (
      await axios.get(
        `https://api.weather.com/v3/wx/forecast/daily/15day?geocode=${geoCode}&language=en-US&format=json&units=m&apiKey=21d8a80b3d6b444998a80b3d6b1449d3`
      )
    ).data;
    console.log(placeWeather);

    return placeWeather;
  };

  static createGeo = (latitude: any, longitude: any) => {
    return `${latitude},${longitude}`;
  };
}
