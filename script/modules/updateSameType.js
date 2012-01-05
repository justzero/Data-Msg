(function($) {
	var m = $.ns('youdao.modules'),
	cache = $.require_module('youdao.cache'),
	consts = $.require_module('youdao.consts');
	cache.nosyn.updateSameType = true;
	m.updateSameType = function(callback) {

		if (cache.data.code == '111100') {
			$.tm.sameTypeTip('block');
			$.tm.similarTypeTip('block');
		}
		if(cache.data.code != '110000'){
			$.tm.feedbackMain('block');
		}
		

		$.event.addEvent(window, 'resize', function() {
			if (cache.data.code == '111100') {
				$.tm.sameTypeTip('block');
				$.tm.similarTypeTip('block');
			}
			if(cache.data.code != '110000'){
				$.tm.feedbackMain('block');
			}
		});
	};
	if (!cache.localConf || ! cache.localConf.update || cache.localConf.update !== 'false') {
		$.conf.action['111100'].push('youdao.modules.updateSameType');
		$.conf.action['110011'].push('youdao.modules.updateSameType');
		$.conf.action['110000'].push('youdao.modules.updateSameType');
	}
})(youdao);

