require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        msg: "Bienvenido a la API",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});