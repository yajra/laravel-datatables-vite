import $ from 'jquery';

import * as Bootstrap from 'bootstrap'
window.jQuery = window.$ = $
window.bootstrap = Bootstrap;

import DataTable from 'datatables.net-bs5';
window.DataTable = DataTable;

import 'datatables.net-buttons-bs5';
import 'datatables.net-select-bs5';
import './dataTables.buttons.js';
import './dataTables.renderers.js';

$.extend(true, DataTable.defaults, {
    dom:
        "<'row'<'col-sm-12 mb-4'B>>" +
        "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
});

$.extend(true, DataTable.Buttons.defaults, {
    dom: {
        buttonLiner: {
            tag: ''
        },
    },
});

$.extend(DataTable.ext.classes, {
    sTable: "dataTable table table-striped table-bordered table-hover",
});
