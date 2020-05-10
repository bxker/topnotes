import massive from 'massive';
const 

const connectToDb = () => {
    massive(CONNECTION_STRING)
        .then((db) => {
            app.set('db', db);
            console.log('Database Connected :D')
        })
}

 export = connectToDb;