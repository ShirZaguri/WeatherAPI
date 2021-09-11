import { Router } from "express";
import { getWeather } from "../controllers/weather.controller";

const weatherRouter = Router();

weatherRouter.get("/", getWeather);
// chatRouter.get("/:id", getChat);
// chatRouter.get("/user/:id", getUserChats);

export default weatherRouter;
