import {Pool} from 'pg';
require('dotenv').config();

export const pool = new Pool()

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack)
})

export const query = (text: string, values?: any) => {
    let results = pool.query(text, values)
    return results;
}
