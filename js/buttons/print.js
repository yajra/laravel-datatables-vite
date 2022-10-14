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
        text: '<i class="fa fa-print"></i>',
        action: function (e, dt, button, config) {
            window.location = _buildUrl(dt, 'print');
        }
    };
});
