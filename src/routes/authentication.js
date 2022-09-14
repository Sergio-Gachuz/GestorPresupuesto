const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, userLogged } = require('../lib/auth');

const { vistaSignUp, vistaLogIn, profile }  = require('../controller/usuario');

router.get('/signup', userLogged, vistaSignUp);

router.post('/signup', userLogged, passport.authenticate('local.signup', {
    successRedirect: '/miperfil',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', userLogged, vistaLogIn)

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/miperfil',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

router.get('/miperfil', isLoggedIn, profile)

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
      });
});

module.exports = router;