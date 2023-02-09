/**
 * DataTables URL button.
 *
 * -- Laravel Integration --
 *
 * // Add DTE_URL column to response.
 * datatables($query)
 *     ->addColumn('DTE_URL', '{{ $url }}')
 *     ->addColumn('edit_url', '{{ $url }}')
 *     ...
 *
 * // Add URL button to open the row link.
 * Button::make('url')->text('Edit'),
 * Button::make('url')->data('edit_url')->text('Edit')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.url = {
        name: 'url',
        extend: 'selectedSingle',
        className: 'buttons-url',
        text: 'URL Action (change me)',
        action: function (e, dt, node, config) {
            let data = dt.row({selected: true}).data();
            let key = config.data || 'DTE_URL';
            let url = data[key] || '#';

            if (config.target == '_blank') {
                window.open(url, '_blank')
            } else {
                window.location = url;
            }
        }
    };
});
