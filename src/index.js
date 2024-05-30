require("dotenv").config();
const express = require("express");
const { dbConnection }= require("./database/db");

dbConnection();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        msg: "Bienvenido a la API",
    });
});

app.use("/usuarios", require("./routes/users.routes"));
app.use("/productos", require("./routes/products.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});