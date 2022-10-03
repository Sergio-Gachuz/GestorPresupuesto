$(document).ready( function () {
    // Configuración de DataTables
    $('#table').DataTable({
        dom: 'Bfrtip',
        ordering: true,
        responsive: true,
        language: {
            search: "Buscar",
            paginate: {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        },
        buttons: [
            'pdf'
        ]
    });    
});

// Limitar caracteres
$('input[name="rfc"]').keypress(function() { 
    if (this.value.length >= 13 ) { 
        return false; 
    }
});

$('input[name="codigo_postal"]').keypress(function() { 
    if (this.value.length >= 5 ) { 
        return false; 
    }
});

// Funciones para SweetAlert2
function eliminarRegistro(route, id) {
    Swal.fire({
        title: '¿Está seguro de eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            url = route + id;
            window.location = url;
        }
    })
}

function guardarContrato(event, form, titulo, texto = null) {
    event.preventDefault();

    var proveedor_id = $('#proveedor_id').val();
    var partida_id = $('#partida_id').val();
    var tipo_id = $('#tipo_id').val();
    var suma_total = $('#suma_total').val();
    var vigencia = $('#vigencia').val();

    if (proveedor_id == 0 || proveedor_id == '' || partida_id == 0 || partida_id == '' || tipo_id == 0 || tipo_id == '' || suma_total == '' || vigencia == '') {
        Swal.fire(
            'Formulario incompleto',
            'Necesita llenar todos los campos',
            'warning'
        );
    }else{
        Swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        })
    }
}

function guardarSolicitud(event, form, titulo, texto = null) {
    event.preventDefault();

    var proveedor_id = $('#proveedor_id').val();
    var partida_id = $('#partida_id').val();
    var importe = $('#importe').val();
    var descripcion = $('#descripcion').val();

    if (proveedor_id == 0 || proveedor_id == '' || partida_id == 0 || partida_id == '' || importe == '' || descripcion == '') {
        Swal.fire(
            'Formulario incompleto',
            'Necesita llenar todos los campos',
            'warning'
        );
    }else{
        Swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        })
    }
}

function generarPDF(){
    let timerInterval
    Swal.fire({
        title: 'Generando PDF',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            //Aqui va el codigo para generar el PDF
        }
    })
}