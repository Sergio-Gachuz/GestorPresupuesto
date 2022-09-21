const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerVistaNuevoSolicitud_pago, añadirSolicitud_pago, obtenerSolicitud_pagos, eliminarSolicitud_pago, obtenerSolicitud_pago, editarSolicitud_pago } = require('../controller/solicitud_pago');

router.get('/nuevo', isLoggedIn, obtenerVistaNuevoSolicitud_pago );

router.post('/nuevo', isLoggedIn, añadirSolicitud_pago);

router.get('/', isLoggedIn, obtenerSolicitud_pagos)

router.get('/borrar/:no_folio', isLoggedIn, eliminarSolicitud_pago)

router.get('/editar/:no_folio', isLoggedIn, obtenerSolicitud_pago)

router.post('/editar/:no_folio', isLoggedIn, editarSolicitud_pago)

module.exports = router;