const express = require('express');
const router = express.Router();
const { obtenerVistaNuevoPartida, añadirPartida, obtenerPartidas, eliminarPartida, obtenerPartida, editarPartida } = require('../controller/partida');

router.get('/nuevo', obtenerVistaNuevoPartida );

router.post('/nuevo', añadirPartida);

router.get('/', obtenerPartidas)

router.get('/borrar/:partida_id', eliminarPartida)

router.get('/editar/:partida_id', obtenerPartida)

router.post('/editar/:partida_id', editarPartida)

module.exports = router;