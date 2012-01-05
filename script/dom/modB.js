define(function(require, exports) {

    var data = require('core/data').reg();

    /* -------------------- msg module test ----------------------- */
    var modMsg = require('core/msg').reg('modB');

    modMsg.send('close', {
        msg: 'close the window'
    });

    /* -------------------- 发送数据修改 ----------------------- */
    data.change('conf.flag.csss', '13');

    /* -------------------- init HTML ----------------------- */
    var html = '<div id="modB">Mod-B 模块加载成功</div>';
    var id = '#modB';

    // init view
    var init = function() {

        return html;
    };

    // openAPI
    exports.init = init;

});
