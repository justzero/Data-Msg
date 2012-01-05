define(function(require, exports) {

    var _ = require('underscore');
    var cache = require('config/cache_conf');

/* -------------------- Data Class ----------------------- */
    var cList = []; // 缓存listen队列

    // Data 构建函数
    var Dt = function(addrs, callback) {
        this.keys = addrs.split('.');
        if (_.isFunction(callback)) {
            cList.push({
                listen: addrs,
                callback: _.bind(callback, this)
            });
        }
    };

    Dt.prototype = {

        // 实时获取最新数据，
        // 如经常使用推荐定义变量缓存下来
        get: function() {
            var keys = _.compact(this.keys);
            var obj = cache;
            while (keys.length > 0) {
                var k = keys.shift();
                if (obj[k] === undefined) {
                    return undefined;
                }
                obj = obj[k];
            }
            return obj;
        },

        // 对数据进行修改
        // 同时会触发所有监听该数据或该数据的父数据的回调
        change: function(key, value) {
            // key -- String: 'data.conf.xxx...'
            if (key === undefined) {
                key = '';
            }

            var obj = cache;
            var i, len;

            //var arr = _.compact(this.keys.concat(key.split('.')));
            key = this.keys.concat(key.split('.'));
            var arr = _.compact(key);
            while (arr.length > 1) {
                var k = arr.shift();
                if (!obj[k]) {
                    obj[k] = {};
                }
                obj = obj[k];
            }
            if (arr && arr.length !== 0) {
                obj[arr[0]] = value;
            } else {
                cache = value;
            }
            
            _.each(cList, function(val) {
                if (new RegExp('^' + val.listen).test(key) ||
                   new RegExp('^' + key).test(val.listen)) {
                    val.callback({key: key, val: value});
                }
            });
        },

        // 添加数据变化的监听事件
        listen: function(key, callback) {
            if (!_.isFunction(callback)) {
                return;
            }
            if (key === undefined) {
                key = '';
            }
            key = _.compact(this.keys.concat(key.split('.')));
            cList.push({
                listen: key.join('.'),
                callback: _.bind(callback, this)
            });
        }
    };

    //return new Dt();
    return {
        reg: function(conf, callback) {
            if (!conf) {
                return new Dt('', callback);
            } else {
                return new Dt(conf, callback);
            }
        }
    };
});
