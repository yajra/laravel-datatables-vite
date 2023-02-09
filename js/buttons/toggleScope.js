/**
 * DataTables Toggle Scope button.
 *
 * -- Laravel Integration --
 *
 * Note: toggle function currently depends on 'bi-square'. Be sure to include it when overriding the text.
 *
 * Button::make('toggleScope')
 *     ->text('<i class="bi bi-square"></i> Only Deleted')
 *     ->scope('onlyDeleted')
 *
 * This will append the following data on ajax requests:
 *     draw: 1,
 *     ...
 *     scopes[onlyDeleted] = 0 / 1
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.toggleScope = {
        name: 'toggleScope',
        className: 'buttons-toggle',
        text: '<i class="bi bi-square"></i> Toggle',
        action: function (e, dt, node, config) {
            node.find('i').toggleClass('bi-check-square').toggleClass('bi-square');

            let scope = config.scope;
            let key = config.key || 'scopes';
            dt.on('preXhr.' + scope, (e, conf, data) => {
                data[key] = data[key] || {};
                data[key][scope] = node.find('i.bi-check-square').length
            });

            dt.draw();
        }
    };
});
