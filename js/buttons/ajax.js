/**
 * DataTables Ajax button.
 *
 * -- Laravel Integration --
 *
 * // Add DTE_AJAX column to response.
 * datatables($query)
 *     ->addColumn('DTE_AJAX', '{{ $url }}')
 *     ->addColumn('restore_url', '{{ $url }}')
 *     ...
 *
 * Button::make('ajax')
 *     ->text('Restore')
 *     ->confirmation('Generic confirmation message.') // Optional if you want confirmation before proceeding.
 *     ->onCancel('function(response) { alert('confirmation cancelled') }')
 *     ->onSuccess('function(response) { alert('success') }')
 *     ->onError('function(err) { alert('error') }')
 *     ->method('POST') // default ajax method is POST.
 *
 * Button::make('ajax')
 *     ->text('Restore')
 *     ->data('restore_url')
 *     ->onSuccess('function(response) { alert('success') }')
 *     ->onError('function(err) { alert('error') }')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.ajax = {
        name: 'ajax',
        extend: 'selectedSingle',
        className: 'buttons-ajax',
        text: 'Ajax Action (Change Me)',
        action: function (e, dt, node, config) {
            let data = dt.row({selected: true}).data();
            let url = data[(config.data || 'DTE_AJAX')] || '';
            let method = config.method || 'POST';

            if (config.hasOwnProperty('confirmation')) {
                if (! confirm(config.confirmation)) {
                    if (config.hasOwnProperty('onCancel')) config.onCancel();

                    return false;
                }
            }

            $.ajax({
                url: url,
                method: method,
                data: data
            }).done(response => {
                if (config.hasOwnProperty('onSuccess')) config.onSuccess(response)

                dt.draw();
            }).fail(err => {
                if (config.hasOwnProperty('onError')) config.onError(err)
            })
        }
    };
});
