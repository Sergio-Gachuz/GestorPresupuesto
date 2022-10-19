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
    const lista_usuarios = await database.query('select * from usuario')
    res.render('usuario/listar', {layout: 'main',lista_usuarios});
}

const eliminarPartida = async(req, res)=>{
    const { partida_id } = req.params
    await database.query('delete from partida where partida_id = ?', [partida_id], (err, result) => {
        if (err) {
            req.flash('message', 'No se puede eliminar esta partida ya que se encuentra en uso.');
            res.redirect('/partida');
        } else {
            req.flash('success', 'Partida eliminado correctamente.');
            res.redirect('/partida');
        }
    });
}

module.exports = {
    vistaSignUp,
    vistaLogIn,
    profile, 
    obtenerUsuarios
}