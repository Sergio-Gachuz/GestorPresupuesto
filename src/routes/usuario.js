const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerUsuarios, eliminarUsuario } = require('../controller/usuario');

router.get('/',isLoggedIn, obtenerUsuarios)

router.get('/borrar/:usuario_id', isLoggedIn, eliminarUsuario)

module.exports = router;