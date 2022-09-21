const database = require('../database');
const layout = {layout: 'main'};

const obtenerVistaNuevoSolicitud_pago = (req, res) =>{
    res.render('solicitud_pago/nuevo', layout);
}

const añadirSolicitud_pago = async(req, res) => { 
    const {no_folio, fecha, importe, concepto, partida_id, proveedor_id } = req.body
    const nuevoSolicitud_pago = {
        no_folio,
        fecha,
        importe,
        concepto,
        partida_id,
        proveedor_id
    };

    await database.query('insert into solicitud_pago set ?', [nuevoSolicitud_pago]);
    req.flash('success', 'solicitud_pago guardado correctamente');
    res.redirect('/solicitud_pago');
}

const obtenerSolicitud_pagos = async(req, res) => {
    const lista_solicitud_pago = await database.query('select * from solicitud_pago')
    res.render('solicitud_pago/listar', {layout: 'main',lista_solicitud_pago});
}

const eliminarSolicitud_pago = async(req, res)=>{
    const { no_folio } = req.params
    await database.query('delete from solicitud_pago where no_folio = ?', [no_folio]);
    req.flash('success', 'Solicitud_pago eliminado correctamente');
    res.redirect('/solicitud_pago');
}

const obtenerSolicitud_pago = async(req, res)=>{
    const { no_folio } = req.params;
    const solicitud_pago = await database.query('select * from solicitud_pago where no_folio = ?', [no_folio])
    res.render('solicitud_pago/editar', {layout: 'main', solicitud_pago: solicitud_pago[0]})
}

const editarSolicitud_pago = async(req, res) => {
    const { no_folio } = req.params;
    const { fecha, importe, concepto, partida_id, proveedor_id } = req.body;
    const actualizarSolicitud_pago = {
        no_folio,
        fecha,
        importe,
        concepto,
        partida_id,
        proveedor_id
    };
    await database.query('update solicitud_pago set ? where no_folio = ?', [actualizarSolicitud_pago, no_folio]);
    req.flash('success', 'Solicitud_pago actualizado correctamente');
    res.redirect('/solicitud_pago');
}

module.exports = {
    obtenerVistaNuevoSolicitud_pago,
    añadirSolicitud_pago,
    obtenerSolicitud_pago,
    eliminarSolicitud_pago,
    obtenerSolicitud_pagos,
    editarSolicitud_pago
}