/**
 * DataTables excel button.
 *
 * -- Laravel Integration --
 *
 * Button::make('excel')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.excel = {
        name: 'excel',
        className: 'buttons-excel btn-primary',
        text: '<i class="fa fa-file-excel-o" data-toggle="tooltip" data-title="Export to Excel"></i>',
        action: function (e, dt, button, config) {
            window.location = _buildUrl(dt, 'excel');
        }
    };
});
