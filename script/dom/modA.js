define(function(require, exports) {

    var _ = require('underscore');
    var $ = require('jquery');
    var modMsg = require('core/msg').reg('modA');
    var data = require('core/data').reg('data');

    /* -------------------- test view msg ----------------------- */
    modMsg.listen('close', function() {
        //console.log(this.name, 'listened close!');
    });

    /* -------------------- test data msg ----------------------- */

    //console.log('start:', data.get());
    data.listen('', function(options) { // listen data.conf.flag
        //console.log('options:', options);
        //console.log('end:', data.get());
    });

    /* -------------------- init HTML ----------------------- */
    var html = '<div id="modA">Mod-A 模块加载成功</div>';
    var id = '#modA';
    var tmpl = 'Mod-A 中的 data 变化为 <%= info %>';

    // init view
    var init = function() {

        // listen data change
        data.listen('info', function(o) {
            var json = data.get();
            var html = _.template(tmpl);
            $('#modA').html(html({
                info: json.info
            }));
        });

        modMsg.listen('display', function() {
            $(id).show(800);
        });

        $(id).live('click', function() {
            modMsg.send('clearTimer');
            $(this).hide(800);
            modMsg.send('delay');
        });

        return html;
    };

    // open API
    exports.init = init;

});
