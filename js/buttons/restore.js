/**
 * DataTables restore button.
 *
 * -- Laravel Integration --
 *
 * Button::make('restore')->text('Restore Selected Records')
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    $.fn.dataTable.ext.buttons.restore = {
        name: 'restore',
        extend: 'selected',
        className: 'buttons-restore btn-success',
        text: '<i class="bi bi-undo"></i> Restore',
        action: function (e, dt, node, config) {
            let editor = config.editor || dt.editor();
            editor.remove(dt.rows({selected: true}).indexes(), {
                title: config.formTitle || 'Restore Record',
                message: function (e, dt) {
                    let row = dt.row({selected: true}).data();
                    let msg = row.DTE_Restore || 'Are you sure you want to restore record # ' + row.DT_RowId + '?'
                    return msg;
                },
                buttons: [
                    {
                        text: '<i class="bi bi-undo"></i> Restore',
                        className: 'btn btn-success btn-editor-restore',
                        action: function () {
                            this.submit(null, null, function (data) {
                                data.action = 'restore';
                            });
                        }
                    },
                    {
                        text: 'Cancel', className: 'btn ml-2', action: function () {
                            this.close();
                        }
                    }
                ]
            })
        }
    };
});
