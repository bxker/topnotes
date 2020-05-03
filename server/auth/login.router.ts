
import express from 'express';
import {getUserOnSession} from './login.ctrl';

const LoginRouter = express.Router();

LoginRouter
    .get('/user', getUserOnSession)

export = LoginRouter;