/**
 * youdao.util
 */
(function($) {

	var toStr = Object.prototype.toString;

	var util = {
		mode: document.compatMode,
		isString: function(str) {
			return toStr.call(str) === "[object String]";
		},
		isFunction: function(fn) {
			return toStr.call(fn) === "[object Function]";
		},
		isArray: function(arr) {
			return toStr.call(arr) === "[object Array]";
		},
		isInArray:function(arr,ele){
			if( !this.isArray(arr)){
				return false ;
			}
			for(var i=0;i<arr.length;i++){
				if(arr[i] == ele){
					return true ;
				}
			}
			return false ;
		},
		isEmptyObject: function(obj) {
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) return false;
			}
			return true;
		},
		getNumberLength:function(num){
			if( isNaN(num) ){
				return 0;
			}
			num = num<0?-num:num ;
			return Math.floor(Math.log(num)/Math.log(10))+1 ;
		},
		trim: function(text) {
			return (text || "").replace(/^\s+|\s+$/g, "");
		},
		jsonToStr: function(oParam, x) {
			var pa = [];
			if (!x) var x = '&';
			for (var k in oParam) {
				if (!oParam.hasOwnProperty(k)) continue;
				pa.push(k + '=' + oParam[k]);
			}
			return pa.join(x);
		},
		comboParams: function(oParam) {
			var pa = [];
			for (var k in oParam) {
				if (!oParam.hasOwnProperty(k)) continue;
				pa.push(k + '=' + encodeURIComponent(oParam[k]));
			}
			pa.push('t=' + ( + new Date));
			return pa.join('&');
		},
		getModName: function(modNS) {
			if (util.isString(modNS)) {
				var name_list = modNS.split('.');
				return name_list[name_list.length - 1];
			}
		},
		urlToJson: function(url, x) {
			var obj = {},
			options = url;
			if (!x) x = '&';
			options = options.replace(/^[?]{1}|[#]{1}$/g, '').split(x);
			for (var i = 0, len = options.length; i < len; i++) {
				var e = options[i].split('=');
				if (e[0].length === 0) continue;
				obj[e[0]] = e.length === 1 ? '': e[1];
			}
			return obj;
		},
		/***
		 * set the feature code .
		 * St.  setFtCode('000100',0,true)  return '100100'
		 * 		setFtCode('000100',2,true)  return '001100'
		 * 		setFtCode('100100',0,false)  return '000100'
         * 		action {true : write, false : add }
		 */
		setFtCode: function( ftCode , num , flag , action){
			if( num < 0 ){
				return ftCode ;
			}

            var arrA = [],
                arrB = ftCode.split(''),
                len = Math.max(arrB.length, num);
            for (var i = 0; i < len; i++) {
                arrA.push(arrB[i] ? arrB[i]: 0);
            }

            arrA[num-1] = action ? flag : parseInt(arrA[num-1]) + flag;

            return arrA.join('');
		}
	};

	$.extend('youdao.util', util);

})(youdao);

