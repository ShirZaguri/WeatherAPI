import { Router } from "express";
import weatherRouter from "./weather.router";

const baseRouter = Router();
baseRouter.use("/weather", weatherRouter);

export default baseRouter;
