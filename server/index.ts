import express, {Request, Response} from 'express';
import AuthRouter from './auth/auth.router';
import session from 'express-session';

const app = express();
require('dotenv').config();

const { PORT, SESSION_SECRET } = process.env;
const Router = express.Router();

//routes
Router.use(['/auth/'], AuthRouter);

//middleware
app.use(express.json());
app.use('/', AuthRouter);
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}))


//test endpoint
app.get('/test', (req: Request, res:Response) => {
    res.status(200).json('hi')
})

app.listen(PORT || 4000, () => console.log(`Server listening on port ${PORT}` ));