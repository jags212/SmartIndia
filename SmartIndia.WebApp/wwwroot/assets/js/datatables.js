$('#dtschedular').DataTable({
    "searching": true,
    "paging": true,
    "info": true,
    "lengthChange": true,
    'columnDefs': [{
        'targets': [0, 3, 4, 5, 6], // column index (start from 0)
        'orderable': true, // set orderable false for selected columns
    }],
    order: [[2, 'asc']],
});