define(function(require, exports) {

    var $ = require('jquery');
    var consts = require('conf/consts');

    var info = function() {
        var consts = $.require_module('youdao.consts');
        var util = $.require_module('youdao.util');
        var cache = $.require_module('youdao.cache');
        var infoConf = cache.conf;
        var testMod = function(json) {
            if (!json.test) {
                cache.conf.test = 0;
                return;
            }
            if (json.test === '1') {
                cache.conf.test = 1;
                consts.baseUrl = json.baseUrl || consts.baseUrl_test;
                consts.serUrl = json.serUrl || consts.serUrl_test;
                consts.baseCss = json.baseCss || consts.baseCss_test;
                consts.commonCssName = json.commonCssName || consts.commonCssName_test;
                return;
            }
            if (json.test === '2') {
                cache.conf.test = 2;
                if (json.mmUrl) {
                    consts.mmUrl = json.mmUrl;
                }
                return;
            }
        };
        var options = document.getElementById(consts.optionsID);
        if (options) {
            var json = util.urlToJson(options.innerHTML, ";");
            cache.localConf = json;
            //make all page position to the down
            cache.localConf.position = 'down' ;
            testMod(json);
            for (var item in json)
                if (cache.conf[item]) cache.conf[item] = json[item];
        }else {
            cache.localConf = {
                browser: '360se',
                vendor: 'youdao',
                version: '1.9'
            };
        };
        var w = cache.dom.body.style.width;
        cache.dom.body.style.width = '100%';
        cache.dom.bodyWidth = cache.dom.body.offsetWidth;
        cache.dom.body.style.width = w;
        cache.conf.ie = (function() {
            var undef, v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
            while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
            return v > 4 ? v: undef;
        } ());
        if (cache.conf.ie) {
            cache.conf.browser = 'ie';
            if (document.compatMode === 'BackCompat') {
                cache.conf.backCompat = true;
            }
            
            //解决ie中version和vendor颠倒的问题
            if ( /^[0-9.]+$/.test(cache.localConf.vendor) && !/^[0-9.]+$/.test(cache.localConf.version)) {
                var t = cache.localConf.vendor; 
                cache.localConf.vendor = cache.localConf.version; 
                cache.localConf.version = t; 
            }
            
        } else {
            cache.conf.browser = 'chrome';
        }
    };
});

    var m = $.ns('youdao.modules');

    m.info = function() ;

    $.conf.init.push('youdao.modules.info');

})(youdao);

