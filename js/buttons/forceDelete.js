/**
 * DataTables forceDelete button.
 *
 * -- Laravel Integration --
 *
 * Button::make('forceDelete')->text('Permanently Delete Selected Records')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.forceDelete = {
        name: 'forceDelete',
        extend: 'selected',
        className: 'buttons-force-delete btn-danger',
        text: '<i class="bi bi-trash"></i> Force Delete',
        action: function (e, dt, node, config) {
            let editor = config.editor || dt.editor();
            editor.remove(dt.rows({selected: true}).indexes(), {
                title: config.formTitle || 'Force Delete Record(/s)',
                message: function (e, dt) {
                    let data = dt.rows(e.modifier()).data();
                    let rows = data[0].hasOwnProperty('DTE_Remove') ? data.pluck('DTE_Remove') : data.pluck('DT_RowId')
                    return 'Are you sure you want to force delete the ' +
                        'following record(s)? <ul><li>' + rows.join('</li><li>') + '</li></ul>';
                },
                buttons: [
                    {
                        text: '<i class="bi bi-trash"></i> Delete',
                        className: 'btn btn-danger btn-editor-remove',
                        action: function () {
                            this.submit(null, null, function (data) {
                                data.action = 'forceDelete';
                            });
                        }
                    },
                    {
                        text: 'Cancel', className: 'btn ml-2', action: function () {
                            this.close();
                        }
                    }
                ]
            });
        }
    };
});
