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

const obtenerUsuarios = async(req, res) => {
    const lista_usuarios = await database.query('select * from usuario where usuario_id != ?', [req.user.usuario_id])
    res.render('usuario/listar', {layout: 'main',lista_usuarios});
}

const eliminarUsuario = async(req, res)=>{
    const { usuario_id } = req.params
    await database.query('delete from usuario where usuario_id = ?', [usuario_id], (err, result) => {
        if (err) {
            console.log(err);
            req.flash('message', 'Error al eliminar este usuario');
            res.redirect('/usuario/');
        } else {
            req.flash('success', 'Usuario eliminado correctamente.');
            res.redirect('/usuario/');
        }
    });
}

module.exports = {
    vistaSignUp,
    vistaLogIn,
    profile, 
    obtenerUsuarios,
    eliminarUsuario
}