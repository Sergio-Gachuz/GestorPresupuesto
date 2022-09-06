create database gestor_presupuesto;

use gestor_presupuesto;

create table usuario (
    usuario_id int auto_increment primary key not null,
    usuario varchar(15) not null,
    nombre_completo varchar(100) not null,
    contrasena varchar(100) not null,
    unique(usuario)
);

create table proveedor(
    proveedor_id int auto_increment primary key not null,
    rfc varchar(16) not null,
    nombre varchar(100),
    razon_social varchar(100),
    codigo_postal varchar(5),
    domicilio varchar(150),
    email varchar(50),
    unique(rfc)
);

create table tipo_contrato(
    tipo_id int auto_increment primary key not null,
    descripcion varchar(15) not null
);

create table partida(
    partida_id int auto_increment primary key not null,
    no_partida varchar(10) not null,
    descripcion varchar(100) not null,
    presupuesto_inicial decimal(20,2),
    egresos decimal(20,2),
    presupuesto_actual decimal(20,2),
    unique(no_partida)
)

create table contrato(
    contrato_id int primary key not null,
    no_contrato varchar(10) not null,
    suma_total decimal(20,2) not null,
    vigencia date not null,
    tipo_id int not null,
    proveedor_id int not null,
    partida_id int not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    constraint contratoFK1 foreign key (tipo_id) references tipo_contrato(tipo_id),
    constraint contratoFK2 foreign key (proveedor_id) references proveedor(proveedor_id),
    constraint contratoFK3 foreign key (partida_id) references partida(partida_id)
)

create table solicitud_pago(
    no_folio int auto_increment primary key not null,
    fecha date not null,
    importe decimal(20,2) not null,
    concepto varchar(250) not null,
    partida_id int not null,
    proveedor_id int not null,
    usuario_id int not null,
    created_at timestamp,
    updated_at timestamp,
    constraint contratoFK1 foreign key (partida_id) references partida(partida_id),
    constraint contratoFK2 foreign key (proveedor_id) references proveedor(proveedor_id),
    constraint contratoFK3 foreign key (usuario_id) references usuario(usuario_id)
)

insert into tipo_contrato (descripcion) values ("Indeterminado"),("Temporal");