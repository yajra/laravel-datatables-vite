/**
 * DataTables add button.
 *
 * -- Laravel Integration --
 *
 * Button::make('add')->text('<i class="bi bi-plus"></i> Add')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.add = {
        name: 'add',
        className: 'buttons-add btn-success',
        text: '<i class="bi bi-plus"></i> New',
        action: function (e, dt, button, config) {
            let uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                uri = uri.substring(0, uri.indexOf("?"));
            }
            window.location = uri + '/create';
        }
    };
});
