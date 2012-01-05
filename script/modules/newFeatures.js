(function($){
    // comman require
    var m = $.ns('youdao.modules'), 
        consts = $.require_module('youdao.consts'),
        cache = $.require_module('youdao.cache'),
        util = $.require_module('youdao.util');

    m.newFeatures = function(){
        if (cache.conf.flag && $.conf.features.length !== 0 ) {
            var showFeatures = function(num) {

                // 已经存在弹窗
                if( cache.conf.popupFlag === 1 ) {
                    return;
                }

            var item = $.conf.features[num], 
                dom = $.require_module('youdao.dom'), 
                fDiv = cache.dom.body.append('div',
                    { id: consts.commonName + 'features', className: 'youdaoGWZSfixed'},
                    {  zIndex: (consts.basezIndex+100) });
                elem = document.getElementById(consts.commonName + item);
                cache.dom.fDiv = fDiv;
                fDiv.flag = cache.conf.flag;

                //当同款数目为0时，不触发新功能提示；同时将同款服饰按钮的原有事件恢复。
                if( item === 'sameType' && 
                    (!cache.data.sameType ||
                    !cache.data.sameType.sameTypeNum ||
                    cache.data.sameType.sameTypeNum <= 0 )){
                    cancelFeatures() ;
                    return ;
                }

                /**
                 * '110000'情况下，默认$.conf.'110000'下特征是隐藏的。
                 * 所以对其新功能提醒需要关闭
                 */
                if( cache.data.code == '110000' && util.isInArray($.conf[cache.data.code],item)){
                    cancelFeatures() ;
                    return ;
                }
                /**
                 * 分享新功能提醒，只在有比价信息和淘宝同款状态的时候展示
                 */
                if( item == 'share' && cache.data.code == '110000' ){
                    cancelFeatures() ;
                    return ;
                }

                if (elem.className === 'youdaoGWZS_noMore') {
                    cancelFeatures() ;
                    return;
                }
                /**
                 * 设置新功能提示的位置
                 */
                //  if (cache.conf.ie !== 6) fDiv.style.position = 'fixed';

                var elemP = dom.pageX(elem) , elemWidth = elem.offsetWidth , leftX, pageWidth = cache.dom.bodyWidth -10;                    
                var attr = {
                    width: 282,
                    height: 'auto',
                    left: 0
                };
                attr.left = elemP + elemWidth/2 - attr.width/3 ;
                leftX = elemP + elemWidth/2 - attr.left -12;
                if( item == 'sameType' || item == 'similarType' ){
                    leftX -= 24 ;
                }
                /**
                 * 检查左边界
                 */
                if( attr.left < 10 ){
                    attr.left = 10 ;
                    leftX = elemP + elemWidth/2 - attr.left - 12 ;
                }
                /**
                 * 检查右边界
                 */
                if(elemP + attr.width > pageWidth ){
                    attr.left = pageWidth - attr.width ;
                    leftX = elemP+elemWidth/2 - attr.left -12 ;
                }

                if (!cache.conf.position || cache.conf.position === 'down') {
                    attr.top = 'auto'; 
                    attr.bottom = 50;
                } else { 
                    attr.top = (cache.conf.ie === 6) ? 
                        cache.dom.top + 70 : 70; 
                    attr.bottom = 'auto'; 
                }
                var i;
                for (i in attr) {
                    if (attr[i] !== 'auto') {
                        fDiv.style[i] = attr[i] + 'px';
                    } else {
                        fDiv.style[i] = 'auto';
                    }
                }
                fDiv.className = 'youdaoGWZS_featureBox';
                var str = $.tm.popo({leftX: leftX, type: 1}, $.tm.features.tmple);
                var popoHtml = {
                    info: tipWord[item] ? tipWord[item]: tipWord['default']
                };

                fDiv.innerHTML = $.tmpl( str ,popoHtml);

                    // set elem position style for fixed ie6, backCompat mod
                    if (cache.conf.backCompat || cache.conf.ie === 6) {
                        dom.addClass(fDiv, 'youdaoGWZSfixed'); 
                        fDiv.style.position = 'absolute';
                        if (cache && cache.dom) {
                            fDiv.style.top = 'auto';
                            fDiv.style.bottom = (cache.dom.bottom ? 
                                cache.dom.bottom + 60 : 60) + 'px';
                        }
                    }

                $.tm.features.event(fDiv ,popoHtml.info[5]);
                //set popup flag
                cache.conf.popupFlag = 1 ;
            };
            var cancelFeatures = function(){
                var code = $.conf.features[cache.conf.flag - 1];
                if( $.tm.event.tmp ){
                    $.tm.event[code] = $.tm.event.tmp;
                    $.tm.event.tmp();
                }
            } ;
            var tipWord = {
                "sameType":[
                    '有道购物助手为您在淘宝找到:',
                    (cache.data.sameType ?
                     (cache.data.sameType.sameTypeNum?  cache.data.sameType.sameTypeNum:0) : 0) +
                     '件 同款服饰',
                    '同款服饰',
                    '浏览淘宝服饰页面时自动为您查找淘宝同款。',
                    'http://zhushou.youdao.com/features?keyfrom=help#gn4',
                    'NEWFEATURE_TAOBAO'

                ],

                "discount":[
                    '有道购物助手为您精选全网',
                    '各大商城促销优惠',
                    '优惠精选',
                    '全网优惠精选，点击“惠”图标快速查看',
                    'http://zhushou.youdao.com/features?keyfrom=help#gn5',
                    'NEWFEATURE_DISCOUNT'
                ],

                "share":[
                    '使用有道购物助手对比价格，还可以',
                    '向好友分享低价商品',
                    '分享',
                    '使用有道购物助手向好友分享全网低价商品。',
                    'http://zhushou.youdao.com/features?keyfrom=help#gn6',
                    'NEWFEATURE_SHARE'
                ],

                "default":[
                    '有道购物助手为您提供如下功能:',
                    'XXXX',
                    'XXXX',
                    '有道购物助手会自动为您XXXX。',
                    'http://zhushou.youdao.com/features?keyfrom=help',
                    'DEFAULT'
                ]
            };

            showFeatures(cache.conf.flag -1);
            if (!cache.fn) {
                cache.fn = {};
            }
            cache.fn.cancelFeatures = cancelFeatures;
        }
    };
    $.conf.action['111100'].push('youdao.modules.newFeatures');
    $.conf.action['110011'].push('youdao.modules.newFeatures');
    $.conf.action['110000'].push('youdao.modules.newFeatures');
})(youdao);
