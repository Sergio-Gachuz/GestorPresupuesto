const database = require('../database');
const layout = {layout: 'main'};

const obtenerVistaNuevoProveedor = (req, res) =>{
    res.render('proveedor/nuevo', layout);
}

const añadirProveedor = async(req, res) => { 
    const {nombre, razon_social, rfc, domicilio, codigo_postal, email} = req.body
    const nuevoProveedor = {
        nombre,
        razon_social,
        rfc,
        domicilio,
        codigo_postal,
        email
    };

    await database.query('insert into proveedor set ?', [nuevoProveedor]);
    req.flash('success', 'Proveedor guardado correctamente');
    res.redirect('/proveedor');
}

const obtenerProveedores = async(req, res) => {
    const lista_proveedores = await database.query('select * from proveedor')
    res.render('proveedor/listar', {
        layout: 'main',
        lista_proveedores
    });
}

const eliminarProveedor = async(req, res)=>{
    const { proveedor_id } = req.params
    await database.query('delete from proveedor where proveedor_id = ?', [proveedor_id]);
    req.flash('success', 'Proveedor eliminado correctamente');
    res.redirect('/proveedor');
}

const obtenerProveedor = async(req, res)=>{
    const { proveedor_id } = req.params;
    const proveedor = await database.query('select * from proveedor where proveedor_id = ?', [proveedor_id])
    res.render('proveedor/editar', {
        layout: 'main',
        proveedor: proveedor[0]})
}

const editarProveedor = async(req, res) => {
    const { proveedor_id } = req.params;
    const {nombre, razon_social, domicilio, codigo_postal, email} = req.body;
    const actualizarProveedor = {
        nombre,
        razon_social,
        domicilio,
        codigo_postal,
        email
    };
    await database.query('update proveedor set ? where proveedor_id = ?', [actualizarProveedor, proveedor_id]);
    req.flash('success', 'Proveedor actualizado correctamente');
    res.redirect('/proveedor');
}

module.exports = {
    obtenerVistaNuevoProveedor,
    añadirProveedor,
    obtenerProveedores,
    eliminarProveedor,
    obtenerProveedor,
    editarProveedor
}