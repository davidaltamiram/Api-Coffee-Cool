//Se puede utilizar esto (Version node)
//const express = require('express');
//o tambien este otro para poder importar express (version ES6)
import express from 'express'
import { pool } from './db.js'
import productosRouter from './routes/productos.routes.js';
import indexRoutes  from './routes/index.routes.js';
import {PORT} from './config.js'

const app = express();

app.use(express.json());

//Endpoints de API Metodos HTTP
app.use('/api',indexRoutes);
app.use('/api',productosRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app;