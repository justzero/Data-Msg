(function($) {
    var m = $.ns('youdao.modules'),
    cache = $.require_module('youdao.cache');
    cache.nosyn.gouwuInit = true;
    m.gouwuInit = function(callback) {
        var util = $.require_module('youdao.util'),
        consts = $.require_module('youdao.consts'),
        features = $.require_module('youdao.consts'),
        elem = cache.dom.elem,
        headStr = '' ,
        str = '',
        head = document.getElementById(consts.commonName + 'head'),
        div = document.getElementById(consts.commonName + 'contentBar'),
        body = document.body;
        cache.nosyn.gouwuInit = true;
        for (var i in $.conf.head[cache.data.code])
            headStr += $.tm[$.conf.head[cache.data.code][i]] || '';
        for (var i in $.conf[cache.data.code])
            str += $.tm[$.conf[cache.data.code][i]] || '';
        if (cache.data.urlPriceList && cache.data.urlPriceList.length < cache.conf.showLen) cache.conf.showLen = cache.data.urlPriceList.length;
        var tmpData = cache.data.urlPriceList;
        if (tmpData && tmpData.length !== 0) {
            for (var i = 0; i < tmpData.length; i++)
            if (!tmpData[i].num) tmpData[i].num = 0;
        };
        var data = {
            data: cache.data,
            conf: cache.conf.position || 'down',
            taobao: cache.conf.taobao,
            name: consts.commonName,
            len: cache.conf.showLen,
            value: cache.conf.searchData,
            discountInfo: cache.discountInfo
        };
        var features = $.conf.features;
        //set features show flag
        
        /***
         * 获得要显示的feature的序号
         * get features to be shown no
         * 0:表示无新特征提示
         * i:表示要显示的新特征提示为：features[i-1]
         */
        var getFeatureNo = function(){
            var localFtCode = cache.localConf.featureCode ? cache.localConf.featureCode: '', 
                ftCode = $.conf.featuresCode,
                length = Math.min(localFtCode.length, ftCode.length),
                features = $.conf.features;
            for(var i = 0 ; i < length; i++){
                if( ftCode.charAt(i) !='0' && cache.conf.fMaxNum > parseInt(localFtCode.charAt(i)) ){
                    if( util.isInArray($.conf.head[cache.data.code],features[i]) || util.isInArray($.conf[cache.data.code],features[i]) ){
                        return (i+1) ;
                    }
                }
            }
            if( localFtCode.length < ftCode.length ){
                // to be done ----将localFtCode补全（即补零）lazy way
                for(;i<ftCode.length;i++){
                    if( ftCode.charAt(i)!='0' && (util.isInArray($.conf.head[cache.data.code],features[i]) || util.isInArray($.conf[cache.data.code],features[i])) ){
                        return (i+1) ;
                    }
                }
            }
            return 0 ;
        } ;
        cache.conf.flag = getFeatureNo();
        //cache.conf.flag = 0;
//        console.log('feature flag='+cache.conf.flag);
        
        /*对于新功能提醒的feature，需要先将其本身的事件隐藏*/
        if (cache.conf.flag) {
            $.tm.event.tmp = $.tm.event[features[cache.conf.flag - 1]];
            $.tm.event[features[cache.conf.flag - 1]] = function() {};
        }
        
        // head load
        if( !(/^\s*$/).test( headStr) ){
            head.innerHTML = $.tmpl(headStr, data);
        }
        for (var i in $.conf.head[cache.data.code]) {
            var code = $.conf.head[cache.data.code][i],
            fn = $.tm.event[code];
            if (fn && util.isFunction(fn)) {
                fn();
            }
        }
        
        // contentBar load
        if( !(/^\s*$/).test( str) ){
            div.innerHTML = $.tmpl(str, data);
        }
        for (var i in $.conf[cache.data.code]) {
            var code = $.conf[cache.data.code][i],
            fn = $.tm.event[code];
            if (fn && util.isFunction(fn)) {
                /*if (!cache.conf.flag || features[cache.conf.flag-1] !== code) */
                fn();
            }
        }

        elem.style.opacity = 1;
        elem.style.fiter = 'alpha(opacity=100)';
        cache.dom.contentWidth = div.offsetWidth;
        elem.style.overflow = 'hidden';
        document.getElementById(consts.commonName + 'close').style.display = 'block';
        json = {
            elem: cache.dom.elem.id,
            attr: ['height', 0, 50, 'px'],
            timer: 'fast',
            atp: 'Line',
            context: this,
            callback: function() {
                //div.style.overflow = 'visible';
                cache.dom.elem.style.overflow = 'visible';
                callback.success();
            }
        };
        $.addAnimate(json);
        if ((fn = $.tm.event.up[cache.data.code]) && util.isFunction(fn)) fn();
    };
})(youdao);

