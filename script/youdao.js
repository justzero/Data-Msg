define(function(require, exports) {

    var $ = require('core/jq');
    var dom = require('dom/main');

    /* -------------------- 主入口 ----------------------- */
    var html = dom.init();

    // append to body
    $(html).appendTo('body');

});

