define(function(require, exports) {
    
    var modMsg = require('core/msg').reg('modC');
    var data = require('core/data').reg('data');
    var _ = require('underscore');
    var $ = require('jquery');

    //  test -- 延时修改数据
    var fn = _.bind(data.change,data);
    var fnMsg = _.bind(modMsg.send);

    modMsg.listen('delay', function(o) {
        _.delay(fnMsg, 8000, 'display', {'close': 'close element!'});
    });

    _.delay(fn, 3000, 'code', '110011');
    _.delay(fn, 5000, 'info', '数据修改成功');
    _.delay(fnMsg, 8000, 'close', {'close': 'close element!'});

});
