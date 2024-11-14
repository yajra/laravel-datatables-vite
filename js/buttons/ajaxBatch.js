/**
 * DataTables Batch Ajax action button.
 *
 * -- Laravel Integration --
 *
 * Button::make('ajaxBatch')
 *     ->text('Restore')
 *     ->url(route('batch-restore-action-url'))
 *     ->confirmation('Confirm restore _COUNT_ item_PLURAL_?') // Optional if you want confirmation before proceeding.
 *     ->onCancel('function(response) { alert('confirmation cancelled') }')
 *     ->onSuccess('function(response) { alert('success') }')
 *     ->onError('function(err) { alert('error') }')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.ajaxBatch = {
        name: 'ajaxBatch',
        extend: 'selected',
        className: 'buttons-ajax',
        text: 'Ajax Batch Action (Change Me)',
        action: function (e, dt, node, config) {
            const selected = dt.rows({selected: true}).data();
            const formData = { data: [] };
            for (let i = 0; i < selected.count(); i++) {
                formData.data.push(selected[i]);
            }

            if (config.hasOwnProperty('confirmation')) {
                const confirmation = config.confirmation
                    .replaceAll("_COUNT_", selected.length)
                    .replaceAll("_PLURAL_", selected.length > 1 ? "s" : "");
                if (! confirm(confirmation)) {
                    if (config.hasOwnProperty('onCancel')) config.onCancel();

                    return false;
                }
            }

            const url = config.url || '';
            const method = config.method || 'POST';

            $.ajax({
                url: url,
                method: method,
                data: formData
            }).done(response => {
                if (config.hasOwnProperty('onSuccess')) config.onSuccess(response);

                dt.draw();
            }).fail(err => {
                if (config.hasOwnProperty('onError')) config.onError(err);
            })
        }
    };
});
