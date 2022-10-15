/**
 * DataTables reload button.
 *
 * -- Laravel Integration --
 *
 * Button::make('reload')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.reload = {
        name: 'reload',
        className: 'btn-primary',
        titleAttr: 'Reload',
        text: '<i class="bi bi-arrow-repeat"></i>',
        action: function (e, dt, button, config) {
            dt.draw(false);
        },
        init: function (dt, node, config) {
            let instance = this;
            dt.on('processing.dt', (e, settings, processing) => {
                let button = $(node);

                if (processing) {
                    button.html('<i class="spinner-border spinner-border-sm" role="status">\n' +
                        '  <span class="visually-hidden">Loading...</span>\n' +
                        '</i>');
                } else {
                    button.html('<i class="bi bi-arrow-repeat"></i>');
                }

                button.attr('disabled', processing);
            });
        },
    };
});
