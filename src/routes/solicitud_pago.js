const express = require('express');
const router = express.Router();
const { obtenerVistaNuevoSolicitud_pago, añadirSolicitud_pago, obtenerSolicitud_pagos, eliminarSolicitud_pago, obtenerSolicitud_pago, editarSolicitud_pago } = require('../controller/solicitud_pago');

router.get('/nuevo', obtenerVistaNuevoSolicitud_pago );

router.post('/nuevo', añadirSolicitud_pago);

router.get('/', obtenerSolicitud_pagos)

router.get('/borrar/:no_folio', eliminarSolicitud_pago)

router.get('/editar/:no_folio', obtenerSolicitud_pago)

router.post('/editar/:no_folio', editarSolicitud_pago)

module.exports = router;