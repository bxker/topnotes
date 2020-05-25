"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
exports.pool = new pg_1.Pool();
exports.pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});
exports.query = (text, values) => {
    let results = exports.pool.query(text, values);
    return results;
};
//# sourceMappingURL=connection.js.map