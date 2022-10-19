const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerUsuarios } = require('../controller/usuario');

router.get('/',isLoggedIn, obtenerUsuarios)

//router.get('/borrar/:partida_id', isLoggedIn, eliminarPartida)

module.exports = router;