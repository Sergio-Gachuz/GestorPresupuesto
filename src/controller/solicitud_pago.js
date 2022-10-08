const database = require('../database');
const layout = {layout: 'main'};
const helpers = require('../lib/helpers');

const obtenerVistaNuevoSolicitud_pago = async(req, res) => {
    const lista_proveedores = await database.query('select * from proveedor');
    const lista_partidas = await database.query('select * from partida');
    res.render('solicitud_pago/nuevo', {
        layout: 'main', 
        lista_proveedores,
        lista_partidas
    });
}

const obtenerPartidaProveedor = async(req, res) => {
    const { proveedor_id } = req.params;
    const [ query ] = await database.query('select partida.partida_id from partida inner join contrato on partida.partida_id = contrato.contrato_id where contrato.proveedor_id = ? order by partida.partida_id desc limit 1', [proveedor_id]);
    res.json(query);
}

const añadirSolicitud_pago = async(req, res) => { 
    const { proveedor_id, partida_id, importe, concepto } = req.body

    await database.query('select * from contrato where partida_id = ? and proveedor_id = ? order by contrato_id desc limit 1', [partida_id, proveedor_id], async(err, result, field) => {
        if(result.length > 0){

            const contrato = await database.query('select contrato_id, suma_total from contrato where partida_id = ? and proveedor_id = ? order by contrato_id desc limit 1', [partida_id, proveedor_id])
            const partida = await database.query('select * from partida where partida_id = ?', [partida_id])

            var importeInt = importe.replace(/,/g, "");
            importeInt = Number(importeInt);

            console.log(importeInt);
            console.log(contrato[0].suma_total);
            console.log(partida[0].presupuesto_inicial);
            console.log(partida[0].presupuesto_actual);

            if (partida[0].presupuesto_actual == null) {
                if (contrato[0].suma_total >= importeInt && partida[0].presupuesto_inicial >= importeInt ) {
                
                    var presupuesto_actual, totalEgresos;
                    totalEgresos = partida[0].egresos + importeInt;
                    presupuesto_actual = partida[0].presupuesto_inicial - totalEgresos;
    
                    const nuevaSolicitud = {
                        importe: importeInt,
                        concepto,
                        partida_id,
                        proveedor_id,
                        contrato_id: contrato[0].contrato_id
                    };
    
                    await database.query('insert into solicitud_pago set ?', [nuevaSolicitud]);
                    await database.query('update partida set egresos = ?, presupuesto_actual = ? where partida_id = ?', [totalEgresos, presupuesto_actual, partida_id]);
                    req.flash('success', 'Solicitud de pago se generó correctamente.');
                    res.redirect('/solicitud_pago');
                
                } else {
                    req.flash('message', 'El importe a pagar excede el presupuesto.');
                    res.redirect('/solicitud_pago');
                }
            } else {
                if (contrato[0].suma_total >= importeInt && partida[0].presupuesto_inicial >= importeInt && partida[0].presupuesto_actual >= importeInt && partida[0].presupuesto_actual > 0) {
                
                    var presupuesto_actual, totalEgresos;
                    totalEgresos = partida[0].egresos + costo_contrato;
                    presupuesto_actual = partida[0].presupuesto_inicial - totalEgresos;
    
                    const nuevaSolicitud = {
                        importe: importeInt,
                        concepto,
                        partida_id,
                        proveedor_id,
                        contrato_id: contrato[0].contrato_id
                    };
    
                    await database.query('insert into solicitud_pago set ?', [nuevaSolicitud]);
                    await database.query('update partida set egresos = ?, presupuesto_actual = ? where partida_id = ?', [totalEgresos, presupuesto_actual, partida_id]);
                    req.flash('success', 'Solicitud de pago se generó correctamente.');
                    res.redirect('/solicitud_pago');
                
                } else {
                    req.flash('message', 'El importe a pagar excede el presupuesto.');
                    res.redirect('/solicitud_pago');
                }
            }

        }else{  
            req.flash('message', 'Este proveedor no tiene un contrato registrado.');
            res.redirect('/solicitud_pago');
        }
    });

}

const obtenerSolicitud_pagos = async(req, res) => {
    const lista_solicitud_pago = await database.query('select solicitud_id, date(created_at) as fecha, year(created_at) as anio, importe, concepto, no_partida, nombre from solicitud_pago inner join proveedor on solicitud_pago.proveedor_id = proveedor.proveedor_id inner join partida on partida.partida_id = solicitud_pago.partida_id');
    
    const opciones = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    lista_solicitud_pago.forEach(element => {
        element.importe = helpers.currency(element.importe);
        element.fecha = element.fecha.toLocaleDateString('es-MX', opciones)
    });
    res.render('solicitud_pago/listar', {layout: 'main',lista_solicitud_pago});
}

const eliminarSolicitud_pago = async(req, res)=>{
    const { solicitud_id } = req.params
    await database.query('delete from solicitud_pago where solicitud_id = ?', [solicitud_id], (err, result) => {
        if (err) {
            req.flash('message', 'Error al eliminar. Intente más tarde.');
            res.redirect('/partida');
        } else {
            req.flash('success', 'Solicitud de pago eliminada correctamente.');
            res.redirect('/partida');
        }
    });
}

const obtenerSolicitud_pago = async(req, res)=>{
    const { solicitud_id } = req.params;
    const solicitud_pago = await database.query('select * from solicitud_pago where solicitud_id = ?', [solicitud_id])
    const lista_partidas = await database.query('select * from partida');
    //const lista_tipos = await database.query('select * from tipo_contrato');
    const lista_proveedores = await database.query('select * from proveedor');
    res.render('solicitud_pago/editar', {
        layout: 'main', 
        solicitud_pago: solicitud_pago[0],
        lista_partidas,
        lista_proveedores
    })
}

const editarSolicitud_pago = async(req, res) => {
    const { solicitud_id } = req.params;
    const { proveedor_id, partida_id, concepto } = req.body

    await database.query('select * from contrato where partida_id = ? and proveedor_id = ?', [partida_id, proveedor_id], async(err, result, field) => {
        if(result.length > 0){
            const contrato = await database.query('select contrato_id, suma_total from contrato where partida_id = ? and proveedor_id = ?', [partida_id, proveedor_id])

            const actualizarSolicitud = {
                concepto,
                partida_id,
                proveedor_id,
                contrato_id: contrato[0].contrato_id
            };

            await database.query('update solicitud_pago set ? where solicitud_id = ?', [actualizarSolicitud, solicitud_id]);
            req.flash('success', 'Solicitud de pago actualizada correctamente.');
            res.redirect('/solicitud_pago');
        }else{  
            req.flash('message', 'Este proveedor no tiene un contrato registrado.');
            res.redirect('/solicitud_pago');
        }
    });
}

module.exports = {
    obtenerVistaNuevoSolicitud_pago,
    obtenerPartidaProveedor,
    añadirSolicitud_pago,
    obtenerSolicitud_pago,
    eliminarSolicitud_pago,
    obtenerSolicitud_pagos,
    editarSolicitud_pago
}