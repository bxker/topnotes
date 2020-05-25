"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const express_session_1 = __importDefault(require("express-session"));
const app = express_1.default();
require('dotenv').config();
const { PORT, SESSION_SECRET } = process.env;
const Router = express_1.default.Router();
//routes
Router.use(['/auth/'], auth_router_1.default);
//middleware
app.use(express_1.default.json());
app.use('/', auth_router_1.default);
app.use(express_session_1.default({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
//test endpoint
app.get('/test', (req, res) => {
    res.status(200).json('hi');
});
app.listen(PORT || 4000, () => console.log(`Server listening on port ${PORT}`));
//# sourceMappingURL=index.js.map