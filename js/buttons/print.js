/**
 * DataTables print button.
 *
 * -- Laravel Integration --
 *
 * Button::make('print')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.print = {
        name: 'print',
        className: 'buttons-print btn-primary',
        titleAttr: 'Print',
        text: '<i class="bi bi-printer"></i>',
        action: function (e, dt, button, config) {
            window.location = _buildUrl(dt, 'print');
        }
    };
});
