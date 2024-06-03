const { Schema, model } = require("mongoose")

const UserSchema = Schema({
    user_name: {
        type: String,
        required: [true, "El user_name es obligatorio"],
        unique: true,
    },

    password: {
        type: String,
    },

    age: {
        type: String,
    },

    active: {
        type: Boolean,
        default: true,
    },

    image: {
        type: String,
        default: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
    },

    phone: {
        type: String,
    },

    mail: {
        type: String,
    }
});

UserSchema.methods.toJSON = function () {
    const { __V, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("user", UserSchema, "users");