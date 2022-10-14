document.addEventListener('DOMContentLoaded', function () {
    let oTable = $('table');
    oTable.on('select.dt', function (e, dt, type, indexes) {
        dt.rows({selected: true}).every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            if (data.deleted_at == null) {
                dt.button('restore:name').disable();
                dt.button('forceDelete:name').disable();
                dt.button('forceDeleteSingle:name').disable();
            }
        });
    });

    oTable.on('deselect.dt', function (e, dt, type, indexes) {
        dt.rows({selected: true}).every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            if (data.deleted_at == null) {
                dt.button('restore:name').disable();
                dt.button('forceDelete:name').disable();
                dt.button('forceDeleteSingle:name').disable();
            }
        });
    });
});
