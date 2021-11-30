import { weatherOptions } from '@shared/weather-options.type';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import weatherService from '../services/weather.service';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getWeather(req: Request, res: Response) {
    let dateToConvert: string = req.params.date;
    let date = +dateToConvert;
    if (!date) {
        const [day, month, year] = dateToConvert.split('-');
        date = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
    }

    try {
        const weather = await weatherService.getWeather({
            city: req.params.city,
            date,
        });
        res.json(weather);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'Unexpected date or location',
        });
    }
}
