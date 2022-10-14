import $ from 'jquery';
import 'bootstrap';
import DataTable from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import Select from 'datatables.net-select-bs5';
import './dataTables.buttons.js';
import './dataTables.renderers.js';

window.jQuery = window.$ = $
window.DataTable = DataTable;

DataTable(window, window.$);
Buttons(window, window.$);
Select(window, window.$);

$.extend(true, $.fn.dataTable.defaults, {
    dom:
        "<'row'<'col-sm-12 mb-4'B>>" +
        "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
});

$.extend($.fn.dataTable.ext.classes, {
    sTable: "dataTable table table-striped table-bordered table-hover",
});
