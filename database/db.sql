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
    rfc varchar(16),
    nombre varchar(100),
    razon_social varchar(100),
    codigo_postal int,
    domicilio varchar(150),
    email varchar(50)
);

create table tipo_contrato(
    tipo_id int auto_increment primary key not null,
    descripcion varchar(15) not null
);

create table partida(
    partida_id int auto_increment primary key not null,
    no_partida varchar(10),
    descripcion varchar(250),
    presupuesto_inicial decimal(20,2),
    egresos decimal(20,2),
    presupuesto_actual decimal(20,2),
    unique(no_partida)
);

create table contrato(
    contrato_id int auto_increment primary key not null,
    suma_total decimal(20,2),
    restante decimal(20,2),
    vigencia varchar(10),
    tipo_id int,
    proveedor_id int,
    partida_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint contratoFK1 foreign key (tipo_id) references tipo_contrato(tipo_id),
    constraint contratoFK2 foreign key (proveedor_id) references proveedor(proveedor_id),
    constraint contratoFK3 foreign key (partida_id) references partida(partida_id)
);

create table solicitud_pago(
    solicitud_id int auto_increment primary key not null,
    importe decimal(20,2),
    concepto varchar(250),
    partida_id int,
    proveedor_id int,
    contrato_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint SolicitudFK1 foreign key (partida_id) references partida(partida_id),
    constraint SolicitudFK2 foreign key (proveedor_id) references proveedor(proveedor_id),
    constraint SolicitudFK3 foreign key (contrato_id) references contrato(contrato_id)
);

insert into tipo_contrato (descripcion) values ("Indeterminado"),("Temporal");