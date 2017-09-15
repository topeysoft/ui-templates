function parseContentData(htmlTemplateString, data) {
    re = /{{([^}]*)}}/g
    var html = htmlTemplateString;

    var arr = html.match(re);
    $.each(arr, function (i, e) {
        properyName = $.trim(e.replace('{{', '').replace('}}', ''));
        var prop = data[properyName] || '';
        html = html.replace(e, prop);
    });
    return html;
}

