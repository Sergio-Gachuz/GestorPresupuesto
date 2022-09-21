$(document).ready( function () {
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
} );