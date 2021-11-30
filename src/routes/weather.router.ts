import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller';

const weatherRouter = Router();

weatherRouter.get('/:city/:date', getWeather);

export default weatherRouter;
