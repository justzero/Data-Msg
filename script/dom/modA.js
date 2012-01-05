define(function(require, exports) {

    var modMsg = require('core/msg').reg('modA');
    var data = require('core/data').reg('data');
    var $ = require('jquery');

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

    // init view
    var init = function() {

        // listen data change
        data.listen('info', function(o) {
            var json = data.get();
            $('#modA').html(json.info);
        });

        return html;
    };

    // open API
    exports.init = init;

});
