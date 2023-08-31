import { pool } from '../db.js';

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la conexion'
        })
    }
};

export const getProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
        /*Aplica una condicional de si la medida del arreglo es menor a 0 envie un status de error en formato JSON
       
        Pero si es igual o mayor a 0 enviar el id (Objeto) de la peticion solicitada mediante el parametro de ruta HTTP
        */
        if (rows.length <= 0) return res.status(404).json({
            message: 'Objeto no encontrado!'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la conexion'
        })
    }
};

export const postProductos = async (req, res) => {
    const { id, nombre, extra, precio, img } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO productos (id, nombre, extra, precio, img) VALUES (?, ?, ?, ?, ?)', [id, nombre, extra, precio, img])
        res.send({
            id: rows.insertId,
            nombre,
            img,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la conexion'
        })
    }
};

export const putProductos = async (req, res) => {
    const { id } = req.params
    const { precio } = req.body
    try {
        const [result] = await pool.query('UPDATE productos SET precio = IFNULL(?, precio) WHERE id = ?', [precio, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la conexion'
        })
    }
};

export const deleteProductos = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la conexion'
        })
    }
};