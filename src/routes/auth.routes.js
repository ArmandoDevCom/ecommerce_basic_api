const { Router } = require("express");

const { registrarUsuario } = require("../controllers/auth.controllers")

const router = Router();

router.post("/registrar_usuario", registrarUsuario)

module.exports = router;