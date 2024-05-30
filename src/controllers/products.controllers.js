const Products = require("../models/product")


const obtenerProductos = async (req, res) => {
    try {
        const Productos = await Products.find();

    return res.json({
        msg: "Productos obtenidos",
        data: Productos
    });
    } catch (error) {
        return res.status(500).json({
            msg: "Error en el servidor"
        })
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;

    const productoObtenido = await Products.findById(id);


    return res.json({
        msg: "Producto obtenido",
        data: productoObtenido,
    });
    } catch (error) {
        return res.json({
            msg: "Error al obtener el producto."
        })
    }
};

const crearProducto = async (req, res) => {
    try {
        const { title, description, category, price, Image  } = req.body;

    const producto = {
        title: title,
        description: description,
        category: category,
        price: price,
        Image: Image 
    };

    const Producto_creado = await Products(producto).save()

    return res.json({
        msg: "Producto creado",
        data: producto,
    });
    } catch (error) {
        return res.json ({
            msg: "Error al crear el producto"
        })
    }
};

const actualizarProducto = async (req, res) => {
    try {
        
    const {id} = req.params;
    const { title, description, category, price, Image  } = req.body;

    const producto = {
        title: title,
        description: description,
        category: category,
        price: price,
        Image: Image 
    };

    const productoActualizado = await Products.findByIdAndUpdate(id, producto, {
        new: true,
    });

    return res.json({
        msg: "Producto actualizado",
        data: productoActualizado,
    });
    } catch (error) {
        return res.json({
            msg: "No se pudo actualizar el producto."
        })
    }
};

const eliminarProducto = async (req, res) => {

    try {
        
    const {id} = req.params;

    const productoEliminado = await Products.findByIdAndDelete(id)

    return res.json({
        msg: "Producto eliminado",
    });

    } catch (error) {
        return res.json({
            msg: "No se pudo eliminar el producto."
        })
    }
};

module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
};