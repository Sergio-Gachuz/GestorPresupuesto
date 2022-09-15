const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { obtenerVistaNuevoProveedor, añadirProveedor, obtenerProveedores, eliminarProveedor, obtenerProveedor, editarProveedor } = require('../controller/proveedor');

router.get('/nuevo', isLoggedIn, obtenerVistaNuevoProveedor );

router.post('/nuevo', isLoggedIn, añadirProveedor);

router.get('/', isLoggedIn, obtenerProveedores)

router.get('/borrar/:proveedor_id', isLoggedIn, eliminarProveedor)

router.get('/editar/:proveedor_id', isLoggedIn, obtenerProveedor)

router.post('/editar/:proveedor_id', isLoggedIn, editarProveedor)

module.exports = router;