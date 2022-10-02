const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerVistaNuevoSolicitud_pago, obtenerPartidaProveedor, añadirSolicitud_pago, obtenerSolicitud_pagos, eliminarSolicitud_pago, obtenerSolicitud_pago, editarSolicitud_pago } = require('../controller/solicitud_pago');

router.get('/nuevo', isLoggedIn, obtenerVistaNuevoSolicitud_pago );

router.get('/partida_proveedor/:proveedor_id', obtenerPartidaProveedor)

router.post('/nuevo', isLoggedIn, añadirSolicitud_pago);

router.get('/', isLoggedIn, obtenerSolicitud_pagos)

router.get('/borrar/:solicitud_id', isLoggedIn, eliminarSolicitud_pago)

router.get('/editar/:solicitud_id', isLoggedIn, obtenerSolicitud_pago)

router.post('/editar/:solicitud_id', isLoggedIn, editarSolicitud_pago)

module.exports = router;