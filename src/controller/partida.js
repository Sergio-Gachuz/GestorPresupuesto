const database = require('../database');
const layout = {layout: 'main'};

const obtenerVistaNuevoPartida = (req, res) =>{
    res.render('partida/nuevo', layout);
}

const añadirPartida = async(req, res) => { 
    const {no_partida, descripcion, presupuesto_inicial, egresos, presupuesto_actual} = req.body
    const nuevoPartida = {
        no_partida,
        descripcion,
        presupuesto_inicial,
        egresos,
        presupuesto_actual
    };

    await database.query('insert into partida set ?', [nuevoPartida]);
    req.flash('success', 'Partida guardado correctamente');
    res.redirect('/partida');
}

const obtenerPartidas = async(req, res) => {
    const lista_partidas = await database.query('select * from partida')
    res.render('partida/listar', {layout: 'main',lista_partidas});
}

const eliminarPartida = async(req, res)=>{
    const { partida_id } = req.params
    await database.query('delete from partida where partida_id = ?', [partida_id]);
    req.flash('success', 'Partida eliminado correctamente');
    res.redirect('/partida');
}

const obtenerPartida = async(req, res)=>{
    const { partida_id } = req.params;
    const partida = await database.query('select * from partida where partida_id = ?', [partida_id])
    res.render('partida/editar', {layout: 'main', partida: partida[0]})
}

const editarPartida = async(req, res) => {
    const { partida_id } = req.params;
    const {no_partida, descripcion, presupuesto_inicial, egresos, presupuesto_actual} = req.body;
    const actualizarPartida = {
        no_partida,
        descripcion,
        presupuesto_inicial,
        egresos,
        presupuesto_actual
    };
    await database.query('update partida set ? where partida_id = ?', [actualizarPartida, partida_id]);
    req.flash('success', 'Partida actualizado correctamente');
    res.redirect('/partida');
}

module.exports = {
    obtenerVistaNuevoPartida,
    añadirPartida,
    obtenerPartidas,
    eliminarPartida,
    obtenerPartida,
    editarPartida
}