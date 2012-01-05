define(function(require, exports) {

    // 缓存数据
    var cache = {};                        

    // 缓存相关配置信息
    cache.conf = {    
        browser : 'chrome',
        version : '2.0',
        apiVersion : '2.1',
        vendor : 'youdao',
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

    // 缓存dom元素
    cache.dom = {};

    // 缓存全局functions
    cache.fn = {} ;

    return cache;
});
