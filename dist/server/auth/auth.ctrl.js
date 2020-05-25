"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
exports.getUserOnSession = async (req, res) => {
    if (req.session) {
        res.status(200).json(req.session);
    }
    else {
        res.status(200).json('No user on session');
    }
};
exports.loginUser = async (req, res) => {
    let { username, password } = req.body;
    let user = await auth_service_1.getUser(username, req);
    if (user === 'user not found') {
        res.status(403).json('that aint it chief');
    }
    else {
        let results = await auth_service_1.login(username, password, req);
        if (typeof (results) === 'string') {
            res.status(403).json(results);
        }
        else {
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
exports.registerUser = async (req, res) => {
    let { first_name, last_name, email, username, password } = req.body;
    let results = await auth_service_1.register(req, first_name, last_name, email, username, password);
    if (typeof (results) === 'string') {
        res.status(403).json(results);
    }
    else {
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
//# sourceMappingURL=auth.ctrl.js.map