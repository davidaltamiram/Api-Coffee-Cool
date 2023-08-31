import {Router} from "express";
import { getProductos, getProducto, postProductos, putProductos, deleteProductos} from "../controllers/productos.controllers.js";

const router = Router();

router.get('/productos', getProductos);

router.get('/producto/:id', getProducto);

router.post('/productos', postProductos);

router.put('/productos', putProductos);

router.delete('/productos/:id', deleteProductos);

export default router;