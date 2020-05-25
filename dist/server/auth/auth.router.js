"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_ctrl_1 = require("./auth.ctrl");
const AuthRouter = express_1.default.Router();
AuthRouter
    .get('/user', auth_ctrl_1.getUserOnSession)
    .post('/user/login', auth_ctrl_1.loginUser)
    .post('/user/register', auth_ctrl_1.registerUser);
module.exports = AuthRouter;
//# sourceMappingURL=auth.router.js.map