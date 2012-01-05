(function($) {

	var m = $.ns('youdao.modules'),
        cache = $.require_module('youdao.cache'),
        consts = $.require_module('youdao.consts'),
        util = $.require_module('youdao.util');

	m.gouwuLog = function() {
        /* -------------------- DEBUG MODE ----------------------- */
		if (cache.conf.test && ! cache.localConf.log) {
            return;
        }

		var img = new Image();

        /* -------------------- set log ----------------------- */
        // action -- 操作类型
        // logType -- log的类型
        // （默认：ARMANI_EXTENSION_ACTION, ARMANI_EXTENSION_POPUP）
		var sendLog = function(action, elem, logType) {
			var json = {
				action: action,
				browser: cache.localConf.browser || cache.conf.browser,
				cateGory: cache.conf.cateGory,
				discountId: cache.localConf.lastDiscountId,
				type: logType || consts.logType,
				fromSite: document.domain,
				location: cache.conf.position,
				position: elem.getAttribute('ps') || 'no-position',
				product: cache.conf.product,
				toSite: elem.getAttribute('href') || 'none',
				vendor: cache.conf.vendor,
				version: cache.conf.version
			};

			if (elem.tagName === 'INPUT' && 
                elem.getAttribute('type') === 'submit' && json.toSite === "none") {
				if (json.toSite === 'none') {
                    return true;
                } else {
                    elem.removeAttribute('href');
                }
			}

			if (elem.className === 'youdaoGWZS_non' || elem.className === 'youdaoGWZS_noMore') {
				return true;
			}

			var params, parameters = elem.getAttribute('params') || 'no-parameters';
			if (parameters === 'no-parameters') {
				params = util.comboParams(json);
			} else {
				params = util.comboParams(json) + '&' + parameters;
			}

			img.src = consts.logUrl + '?' + params;
			return true;
		};

        /* -------------------- 递归冒泡元素 ----------------------- */
        // type --- elem's log attr type
        // elem --- event.target
        // flag --- click / mouseover / mouseout
		var startLog = function(type, elem, flag) {
			if (!elem.tagName || ! elem) {
                return;
            }
			var action = elem.getAttribute(type);
			if (action) {
                switch (flag) {
                    case 'click': 
                        sendLog(action, elem);
                        break;
                    case 'mouseover': 
                        elem.timerId = setTimeout(function(){
                            sendLog(action, elem);
                        }, cache.conf.logTime * 1000);
                        break;
                    case 'mouseout': 
                        if (elem.timerId) {
                            clearTimeout(elem.timerId);
                        }
                        break;
                }
			}
			startLog(type, elem.parentNode, flag);
		};

        /* -------------------- bind event for window ----------------------- */
		$.event.addEvent(window, 'click', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			startLog('clkAction', target, 'click');
		});
		$.event.addEvent(cache.dom.elem, 'mouseover', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			startLog('hoverAction', target, 'mouseover');
		});
		$.event.addEvent(cache.dom.elem, 'mouseout', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			startLog('hoverAction', target, 'mouseout');
		});

        /* -------------------- open API ----------------------- */
		if (!cache.fn) {
            cache.fn = {};
        }
		cache.fn.sendLog = sendLog;
	};

})(youdao);

