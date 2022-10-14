/**
 * DataTables Toggle Scope button.
 *
 * -- Laravel Integration --
 *
 * Note: toggle function currently depends on 'fa-square'. Be sure to include it when overriding the text.
 *
 * Button::make('toggleScope')
 *     ->text('<i class="fa fa-square"></i> Only Deleted')
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
        className: 'buttons-toggle btn-secondary',
        text: '<i class="fa fa-square"></i> Toggle',
        action: function (e, dt, node, config) {
            node.find('i').toggleClass('fa-check-square').toggleClass('fa-square');

            let scope = config.scope;
            let key = config.key || 'scopes';
            dt.on('preXhr.' + scope, (e, conf, data) => {
                data[key] = data[key] || {};
                data[key][scope] = node.find('i.fa-check-square').length
            });

            dt.draw();
        }
    };
});
