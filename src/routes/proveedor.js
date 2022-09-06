const express = require('express');
const router = express.Router();
const { obtenerVistaNuevoProveedor, añadirProveedor, obtenerProveedores, eliminarProveedor, obtenerProveedor, editarProveedor } = require('../controller/proveedor');

router.get('/nuevo', obtenerVistaNuevoProveedor );

router.post('/nuevo', añadirProveedor);

router.get('/', obtenerProveedores)

router.get('/borrar/:proveedor_id', eliminarProveedor)

router.get('/editar/:proveedor_id', obtenerProveedor)

router.post('/editar/:proveedor_id', editarProveedor)

module.exports = router;