define(function(require, exports) {

    var _ = require('underscore');
    var $ = require('jquery');
    var modMsg = require('core/msg').reg('modTimer');
    var data = require('core/data').reg('data');

   /* -------------------- init HTML ----------------------- */
    var html = '<div id="mod-timer">Mod-Timer 模块加载成功</div>';
    var id = '#mod-timer';
    var tmpl = 'Mod-A 中的 data 变化为 <%= info %>';

    // init view
    var init = function() {

        var time = 0;
        setInterval(function() {
            $(id).html(++time);
        }, 1000);

        modMsg.listen('clearTimer', function() {
            time = 0;
        });

       return html;
    };

    // open API
    exports.init = init;

});
