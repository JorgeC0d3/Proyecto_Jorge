import express from 'express';
import cors from 'cors';
import db from './database.js';
import bcrypt from 'bcryptjs';

//Creamos una instancia para express
const app = express();
//Definimos el puerto desde donde se lanzará la aplicación
const port = 3000;

/*****************************************************
Middlewares
******************************************************/
//Configuramos que la información entre frontend y backend se comparta en formato JSON
app.use(express.json());
//Configuramos que se puedan compartir datos entre frontend y backend
app.use(cors());

/*****************************************************
Rutas de la aplicación (APIS)
******************************************************/

//Ruta para insertar una tarea en la bdd:
app.post('/api/save/', (req, res) => {
    //Obtenemos los datos desde el frontend
    const { title, description } = req.body //Descomposición de objetos
    //Definimos la fecha de creación de la tarea:
    const created_at = new Date().toISOString();

    //Creamos la consulta SQL para insertar los datos:
    const sql = 'INSERT INTO tasks (title, description, created_at) VALUES (?, ?, ?)';
    const params = [title, description, created_at];

    //Ejecutamos la consulta:
    db.run(sql, params, function (error) {
        if (error) {
            console.log('Error al guardar la tarea');
            return res.status(500).json({ status: '500', message: 'Error al guardar la nota' });
        }
        res.status(200).json({ status: '200', message: 'Tarea guardada con éxito' });
    })
})



//Ruta para obtener todas las tareas de la bdd:
app.get('/api/alltasks/', (req, res) => {
    //Consulta para obtener todos los registros de la tabla en orden descendente
    const sql = "SELECT * FROM tasks ORDER BY created_at DESC";

    //Ejecución de la consulta. Si es correcta los datos se almacenan en el parámetro rows
    db.all(sql, [], function (error, rows) {
        if (error) {
            console.log("Error al intentar obtener las tareas");
            return res.status(500).json({ status: '500', message: 'Error al obtener las notas' });
        }
        //Devolvemos los datos al cliente en formato json
        res.json(rows);
        //Mostramos en consola de backend los datos
        console.log(rows);
    })
})

//Función para eliminar una nota
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id=?";
    db.run(sql, id, function (error) {
        if (error) {
            console.log("Error al eliminar la tarea");
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ status: 200, message: `Tarea ${id} eliminada con éxito` });
    })
})

//Función para obtener una nota a través del id
//Pasamos el id por parámetro a través de la url, por lo tanto el método es GET
app.get('/api/task/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM tasks WHERE id = ?";

    db.get(sql, id, function (error, row) {
        if (error) {
            console.log("Error al obtener la tarea");
            return res.status(500).json({ error: error.message });
        }
        if (!row) {
            console.log("No ha sido posible encontrar la tarea");
            return res.status(400).json({ error: error.message });
        }
        res.json(row);
        console.log(row);
    })
})

//Funcion para modificar una nota a través del id
app.put('/api/mod/:id/', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
    const params = [title, description, id];

    db.run(sql, params, function (error) {
        if (error) {
            console.log("Error al modificar la tarea");
            return res.status(500).json({ error: error.message });
        }
        console.log("Tarea modificada con éxito");
        return res.status(200).json({ status: "success", message: "Tarea modificada con éxito" });
    })
})

//Función para guardar un usuario:
app.post('/api/signup/', async (req, res) => {
    //Obtenemos los datos desde el frontend
    const { name, surnames, email, password } = req.body //Descomposición de objetos
    let found = false;
    //Comprobamos si ya existe el usuario por su email
    const sqlSelect = "SELECT email FROM users WHERE email = ?";

    db.get(sqlSelect, email, function (error, row) {
        if (error) {
            console.log("Error al obtener el usuario");
            return res.status(500).json({ error: error.message });
        }
        if (row) {
            console.log("El usuario ya existe");
            found = true;
            return res.status(200).json({ message: "El usuario ya existe" });
        }
    })

    if (found === false) {

        //Definimos la fecha de creación de la tarea:
        const created_at = new Date().toISOString();

        const salt = await bcrypt.genSalt(10); // Genera un "salt" con 10 rondas
        const encryptPass = await bcrypt.hash(password, salt); // Hashea la contraseña

        //Creamos la consulta SQL para insertar los datos:
        const sql = 'INSERT INTO users (name, surnames, email, password, created_at) VALUES (?, ?, ?, ?, ?)';
        const params = [name, surnames, email, encryptPass, created_at];

        //Ejecutamos la consulta:
        db.run(sql, params, function (error) {
            if (error) {
                console.log('Error al dar de alta el usuario');
                return res.status(500).json({ status: '500', message: 'Error al dar de alta el usuario' });
            }
            res.status(200).json({ status: '200', message: 'Usuario creado con éxito' });
        })
    }
})

//lanzamos la aplicación
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

