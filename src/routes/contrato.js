const express = require('express');
const router = express.Router();
const { obtenerVistaNuevoContrato, añadirContrato, obtenerContratos, eliminarContrato, obtenerContrato, editarContrato } = require('../controller/contrato');

router.get('/nuevo', obtenerVistaNuevoContrato );

router.post('/nuevo', añadirContrato);

router.get('/', obtenerContratos)

router.get('/borrar/:contrato_id', eliminarContrato)

router.get('/editar/:contrato_id', obtenerContrato)

router.post('/editar/:contrato_id', editarContrato)

module.exports = router;