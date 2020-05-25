import {Request} from 'express';

export interface ExpressRequest extends Request {
    session?: {any};
    sessionID?: string;
}
