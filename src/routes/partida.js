const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerVistaNuevoPartida, añadirPartida, obtenerPartidas, eliminarPartida, obtenerPartida, editarPartida } = require('../controller/partida');

router.get('/nuevo', isLoggedIn, obtenerVistaNuevoPartida );

router.post('/nuevo', isLoggedIn,  añadirPartida);

router.get('/',isLoggedIn, obtenerPartidas)

router.get('/borrar/:partida_id', isLoggedIn, eliminarPartida)

router.get('/editar/:partida_id', isLoggedIn, obtenerPartida)

router.post('/editar/:partida_id', isLoggedIn, editarPartida)

module.exports = router;