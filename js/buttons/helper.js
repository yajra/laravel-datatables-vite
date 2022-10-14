window._buildUrl = function (dt, action) {
    let url = dt.ajax.url() || '';
    let params = dt.ajax.params();
    params.action = action;

    return url + '?' + $.param(params);
};
