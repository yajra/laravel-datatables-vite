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
        text: '<i class="fa fa-sync" data-toggle="tooltip" data-title="Reload"></i>',
        action: function (e, dt, button, config) {
            dt.draw(false);
        },
        init: function (dt, node, config) {
            dt.on('processing.dt', (e, settings, processing) => {
                let button = $(node);

                if (processing) {
                    button.find('i').removeClass('fa-sync').addClass('fa-spinner fa-spin');
                } else {
                    button.find('i').addClass('fa-sync').removeClass('fa-spinner fa-spin');
                }

                button.attr('disabled', processing);;
            });
        }
    };
});
