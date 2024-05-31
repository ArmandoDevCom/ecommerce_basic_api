const { Router } = require("express");
const { validarJWT } = require("../middlewares/jwt.middleware")
const {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
} = require("../controllers/products.controllers")



const router = Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);
router.post("/", validarJWT , crearProducto);
router.put("/:id", validarJWT , actualizarProducto);
router.delete("/:id", validarJWT , eliminarProducto);

module.exports = router;