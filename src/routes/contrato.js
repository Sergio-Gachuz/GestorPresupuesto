const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerVistaNuevoContrato, añadirContrato, obtenerContratos, eliminarContrato, obtenerContrato, editarContrato } = require('../controller/contrato');

router.get('/nuevo', isLoggedIn, obtenerVistaNuevoContrato );

router.post('/nuevo', isLoggedIn, añadirContrato);

router.get('/', isLoggedIn, obtenerContratos)

router.get('/borrar/:contrato_id', isLoggedIn, eliminarContrato)

router.get('/editar/:contrato_id', isLoggedIn, obtenerContrato)

router.post('/editar/:contrato_id', isLoggedIn, editarContrato)

module.exports = router;