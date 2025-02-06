import sqlite3 from 'sqlite3';

//Creamos la BDD si no existe y nos conectamos a ella
const db = new sqlite3.Database('./tasks.db', (error) => {
    if(error){
        console.error('Error al conectarse a la BDD');
    }else{
        console.log('Conexión con la BDD correcta!');
    }
})

//Creamos la tabla tasks
db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(100),
        description VARCHAR(2000),
        created_at DATETIME
    )`)
})

export default db;