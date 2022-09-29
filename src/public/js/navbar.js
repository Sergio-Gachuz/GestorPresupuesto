//Ejecutar funcion en el evento click
document.getElementById("btn__open").addEventListener("click", open_close_menu);

//Evento para mostrar y ocultar menú
var side__menu = document.getElementById('menu__side');
var btn__open = document.getElementById('btn__open');
var body = document.getElementById('body');

var miperfil = document.getElementById('miperfil');
var partida = document.getElementById('partida');
var proveedor = document.getElementById('proveedor');
var contrato = document.getElementById('contrato');
var solicitud = document.getElementById('solicitud');

//Ocultar y mostrar menu
function open_close_menu(){
    body.classList.toggle("body__move");
    side__menu.classList.toggle("menu__side__move");
}

if (window.innerWidth < 760) {
    body.classList.add("body__move");
    side__menu.classList.add("menu__side__move");
}

window.addEventListener("resize", function() {
    if (window.innerWidth > 760) {
        body.classList.remove("body__move");
        side__menu.classList.remove("menu__side__move");
    }

    if (window.innerWidth < 760) {
        body.classList.add("body__move");
        side__menu.classList.add("menu__side__move");
    }
});

$(document).ready(function () {
    if(window.location.href.indexOf("miperfil") > -1) {
        miperfil.classList.add('selected');
        partida.classList.remove('selected');
        proveedor.classList.remove('selected');
        contrato.classList.remove('selected');
        solicitud.classList.remove('selected');
    }
    if(window.location.href.indexOf("partida") > -1) {
       miperfil.classList.remove('selected');
       partida.classList.add('selected');
       proveedor.classList.remove('selected');
       contrato.classList.remove('selected');
       solicitud.classList.remove('selected');
    }
    if(window.location.href.indexOf("proveedor") > -1) {
        miperfil.classList.remove('selected');
        partida.classList.remove('selected');
        proveedor.classList.add('selected');
        contrato.classList.remove('selected');
        solicitud.classList.remove('selected');
     }
     if(window.location.href.indexOf("contrato") > -1) {
        miperfil.classList.remove('selected');
        partida.classList.remove('selected');
        proveedor.classList.remove('selected');
        contrato.classList.add('selected');
        solicitud.classList.remove('selected');
     }
    if(window.location.href.indexOf("solicitud") > -1) {
        miperfil.classList.remove('selected');
        partida.classList.remove('selected');
        proveedor.classList.remove('selected');
        contrato.classList.remove('selected');
        solicitud.classList.add('selected');
     }
});

window.onload = function () {
    var datesCollection = document.getElementsByClassName("input-date");
    var dates = Array.from(datesCollection);

    dates.forEach(function (date) {
        new Cleave(date, {
            date: true,
            delimiter: '-',
            datePattern: ['d', 'm', 'Y']
        })
    });

    var moneyCollection = document.getElementsByClassName("input-money");
    var money = Array.from(moneyCollection);

    money.forEach(function (money) {
        new Cleave(money, {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        })
    });
};