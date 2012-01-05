define(function(require, exports) {
    var $ = require('../jquery');

    /* -------------------- 将String转换为JSON ----------------------- */
    var urlToJson = function(string, x) {

        // x 默认为 &
        if (!x) { x = '&'; }

        var obj = {};
        var options = string.replace(/^[?]{1}|[#]{1}$/g, '').split(x);
        var i = 0;
        var len = options.length;
        var e;

        for (i; i < len; i++) {
            e = options[i].split('=');
            if (e[0].length === 0) { continue; }
            obj[e[0]] = e.length === 1 ? '': e[1];
        }

        return obj;
    };

    /* -------------------- 将JSON转换为String ----------------------- */


    /* -------------------- 获取插件参数 ----------------------- */
    // 从插件读入参数
    var local = function(id) {
        var options = $('#' + id);
        var json;

        if (options && options.length !== 0) { // 存在参数
            json = urlToJson(options.html(), ";");
        }else { // 不存在 -- 默认为360浏览器
            json = {
                browser: '360se',
                vendor: 'youdao',
                version: '1.9'
        };
    }
    };

    /* -------------------- open API ----------------------- */
    exports = {
        conf: json,
        setConf: function(key, vel) {
            json[key] = val;
            options.innerHTML = setConfToLocal(json);
        }
    };
});
