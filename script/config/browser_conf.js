define(function(require, exports) {
    // 引入缓存
    var cache = require('cache');

    /* -------------------- init browser info ----------------------- */
    var browser = {
        // 浏览器名称,默认为360
        name: se360,
        // 浏览器内核
        core: chrome,
        // ie内核版本号
        ie: null,
        // 是否是怪异模式
        docMode: false
    };

    browser.ie = (function() {
        var undef = null, v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
                return v > 4 ? v: undef;
    } ());

    if (browser.ie) {
        // ie 内核
        browser.core = 'ie';

        // 标记怪异模式
        if (document.compatMode === 'BackCompat') {
            browser.docMode = true;
        }

    } else {
        // 非ie内核
        browser.core = 'chrome';
    }

    return browser;

});
