
import express from 'express';
import {getUserOnSession, loginUser, registerUser} from './auth.ctrl';

const AuthRouter = express.Router();

AuthRouter
    .get('/user', getUserOnSession)
    .post('/user/login', loginUser)
    .post('/user/register', registerUser)
export = AuthRouter;