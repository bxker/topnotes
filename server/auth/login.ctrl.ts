import {Response} from 'express';
import {getUser} from './login.service';

export const getUserOnSession = async (req:any, res:Response) => {
    const user = await getUser();

    if(user){
        res.status(200).json(user)
    }else{
        res.status(401).json('User not found')
    }
}