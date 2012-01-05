define(function(require, exports) {

    var a = require('dom/modA');
    var b = require('dom/modB');
    var c = require('dom/modC');
    
    var config = function(code) {
        var html = '';
        switch(code) {
            case '110011':
                html = a.init() + b.init();
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

    exports.conf = config;
    
});
