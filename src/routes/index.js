const express = require('express');
const router = express.Router();
const {vistaLogIn} = require('../controller/usuario');

router.get('/', vistaLogIn)

module.exports = router;