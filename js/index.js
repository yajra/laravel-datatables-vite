import $ from 'jquery';
window.jQuery = window.$ = $;

import * as Bootstrap from 'bootstrap';
window.bootstrap = Bootstrap;

import DataTable from 'datatables.net-bs5';
window.DataTable = DataTable;

import 'datatables.net-buttons-bs5';
import 'datatables.net-select-bs5';
import './dataTables.buttons.js';
import './dataTables.renderers.js';

$.extend(true, DataTable.Buttons.defaults, {
    dom: {
        button: {
            liner: {
                tag: ""
            }
        },
    },
});

$.extend(DataTable.ext.classes, {
    sTable: "dataTable table table-striped table-bordered table-hover",
});
