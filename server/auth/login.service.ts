import {query} from '../db/connection';

export const getUser = async () => {
    const text = `SELECT * FROM bananas`;
    const results = await query(text);
    const formatedResults = results.rows;
    return formatedResults;
}