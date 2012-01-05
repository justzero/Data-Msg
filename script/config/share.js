/**
 * youdao.share
 */
(function($) {
	var defaultUrl = 'http://zhushou.youdao.com/';
	var defaultTitle = '有道购物助手，自动比价，让网购不再坑爹';
	var defaultContent = '我刚试用了@有道购物助手，能自动在商品页面显示卓越、当当、京东等商城报价，能省钱，挺好的';
	var defaultAppKey = "有道购物助手" ;
	
	var share = {
		shareTo: function(obj , type ,title,content,url,imgUrl){
			switch( type ) {
	         case"netease":{
	        	 share.shareToNetease(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent);
	        	 break;
	         }
	         case"qq":{
	        	 share.shareToQQ(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent);
	        	 break;
	         }
	         case"sina":{
	        	 share.shareToSina(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent,"",imgUrl);
	        	 break;
	         }
	         case"renren":{
	        	 share.shareToRenren(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent);
	        	 break;
	         }
	         case"kaixin001":{
	        	 share.shareToKaixin001(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent);
	        	 break;
	         }
	         case"qqzone":{
	        	 share.shareToQQZone(url?url:defaultUrl,title?title:defaultTitle,content?content:defaultContent);
	        	 break;
	         }
	         default:return false
	    }
	    return false;
	},
	shareToSina: function(a ,e ,c ,b ){
		var d="http://service.weibo.com/share/share.php";
	    d+="?url="+encodeURIComponent(a)+"&title="+encodeURIComponent(c);	//+"&appkey="+encodeURIComponent(defaultAppKey)
	        if (b.length>0) {
	            d+="&pic="+b
	        }else{
	        	d+="&pic=" ;
	        }
	        share.openShareWin(d,600,520);
		
	},
	shareToRenren: function(a ,d ,b){
		var c="http://www.connect.renren.com/share/sharer";
	    c+="?url="+encodeURIComponent(a)+"&title="+encodeURIComponent(d)+"&description="+encodeURIComponent(b);
	    share.openShareWin(c,570,430);
	},
	shareToKaixin001: function(a ,d ,b){
		 var c="http://www.kaixin001.com/repaste/share.php";
		 c+="?rurl="+encodeURIComponent(a)+"&rtitle="+encodeURIComponent(d)+"&rcontent="+encodeURIComponent(b);
		 share.openShareWin(c,550,343);
	},
	shareToNetease: function(a ,d ,b){
		var c="http://t.163.com/article/user/checkLogin.do";
	    c+="?link="+encodeURIComponent(a)+"&info="+encodeURIComponent(b)+' '+encodeURIComponent(a)+"&source="+encodeURIComponent(d)+"&"+new Date().getTime();
	    share.openShareWin(c,550,310);
	},
	shareToQQ: function(a ,d ,b){
		var c = "http://v.t.qq.com/share/share.php";
	    c+="?url="+encodeURIComponent(a)+"&title="+encodeURIComponent(b.replace(/@有道购物助手/g,"@youdaogouwu"));	//"&appkey="+encodeURIComponent(d)+
	    share.openShareWin(c,550,310);
	},
	shareToQQZone: function(a ,d ,b){
		var c = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
	    c+="?url="+encodeURIComponent(a)+"&title="+encodeURIComponent(d)+"&summary="+encodeURIComponent(b);		//+"&appkey="+encodeURIComponent(d)
	    share.openShareWin(c,550,310);
	},
	openShareWin: function(b ,c ,a){
		 var d= [ "resizable=yes",
                  "width="+ c,
                  "height="+ a,
                  "location=no",
                  "menubar=no",
                  "status=no",
                  "titlebar=no",
                  "toolbar=no",
                  "left="+(window.screen.availWidth-c)/2,
                  "top="+(window.screen.availHeight-a)/2
           ];
		 window.open(b,"",d.join(","));
	}
	
	};

	$.extend('youdao.share', share);
	
})(youdao);