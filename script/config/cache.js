(function($){        
    var cache = {};                        
    cache.conf = {    
        browser : 'chrome',
        version : '2.0',
        apiVersion : '2.1',
        vendor : 'youdao',
        position: 'down',  //up & down
        flag: 0 ,// 0: no-show features; 1..n: show
        showLen: 3,
        searchData: '请输入想查找的商品',
        similarTypeWords: '',
        taobao: false,
        title: document.title,
        cateGory: 'wu',
        product: 'product',
        isDiscountOpen: 'open',
        lastDiscountId: 0,
        lastDiscountTime: 0,
        popupFlag: 0,
        logTime: 2, // hover log time(s)
        fMaxNum: 3  // feature show times
        };
    cache.dom = {
        body: document.body,
        elem: document.body
    };
    cache.animate = {};
    cache.nosyn = {};
    cache.fn = {} ;
    $.extend('youdao.cache', cache);
})(youdao);
    
