import express, {Request, Response} from 'express';
import LoginRouter from './auth/login.router';

const app = express();
require('dotenv').config();

const { PORT } = process.env;
const Router = express.Router();
Router.use(['/auth/login'], LoginRouter);

app.use(express.json());
app.get('/test', (req: Request, res:Response) => {
    res.status(200).json('hi')
})
app.use('/', LoginRouter);

app.listen(PORT || 4000, () => console.log(`Server listening on port ${PORT}` ));
