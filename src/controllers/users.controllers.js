const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();

    return res.json({
        msg: "Usuarios obtenidos",
        data: usuarios
    });
    } catch (error) {
       return res.json({
        msg: "Error al obtener usuarios."
       }) 
    }
};

const obtenerUsuario = async (req, res) => {
    
    try {
        const { id } = req.params;

    const usuarioObtenido = await user.findById(id);


    return res.json({
        msg: "Usuario obtenido",
        data: usuarioObtenido,
    });
    } catch (error) {
        return res.json({
            msg: "Error al obtener usuario."
        })
    }
};

const crearUsuario = async (req, res) => {
    
    try {
    const salt = bcrypt.genSaltSync(10);

    const usuario = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt),
    };

    const usuario_creado = await user(usuario).save()

    return res.json({
        msg: "Usuario creado",
        data: usuario,
    });
    } catch (error) {
        return res.json({
            msg: "Error al crear usuario."
        })
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const {id} = req.params;
    const {password} = req.body;

    const usuario = {
        password: password,
    };

    const usuarioActualizado = await user.findByIdAndUpdate(id, usuario, {
        new: true,
    });

    return res.json({
        msg: "Usuario actualizado",
        data: usuarioActualizado,
    });
    } catch (error) {
       return res.json({
        msg: "Error al actualizar usuario."
       }) 
    }
};

const eliminarUsuario = async (req, res) => {

    try {
        const {id} = req.params;

    const usuarioEliminado = await user.findByIdAndDelete(id)

    return res.json({
        msg: "Usuario eliminado",
    });
    } catch (error) {
       return res.json({
        msg: "Error al eliminar usuario."
       }) 
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
};