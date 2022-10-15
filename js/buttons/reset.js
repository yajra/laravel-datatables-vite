/**
 * DataTables reset button.
 *
 * -- Laravel Integration --
 *
 * Button::make('reset')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.reset = {
        name: 'reset',
        className: 'btn-primary',
        titleAttr: 'Reset',
        text: '<i class="bi bi-arrow-counterclockwise"></i>',
        action: function (e, dt, button, config) {
            $('.dataTable').find(':input').each(function () {
                $(this).val('');
            }).each(function (e) {
                let val = $.fn.dataTable.util.escapeRegex($(this).val());
                dt.table().column($(this).closest('th').index()).search(val ? val : '', false, true);
            });
            dt.search('').draw();
        }
    };
});
