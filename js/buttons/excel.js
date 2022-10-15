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
        titleAttr: 'Export as Excel',
        text: '<i class="bi bi-file-earmark-excel"></i>',
        action: function (e, dt, button, config) {
            window.location = _buildUrl(dt, 'excel');
        }
    };
});
