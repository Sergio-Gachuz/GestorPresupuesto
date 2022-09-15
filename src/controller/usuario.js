const database = require('../database');
const passport = require('passport');

const vistaSignUp = (req, res) =>{
    res.render('auth/signup', {layout: 'home'});
}

const vistaLogIn = (req, res) =>{
    res.render('auth/signin', {layout: 'home'});
}

const profile = (req, res) => {
    res.render('miperfil', {layout: 'main'});
}

module.exports = {
    vistaSignUp,
    vistaLogIn,
    profile
}