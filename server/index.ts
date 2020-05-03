// import LoginRouter from './auth/login.router';
import LoginRouter from './auth/login.router';
const express 
const app = express();
require('dotenv').config();


const { PORT } = process.env;
const Router = express.Router();
Router.use(['/auth/login'], LoginRouter);

app.use(express.json());

app.use('/', LoginRouter);

app.listen(PORT || 4000, () => console.log(`Server listening on port ${PORT}` ));
