$('#dtschedular').DataTable({
    "searching": false,
    "paging": false,
    "info": false,
    "lengthChange": false,
    'columnDefs': [{
        'targets': [0, 3, 4, 5, 6, 7], // column index (start from 0)
        'orderable': false, // set orderable false for selected columns
    }],
    order: [[2, 'asc']],
});