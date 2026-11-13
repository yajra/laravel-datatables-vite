/**
 * DataTables reset button.
 *
 * -- Laravel Integration --
 *
 * Button::make('reset')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    DataTable.ext.buttons.reset = {
        name: 'reset',
        className: 'btn-primary',
        titleAttr: 'Reset',
        text: '<i class="bi bi-arrow-counterclockwise"></i>',
        action: function (e, dt, button, config) {
            document.querySelectorAll('.dataTable input, .dataTable select, .dataTable textarea').forEach(function (input) {
                input.value = '';

                let columnHeader = input.closest('th');

                if (!columnHeader) {
                    return;
                }

                let columnIndex = Array.from(columnHeader.parentNode.children).indexOf(columnHeader);
                dt.table().column(columnIndex).search('', false, true);
            });

            dt.search('').draw();
        }
    };
});
