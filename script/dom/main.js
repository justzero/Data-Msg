define(function(require, exports) {
    
    var modMsg = require('core/msg').reg('modMain');
    var data = require('core/data').reg('data');
    var _ = require('underscore');
    var $ = require('jquery');
    var viewApp = require('modules/viewApp');

    // static info
    var html = '<div id="modMain">Mod-main主模块加载成功</div>';
    var id = '#modMain';

    // init html elem
    var init = function() {

        // add listen data
        data.listen('code', function(o) {
            var json = data.get();
            var html =viewApp.conf(json.code);
            $(html).appendTo(id);
        });

        return html;
    };

    // open API
    exports.init = init;

});
