//Ejecutar funcion en el evento click
document.getElementById("btn__open").addEventListener("click", open_close_menu);

//Evento para mostrar y ocultar menú
var side__menu = document.getElementById('menu__side');
var btn__open = document.getElementById('btn__open');
var body = document.getElementById('body');

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