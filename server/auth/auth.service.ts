import {query} from '../db/connection';
import bcrypt from 'bcryptjs';

export const getUser = async (username?: any, req?: any) => {
    const text = `SELECT * FROM users WHERE username = $1`;
    const values = [username]
    const results = await query(text, values);
    const formattedResults = results.rows;
    if(formattedResults){
        return formattedResults;
    }else{
        return 'user does not exist'
    }
};

export const login = async (username, password, req) => {
    let foundUser = await getUser(username);
    let authenticateUser = await bcrypt.compare(password, foundUser[0].hash);
    let notAuth = 'user not authenticated';
    if(authenticateUser){
        // console.log(req.session)
        // req.session.user = {
        //     id: foundUser[0].id,
        //     first_name: foundUser[0].first_name,
        //     last_name: foundUser[0].last_name,
        //     email: foundUser[0].email,
        //     username: foundUser[0].username,
        // }
        return foundUser;

    }else{
        return notAuth;
    }
};

export const register = async (req, first_name, last_name, email, username, password) => {
    console.log(first_name, last_name, email, username, password)
    let foundUser = getUser(username, req);
    if(foundUser[0]){
        return 'Username Taken';
    }else {
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const userNotCreated = 'user not created, maybe user already exists';
            const text = `
                INSERT INTO users 
                (first_name, last_name, email, username, hash)
                VALUES 
                ($1, $2, $3, $4, $5)
                RETURNING *;
                `;
            const values = [first_name, last_name, email, username, hash ]
            const results = await query(text, values);
            if(!results){
                return userNotCreated;
            }else{
                req.session.user = {
                    id: results[0].id,
                    first_name: results[0].first_name,
                    last_name: results[0].last_name,
                    email: results[0].email,
                    username: results[0].username,
                }
                return req.session.user;
            }
        }catch(e){
            throw new Error(e.message)
        }
    }
};