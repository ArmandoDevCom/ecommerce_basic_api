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

module.exports = {registrarUsuario}