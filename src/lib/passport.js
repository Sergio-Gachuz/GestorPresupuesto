require('dotenv').config()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const rows = await database.query('select * from usuario where usuario = ?', [username]);
    if (rows.length > 0) {
        const usuario = rows[0];
        const validPassword = await helpers.matchPassword(password, usuario.contrasena);
        (validPassword) ? done(null, usuario, req.flash('sucess','Bienvenido' + usuario.nombre)) : done(null, false, req.flash('message','Contraseña incorrecta'))
    }else{
        return done(null, false, req.flash('message','Usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async(req, username, passoword, done) => {
    const { nombre_completo, cod__ver } = req.body;
    // console.log(cod__ver);
    // console.log(process.env.COD_VER);
    if (cod__ver == process.env.COD_VER) {
        await database.query('select usuario from usuario where usuario = ?', [username], async function(err, result, field){
            if(result.length === 0){
                const nuevoUsuario = {
                    usuario: username,
                    nombre_completo,
                    contrasena: passoword,
                }
                nuevoUsuario.contrasena =  await helpers.encryptPassword(passoword);
                const result = await database.query('insert into usuario set ?', [nuevoUsuario]);
                nuevoUsuario.usuario_id = result.insertId;
                return done(null, nuevoUsuario);
            }else{  
                return done(null, false, req.flash('message','Este usuario ya existe'));
            }
        });
    } else{
        return done(null, false, req.flash('message','Código de verificación no valido'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.usuario_id);
})

passport.deserializeUser( async(usuario_id, done) => {
    const rows = await database.query('select * from usuario where usuario_id = ?', [usuario_id]);
    done(null, rows[0]);
})