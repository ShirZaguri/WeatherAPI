import { weatherOptions } from "@shared/weather-options.type";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import weatherService from "../services/weather.service";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getWeather(req: Request, res: Response) {
  await weatherService.getWeather({ city: "vienna" } as weatherOptions);
}