"use strict";

document.addEventListener('DOMContentLoaded', function () {
    DataTable.render.badge = function (badgeType) {
        return function (d, type, row) {
            if (!badgeType) {
                badgeType = 'info';
            }

            return '<span class="badge badge-' + badgeType + '">' + d + '</span>'
        };
    };

    DataTable.render.boolean = function () {
        return function (d) {
            let mode = 'danger';
            let label = "N";
            if (d || "1" === d) {
                mode = 'success';
                label = "Y";
            }

            return '<span class="badge badge-' + mode + '">' + label + '</span>'
        };
    };


    DataTable.render.suffix = function (suffix) {
        return function (d) {
            return d + ' ' + suffix;
        };
    };

    DataTable.render.prefix = function (prefix) {
        return function (d) {
            return prefix + ' ' + d;
        };
    };

});