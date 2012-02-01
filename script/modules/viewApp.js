define(function(require, exports) {

    var $ = {};

    $.timer = require('dom/timer');
    $.a = require('dom/modA');
    $.b = require('dom/modB');
    $.c = require('dom/modC');
    
    var config = function(code) {
        var html = '';
        switch(code) {
            case '110011':
                html = timer.init() + a.init() + b.init();
            break;
            case '110000':
                html = a.init();
            break;
            case '000000':
                html = b.init();
            break;
            default:
                break;
        }
        return html;
    };

    var init = function(conf) {
        var i = 0;
        var len = conf.length;
        var tmpFn;
        var html = '';
        
        for ( ; i < len; i++) {
            tmpFn = $[conf[i]];
            html = html + tmpFn.init();
        }

        return html;
    };

    //exports.conf = config;
    exports.init = init;
    
});
