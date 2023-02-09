/**
 * DataTables forceDeleteSingle button.
 *
 * -- Laravel Integration --
 *
 * Button::make('forceDeleteSingle')->text('Permanently Delete Selected Record')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.forceDeleteSingle = {
        name: 'forceDeleteSingle',
        extend: 'selectedSingle',
        className: 'buttons-force-delete btn-danger',
        text: '<i class="bi bi-trash"></i> Force Delete',
        action: function (e, dt, node, config) {
            let editor = config.editor || dt.editor();
            editor.remove(dt.rows({selected: true}).indexes(), {
                title: config.formTitle || 'Force Delete Record',
                message: function (e, dt) {
                    let row = dt.row({selected: true}).data();
                    let msg = row.DTE_Remove || 'Are you sure you want to force delete record # ' + row.DT_RowId + '?'
                    return msg;
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
