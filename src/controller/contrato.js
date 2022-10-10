const database = require('../database');
const helpers = require('../lib/helpers');

const obtenerVistaNuevoContrato = async(req, res) =>{
    const lista_partidas = await database.query('select * from partida');
    const lista_tipos = await database.query('select * from tipo_contrato');
    const lista_proveedores = await database.query('select * from proveedor');
    res.render('contrato/nuevo', {
        layout: 'main', 
        lista_partidas,
        lista_tipos,
        lista_proveedores
    });
}

const añadirContrato = async(req, res) => { 
    const {suma_total, vigencia, tipo_id, proveedor_id, partida_id} = req.body;
    const partida = await database.query('select presupuesto_inicial, presupuesto_actual from partida where partida_id = ?', [partida_id]);
    var costo_contrato = suma_total.replace(/,/g, "");
    costo_contrato = Number(costo_contrato);
    if (partida[0].presupuesto_inicial > costo_contrato && partida[0].presupuesto_actual != 0) {
        const nuevoContrato = {
            tipo_id,
            partida_id,
            proveedor_id,
            suma_total: costo_contrato,
            restante: costo_contrato,
            vigencia,
        };
        await database.query('insert into contrato set ?', [nuevoContrato]);
        req.flash('success', 'Contrato guardado correctamente.');
        res.redirect('/contrato');
    } else {
        req.flash('message', 'Contrato excede el presupuesto de la partida.');
        res.redirect('/contrato');
    }
}

const obtenerContratos = async(req, res) => {
    const lista_contratos = await database.query('select contrato_id, suma_total, restante, vigencia, nombre, tipo_contrato.descripcion from contrato inner join proveedor on contrato.proveedor_id = proveedor.proveedor_id inner join partida on partida.partida_id = contrato.partida_id inner join tipo_contrato on contrato.tipo_id = tipo_contrato.tipo_id;')
    lista_contratos.forEach(element => {
        element.suma_total = helpers.currency(element.suma_total);
        element.restante = helpers.currency(element.restante);
    });
    res.render('contrato/listar', {layout: 'main',lista_contratos});
}

const eliminarContrato = async(req, res)=>{
    const { contrato_id } = req.params
    await database.query('delete from contrato where contrato_id = ?', [contrato_id], (err, result) => {
        if (err) {
            req.flash('message', 'No se puede eliminar este contrato porque tiene solicitudes de pago registradas.');
            res.redirect('/contrato');
        } else {
            req.flash('success', 'Contrato eliminado correctamente.');
            res.redirect('/contrato');
        }
    });
}

const obtenerContrato = async(req, res)=>{
    const { contrato_id } = req.params;
    const contrato = await database.query('select contrato_id, tipo_contrato.descripcion as tipo, partida.no_partida as num_partida, proveedor.nombre as prov_nombre, suma_total, vigencia from contrato inner join tipo_contrato on contrato.tipo_id = tipo_contrato.tipo_id inner join partida on contrato.partida_id = partida.partida_id inner join proveedor on contrato.proveedor_id = proveedor.proveedor_id where contrato_id = ?', [contrato_id]);
    res.render('contrato/editar', {
        layout: 'main', 
        contrato: contrato[0]
    })
}

const editarContrato = async(req, res) => {
    const { contrato_id } = req.params;
    const { vigencia } = req.body;
    
    const actualizarContrato = {
        vigencia
    };
    await database.query('update contrato set ? where contrato_id = ?', [actualizarContrato, contrato_id]);
    req.flash('success', 'Contrato actualizado correctamente.');
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