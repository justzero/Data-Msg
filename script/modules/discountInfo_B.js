(function($){
    var m = $.ns('youdao.modules'), consts = $.require_module('youdao.consts'),
         cache = $.require_module('youdao.cache'),util = $.require_module('youdao.util');
	name = consts.commonName;
    m.discountInfo = function(){
            var showDiscountInfo = function() {
            		if( cache.conf.popupFlag == 1 ) return;
            		if( !util.isInArray($.conf.head[cache.data.code],'discount') && !util.isInArray($.conf[cache.data.code],'discount')){
            			return ;
            		}
            		var curMillis = new Date().getTime();//获取系统当前时间
            		if(cache.data.discountInfo.id==undefined) return;//如果取不到数据
                	if(cache.localConf.lastDiscountId==undefined) cache.localConf.lastDiscountId = 0;
                	if(cache.localConf.lastDiscountTime==undefined) cache.localConf.lastDiscountTime = 0;
                	if(cache.localConf.isDiscountOpen=='close') return;//如果该用户没有这两个新加变量或者关闭了优惠提醒
                	if(cache.localConf.isDiscountOpen=='open' && cache.data.discountInfo.id <= cache.localConf.lastDiscountId) return;//如果id已经出现过了
                	var interTime = curMillis - cache.localConf.lastDiscountTime;
                	if(interTime < 2 * 1000 * 3600) return;//如果没到两个小时
                	if(cache.data.discountInfo.deadline != -1 && curMillis > cache.data.discountInfo.deadline) return;//如果超过了deadline
                    var item = 'discount', 
                    dom = $.require_module('youdao.dom'),
                    discountDiv = cache.dom.body.append('div', { id: consts.commonName + 'discountInfo' },{ position: 'fixed', zIndex: (consts.basezIndex+100) });
                    elem = document.getElementById(consts.commonName + item);
                    cache.dom.discountDiv = discountDiv;
                    
                    if (elem.className === 'youdaoGWZS_noMore') {
                        return;
                    }
                    cache.localConf.lastDiscountId = cache.data.discountInfo.id;
                    cache.localConf.lastDiscountTime = curMillis;
                    cache.localConf.isDiscountOpen = 'open';
                    var sE = document.getElementById(consts.optionsID);
					if (sE && cache.localConf) sE.innerHTML = util.jsonToStr(cache.localConf, ';');
					 //console.log(cache.localConf);
                    /**
                     * 设置优惠信息弹出的位置
                     */
                    if (cache.conf.ie !== 6) discountDiv.style.position = 'fixed';
                    var elemP = dom.pageX(elem) , elemWidth = elem.offsetWidth , leftX, pageWidth = cache.dom.bodyWidth -10;                    
                    var attr = {
                        width: 160,
                        height: 'auto',
                        left: 0
                    };
                    attr.left = elemP + elemWidth/2 - attr.width/3 * 2 ;
                	leftX = elemP + elemWidth/2 - attr.left -12;
                	/**
                	 * 检查左边界
                	 */
                    if( attr.left < 10 ){
                    	attr.left = 2 ;
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
                    	attr.top = (cache.conf.ie === 6) ? cache.dom.top - attr.height - 2 : 'auto'; attr.bottom = 50;
                    }else { 
                    	attr.top = (cache.conf.ie === 6) ? cache.dom.top + 70 : 70; attr.bottom = 'auto'; 
                    }
                    for (var i in attr) {
                        if (attr[i] !== 'auto')
                            discountDiv.style[i] = attr[i] + 'px';
                        else discountDiv.style[i] = 'auto';
                    }
                    discountDiv.className = 'discountInfo';
                    var str = $.tm.popo({leftX: leftX, type: 1}, $.tm.discountInfo.tmpl);
                    discountDiv.innerHTML = $.tmpl( str ,{info: tipWord[item]?tipWord[item]:tipWord['default']});
                    $.tm.discountInfo.event(discountDiv);
                    //set popup flag
                    cache.conf.popupFlag = 1 ;
            };
            var tipWord = {
            	"discount":[cache.data.discountInfo.title,cache.data.discountInfo.url,cache.data.discountInfo.imgurl],
            	"default":['有道购物助手为您精选全网最超值优惠信息','http://gouwu.youdao.com/','']
            };
            var hideDiscountInfo = function(){
            	var elem = document.getElementById(consts.commonName + 'discountInfo') ;
        		elem.style.display = 'none' ;
            };
            showDiscountInfo();
            if (!cache.fn) {
            	cache.fn = {};
            }
    		cache.fn.hideDiscountInfo = hideDiscountInfo;
    };
            
    $.conf.action['111100'].push('youdao.modules.discountInfo');
    $.conf.action['110011'].push('youdao.modules.discountInfo');
    $.conf.action['110000'].push('youdao.modules.discountInfo');

})(youdao);
