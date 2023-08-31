import { pool } from '../db.js';

export const getProductos = async (req, res) => {
   const [rows] = await pool.query('SELECT * FROM productos')
    res.json(rows)
};

export const getProducto = async (req, res) => {
 const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
 /*Aplica una condicional de si la medida del arreglo es menor a 0 envie un status de error en formato JSON

 Pero si es igual o mayor a 0 enviar el id (Objeto) de la peticion solicitada mediante el parametro de ruta HTTP
 */
 if (rows.length <= 0) return res.status(404).json({
    message: 'Objeto no encontrado!'
 })
    res.json(rows[0])
};

export const postProductos = async (req, res) => {
    const {id, nombre, extra, precio, img} = req.body
   const [rows] = await pool.query('INSERT INTO productos (id, nombre, extra, precio, img) VALUES (?, ?, ?, ?, ?)', [id, nombre, extra, precio, img])
    res.send({
        id: rows.insertId,
        nombre,
        img,
    })   
};

export const putProductos = (req, res) => res.send('Actualizando lista de productos');

export const deleteProductos = async (req, res) => {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])
    
    if(result.affectedRows <=0) return res.status(404).json({
        message: 'Producto no encontrado'
    })
    res.sendStatus(204)
};