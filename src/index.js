//Se puede utilizar esto (Version node)
//const express = require('express');
//o tambien este otro para poder importar express (version ES6)
import express from 'express'
import { pool } from './db.js'
import productosRouter from './routes/productos.routes.js';
import indexRoutes  from './routes/index.routes.js';

const app = express();

app.use(express.json());

//Endpoints de API Metodos HTTP
app.use('/api',indexRoutes);
app.use('/api',productosRouter);

app.listen(3000);
console.log("Server corriendo en puerto 3000 :3");

