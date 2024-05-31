const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const {generarJWT} = require("../helpers/jwt.helper")

const registrarUsuario = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const salt = bcrypt.genSaltSync(12);

        const usuario = {
            user_name: user_name,
            password: bcrypt.hashSync(password, salt),
        };

        const usuario_registrado = await User(usuario).save();

        const token = await generarJWT(usuario_registrado.id)

    return res.json({
        ok: true,
        msg: "Usuario Registrado",
        data: usuario_registrado,
        token: token,
    });
    } catch (error) {
       return res.json({
        msg: "Error al registrar usuario."
       }) 
    }
};

const iniciarSesion = async (req, res) => {
    
    const { user_name, password } = req.body;

    const user = await User.findOne({user_name: user_name});

    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario y/o contraseña incorretos.",
            data: {},
        })
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: "Usuario y/o contraseña incorretos.",
            data: {},
        })
    }

    const token = await generarJWT(user.id);

    return res.json({
        ok: true,
        msg: "Acceso correcto",
        data: user,
        token: token,
    });
};

const validarUsuario = async (req, res) => {

        const user = req.user;

        const token = await generarJWT(user.id);

        return res.json({
            ok: true,
            msg: "Usuario validado",
            data: user,
            token: token,
        });
    }

module.exports = {
    registrarUsuario,
    iniciarSesion,
    validarUsuario,
}