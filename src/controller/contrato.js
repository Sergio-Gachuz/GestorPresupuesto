const database = require('../database');

const obtenerVistaNuevoContrato = (req, res) =>{
    res.render('contrato/nuevo');
}

const añadirContrato = async(req, res) => { 
    const {no_contrato, suma_total, vigencia, tipo_id, proveedor_id, partida_id} = req.body
    const nuevoContrato = {
        no_contrato,
        suma_total,
        vigencia,
        tipo_id,
        proveedor_id,
        partida_id
    };

    await database.query('insert into contrato set ?', [nuevoContrato]);
    req.flash('success', 'Contrato guardado correctamente');
    res.redirect('/contrato');
}

const obtenerContratos = async(req, res) => {
    const lista_contratos = await database.query('select * from contrato')
    res.render('contrato/listar', {lista_contratos});
}

const eliminarContrato = async(req, res)=>{
    const { contrato_id } = req.params
    await database.query('delete from contrato where contrato_id = ?', [contrato_id]);
    req.flash('success', 'Contrato eliminado correctamente');
    res.redirect('/contrato');
}

const obtenerContrato = async(req, res)=>{
    const { contrato_id } = req.params;
    const contrato = await database.query('select * from contrato where contrato_id = ?', [contrato_id])
    res.render('contrato/editar', {contrato: contrato[0]})
}

const editarContrato = async(req, res) => {
    const { contrato_id } = req.params;
    const {no_contrato, suma_total, vigencia, tipo_id, proveedor_id, partida_id} = req.body;
    const actualizarContrato = {
        no_contrato,
        suma_total,
        vigencia,
        tipo_id,
        proveedor_id,
        partida_id
    };
    await database.query('update contrato set ? where contrato_id = ?', [actualizarContrato, contrato_id]);
    req.flash('success', 'Contrato actualizado correctamente');
    res.redirect('/contrato');
}

module.exports = {
    obtenerVistaNuevoContrato,
    añadirContrato,
    obtenerContratos,
    eliminarContrato,
    obtenerContrato,
    editarContrato
}