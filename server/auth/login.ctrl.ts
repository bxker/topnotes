import {Response} from 'express';
import {getUser} from './login.service';

export const getUserOnSession = async (req:any, res:Response) => {
    let results = await getUser();
    res.status(200).json(results);
};