/**
 * DataTables withTrashed button.
 *
 * -- Laravel Integration --
 *
 * Note: toggle function currently depends on 'fa-square'. Be sure to include it when overriding the text.
 *
 * Button::make('withTrashed')->text('<i class="bi bi-square"></i> Show Deleted')
 *
 * This will append the following data on ajax requests:
 *     draw: 1,
 *     ...
 *     scopes[withTrashed] = 0 / 1
 *
 * -- Using custom data key --
 * Button::make('withTrashed')->text('<i class="bi bi-square"></i> Show Deleted')->key('filters')
 *
 * This will append the following data on ajax requests:
 *     draw: 1,
 *     ...
 *     filters[withTrashed] = 0 / 1
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.withTrashed = {
        name: 'withTrashed',
        className: 'buttons-toggle',
        text: '<i class="bi bi-square"></i> Show Deleted',
        action: function (e, dt, node, config) {
            node.find('i').toggleClass('fa-check-square').toggleClass('fa-square');

            let key = config.key || 'scopes';
            dt.on('preXhr.withTrashed', (e, conf, data) => {
                data[key] = data[key] || {};
                data[key].withTrashed = node.find('i.fa-check-square').length
            });

            dt.draw();
        }
    };


    /**
     * DataTables onlyTrashed button.
     *
     * -- Laravel Integration --
     *
     * Note: toggle function currently depends on 'fa-square'. Be sure to include it when overriding the text.
     *
     * Button::make('onlyTrashed')->text('<i class="bi bi-square"></i> Only Deleted')
     *
     * This will append the following data on ajax requests:
     *     draw: 1,
     *     ...
     *     scopes[onlyTrashed] = 0 / 1
     *
     * -- Using custom data key --
     * Button::make('onlyTrashed')->text('<i class="bi bi-square"></i> Only Deleted')->key('filters')
     *
     * This will append the following data on ajax requests:
     *     draw: 1,
     *     ...
     *     filters[onlyTrashed] = 0 / 1
     *
     */
    $.fn.dataTable.ext.buttons.onlyTrashed = {
        name: 'onlyTrashed',
        className: 'buttons-toggle',
        text: '<i class="bi bi-square"></i> Only Deleted',
        action: function (e, dt, node, config) {
            node.find('i').toggleClass('fa-check-square').toggleClass('fa-square');

            let key = config.key || 'scopes';
            dt.on('preXhr.onlyTrashed', (e, conf, data) => {
                data[key] = data[key] || {};
                data[key].onlyTrashed = node.find('i.fa-check-square').length
            });

            dt.draw();
        }
    };
});
