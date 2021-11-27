import { weatherOptions } from "@shared/weather-options.type";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import weatherService from "../services/weather.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getWeather(req: Request, res: Response) {
  let dateToConvert: string = req.params.date;
  let date;
  try {
    date = Number(dateToConvert);
  } catch (err) {
    const [day, month, year] = dateToConvert.split("-");
    date = new Date(Number(year), Number(month), Number(day)).getTime();
  }

  try {
    const weather = await weatherService.getWeather({
      city: "vienna",
      date: Number(date),
    } as weatherOptions);
    res.json(weather);
  } catch (err) {
    res.status(400).send({
      message: "Unexpected date type",
    });
  }
}
