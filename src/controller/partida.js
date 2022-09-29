const database = require('../database');
const layout = {layout: 'main'};
const helpers = require('../lib/helpers');

const obtenerVistaNuevoPartida = (req, res) =>{
    res.render('partida/nuevo', layout);
}

const añadirPartida = async(req, res, done) => { 
    const {no_partida, descripcion, presupuesto_inicial} = req.body;
    await database.query('select no_partida from partida where no_partida = ?', [no_partida], async(err, result, field) => {
        if(result.length === 0){
            const nuevoPartida = {
                no_partida,
                descripcion,
                presupuesto_inicial
            };
            nuevoPartida.presupuesto_inicial = presupuesto_inicial.replace(/,/g, "");
            await database.query('insert into partida set ?', [nuevoPartida]);
            req.flash('success', 'Partida guardada correctamente.');
            res.redirect('/partida');
        }else{  
            req.flash('message', 'Ya existe partida con ese número.');
            res.redirect('/partida');
        }
    });
}

const obtenerPartidas = async(req, res) => {
    const lista_partidas = await database.query('select * from partida')
    lista_partidas.forEach(element => {
        element.presupuesto_inicial = helpers.currency(element.presupuesto_inicial);
        element.egresos = helpers.currency(element.egresos);
        element.presupuesto_actual = helpers.currency(element.presupuesto_actual);
    });
    res.render('partida/listar', {layout: 'main',lista_partidas});
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

const obtenerPartida = async(req, res)=>{
    const { partida_id } = req.params;
    const partida = await database.query('select * from partida where partida_id = ?', [partida_id])
    res.render('partida/editar', {layout: 'main', partida: partida[0]})
}

const editarPartida = async(req, res) => {
    const { partida_id } = req.params;
    const {no_partida, descripcion, presupuesto_inicial} = req.body;
    const actualizarPartida = {
        no_partida,
        descripcion,
        presupuesto_inicial
    };
    actualizarPartida.presupuesto_inicial = presupuesto_inicial.replace(/,/g, "");
    await database.query('update partida set ? where partida_id = ?', [actualizarPartida, partida_id]);
    req.flash('success', 'Partida actualizado correctamente.');
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