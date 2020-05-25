"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../db/connection");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.getUser = async (username, req) => {
    const text = `SELECT * FROM users WHERE username = $1`;
    const values = [username];
    const results = await connection_1.query(text, values);
    const formattedResults = results.rows;
    if (formattedResults) {
        return formattedResults;
    }
    else {
        return 'user does not exist';
    }
};
exports.login = async (username, password, req) => {
    let foundUser = await exports.getUser(username);
    let authenticateUser = await bcryptjs_1.default.compare(password, foundUser[0].hash);
    let notAuth = 'user not authenticated';
    if (authenticateUser) {
        return foundUser;
    }
    else {
        return notAuth;
    }
};
exports.register = async (req, first_name, last_name, email, username, password) => {
    console.log(first_name, last_name, email, username, password);
    let foundUser = exports.getUser(username, req);
    if (foundUser[0]) {
        return 'Username Taken';
    }
    else {
        try {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            const userNotCreated = 'user not created, maybe user already exists';
            const text = `
                INSERT INTO users 
                (first_name, last_name, email, username, hash)
                VALUES 
                ($1, $2, $3, $4, $5)
                RETURNING *;
                `;
            const values = [first_name, last_name, email, username, hash];
            const results = await connection_1.query(text, values);
            if (!results) {
                return userNotCreated;
            }
            else {
                return results;
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
};
//# sourceMappingURL=auth.service.js.map