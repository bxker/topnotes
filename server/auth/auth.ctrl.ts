import {Response} from 'express';
import {getUser, login, register} from './auth.service';
import {ExpressRequest} from '../types/index';

export const getUserOnSession = async (req:ExpressRequest, res:Response) => {
   if(req){
       res.status(200).json(req);
   }else{
       res.status(200).json('No user on session')
   }
};

export const loginUser = async (req:ExpressRequest, res:Response) => {
    let {username, password} = req.body;
    console.log(req)
    let user = await getUser(username, req);
    if(user === 'user not found'){
        res.status(403).json('that aint it chief');
    }else{
        let results = await login(username, password, req);
        if(typeof(results) === 'string'){
            res.status(403).json(results);
        }else {
            // req.session.user = {
            //     first_name: results[0].first_name,
            //     last_name: results[0].last_name,
            //     email: results[0].email,
            //     id: results[0].id,
            //     username: results[0].username
            // };
            res.status(200).json(results);
        }
    }
};

export const registerUser = async (req:ExpressRequest, res:Response) => {
    let {first_name, last_name, email, username, password} = req.body;
    let results = await register(req, first_name, last_name, email, username, password);
    if(typeof(results) === 'string'){
        res.status(403).json(results);
    }else {
        // req.session.user = {
        //     first_name: results[0].first_name,
        //     last_name: results[0].last_name,
        //     email: results[0].email,
        //     id: results[0].id,
        //     username: results[0].username
        // };
        res.status(200).json(results);
    }
    res.status(200).json(results);
};