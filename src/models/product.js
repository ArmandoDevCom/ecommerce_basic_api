const { Schema, model } = require("mongoose")

const ProductSchema = Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    Image: String
});

ProductSchema.methods.toJSON = function () {
    const { __V, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("Product", ProductSchema,);
