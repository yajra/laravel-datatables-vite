/**
 * DataTables csv button.
 *
 * -- Laravel Integration --
 *
 * Button::make('csv')->text('<i class="bi bi-file-csv"></i> Export to CSV')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.csv = {
        name: 'csv',
        className: 'buttons-csv btn-primary',
        titleAttr: 'Export as CSV',
        text: '<i class="bi bi-filetype-csv"></i>',
        action: function (e, dt, button, config) {
            window.location = _buildUrl(dt, 'csv');
        }
    };
});
