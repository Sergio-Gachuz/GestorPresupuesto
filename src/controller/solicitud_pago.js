const database = require('../database');
const helpers = require('../lib/helpers');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');
const { readFileSync } = require('fs');
const hbs = require('handlebars');
const intToText = require('numero-a-letras');

const obtenerVistaNuevoSolicitud_pago = async(req, res) => {
    const lista_proveedores = await database.query('select * from proveedor');
    const lista_partidas = await database.query('select * from partida');
    res.render('solicitud_pago/nuevo', {
        layout: 'main', 
        lista_proveedores,
        lista_partidas
    });
}

const obtenerContratosProveedor = async(req, res) => {
    const { proveedor_id, partida_id } = req.params;
    const query = await database.query('select contrato_id, suma_total, vigencia, tipo_contrato.descripcion as tipo from contrato inner join proveedor on contrato.proveedor_id = proveedor.proveedor_id inner join partida on partida.partida_id = contrato.partida_id inner join tipo_contrato on contrato.tipo_id = tipo_contrato.tipo_id where contrato.proveedor_id = ? and contrato.partida_id = ?', [proveedor_id, partida_id]);
    res.json(query);
}

const obtenerRestanteContrato = async(req, res) => {
    const { contrato_id } = req.params;
    const [ query ] = await database.query('select restante from contrato where contrato_id = ?', [contrato_id]);
    res.json(query);
}

const añadirSolicitud_pago = async(req, res) => { 
    const { proveedor_id, partida_id, importe, concepto } = req.body

    await database.query('select * from contrato where partida_id = ? and proveedor_id = ? order by contrato_id desc limit 1', [partida_id, proveedor_id], async(err, result, field) => {
        if(result.length > 0){

            const contrato = await database.query('select contrato_id, suma_total, restante from contrato where partida_id = ? and proveedor_id = ? order by contrato_id desc limit 1', [partida_id, proveedor_id])
            const partida = await database.query('select * from partida where partida_id = ?', [partida_id])

            var importeInt = importe.replace(/,/g, "");
            importeInt = Number(importeInt);

            if (partida[0].presupuesto_actual == null) {
                if (contrato[0].restante >= importeInt && partida[0].presupuesto_inicial >= importeInt ) {
                
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

                    contrato[0].restante = contrato[0].restante - importeInt;

                    const restanteContrato = {
                        restante: contrato[0].restante
                    }
    
                    await database.query('insert into solicitud_pago set ?', [nuevaSolicitud]);
                    await database.query('update partida set egresos = ?, presupuesto_actual = ? where partida_id = ?', [totalEgresos, presupuesto_actual, partida_id]);
                    await database.query('update contrato set ? where contrato_id = ?', [restanteContrato, contrato[0].contrato_id])
                    req.flash('success', 'Solicitud de pago se generó correctamente.');
                    res.redirect('/solicitud_pago');
                
                } else {
                    req.flash('message', 'El importe a pagar excede el presupuesto.');
                    res.redirect('/solicitud_pago');
                }
            } else {
                if (contrato[0].restante >= importeInt && partida[0].presupuesto_inicial >= importeInt && partida[0].presupuesto_actual >= importeInt && partida[0].presupuesto_actual > 0) {
                
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

                    contrato[0].restante = contrato[0].restante - importeInt;

                    const restanteContrato = {
                        restante: contrato[0].restante
                    }
    
                    await database.query('insert into solicitud_pago set ?', [nuevaSolicitud]);
                    await database.query('update partida set egresos = ?, presupuesto_actual = ? where partida_id = ?', [totalEgresos, presupuesto_actual, partida_id]);
                    await database.query('update contrato set ? where contrato_id = ?', [restanteContrato, contrato[0].contrato_id])
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
            res.redirect('/solicitud_pago');
        } else {
            req.flash('success', 'Solicitud de pago eliminada correctamente.');
            res.redirect('/solicitud_pago');
        }
    });
}

const obtenerSolicitud_pago = async(req, res)=>{
    const { solicitud_id } = req.params;
    const solicitud_pago = await database.query('select solicitud_id, partida.no_partida as num_partida, proveedor.nombre as prov_nombre, importe, concepto from solicitud_pago inner join partida on solicitud_pago.partida_id = partida.partida_id inner join proveedor on solicitud_pago.proveedor_id = proveedor.proveedor_id where solicitud_id = ?', [solicitud_id])
    res.render('solicitud_pago/editar', {
        layout: 'main', 
        solicitud_pago: solicitud_pago[0]
    })
}

const editarSolicitud_pago = async(req, res) => {
    const { solicitud_id } = req.params;
    const { concepto } = req.body

    const actualizarSolicitud = {
        concepto
    };

    await database.query('update solicitud_pago set ? where solicitud_id = ?', [actualizarSolicitud, solicitud_id]);
    req.flash('success', 'Solicitud de pago actualizada correctamente.');
    res.redirect('/solicitud_pago');
}

const compilar = async function(plantilla, data){
    const rutaArchivo = path.join(__dirname, '../views/pdfs', `${plantilla}.hbs`)
    const html = await fs.readFile(rutaArchivo, 'utf-8')
    return hbs.compile(html)(data);
}

const descargarPDF = async(req, res) => {  
    const { solicitud_id } = req.params;

    let navegador = await puppeteer.launch();
    let pagina = await navegador.newPage();

    const solicitud_pago = await database.query('select solicitud_id, date(created_at) as fecha, year(created_at) as anio, importe, concepto, no_partida, partida.descripcion as descripcion, nombre from solicitud_pago inner join proveedor on solicitud_pago.proveedor_id = proveedor.proveedor_id inner join partida on partida.partida_id = solicitud_pago.partida_id where solicitud_id = ?', [solicitud_id]);

    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };

    solicitud_pago.forEach(element => {
        element.numero_letras = intToText.NumerosALetras(element.importe);
        element.importe = helpers.currency(element.importe);
        element.fecha = element.fecha.toLocaleDateString('es-MX', opciones);
    });

    data = {
        src: `data:image/jpeg; base64,${readFileSync(path.join(__dirname, '../public/img/celaya.png')).toString('base64')}`,
        folio: 'COM.SOC. ' + solicitud_pago[0].solicitud_id + '/' + solicitud_pago[0].anio,
        fecha: solicitud_pago[0].fecha,
        beneficiario: solicitud_pago[0].nombre,
        no_partida: solicitud_pago[0].no_partida,
        desc: solicitud_pago[0].descripcion,
        importe: solicitud_pago[0].importe,
        numero_letras: solicitud_pago[0].numero_letras,
        concepto: solicitud_pago[0].concepto,
    }

    const contenido = await compilar('solicitud', data)

    await pagina.setContent(contenido);
    await pagina.waitForSelector("img");
    await pagina.emulateMediaType('screen');
    
    let pdf = await pagina.pdf({
        format: 'letter',
        printBackground: true
    })

    navegador.close()

    res.contentType('application/pdf');
    res.send(pdf)
}

module.exports = {
    obtenerVistaNuevoSolicitud_pago,
    añadirSolicitud_pago,
    obtenerSolicitud_pago,
    eliminarSolicitud_pago,
    obtenerSolicitud_pagos,
    editarSolicitud_pago,
    obtenerContratosProveedor,
    obtenerRestanteContrato,
    descargarPDF
}