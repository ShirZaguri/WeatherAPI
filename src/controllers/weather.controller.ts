import { weatherOptions } from "@shared/weather-options.type";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import weatherService from "../services/weather.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getWeather(req: Request, res: Response) {
  res.json(
    await weatherService.getWeather({
      city: "vienna",
      date: Number(req.params.date),
    } as weatherOptions)
  );
}
