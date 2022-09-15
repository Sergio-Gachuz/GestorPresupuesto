require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const mensaje = require('connect-flash');
const express_session = require('express-session');
const mysqlStorage = require('express-mysql-session');

const datosDB = {
    'host': process.env.host,
    'user': process.env.user,
    'password': '',
    'database': process.env.database

}

//* Inicializaciones
const app = express();

//* Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//* Middlewares
app.use(cors());
app.use(express_session({
    secret: 'prueba',
    resave: false,
    saveUninitialized:false,
    store: new mysqlStorage(datosDB)
}))
app.use(mensaje());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

//* Variables Globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    next();
})

//* Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/proveedor', require('./routes/proveedor'));
app.use('/partida', require('./routes/partida'));
app.use('/contrato', require('./routes/contrato'));
app.use('/solicitud_pago', require('./routes/solicitud_pago'));

//* Publico
app.use(express.static(path.join(__dirname, 'public')));

//* Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})