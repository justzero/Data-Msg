/**
 * youdao.setting
 * 系统常量配置
 */
(function($) {

    var consts = {
        ajaxTimeout: 5,
        codeOfs: 88,
        baseUrl: "http://zhushou.youdao.com/",
        updateUrl: "http://zhushou.youdao.com/",
        logUrl: "http://zhushou.youdao.com/log",
        logType: "ARMANI_EXTENSION_ACTION",
        mmUrl: "http://www.360buy.com/product/140007.html",
        pageUrl: location.href,
        elemId: "youdaoGWZS",
        optionsID: "youdaoGWZS_options",
        serUrl: "productSense",
        discountUrl: "discountInfo",
        updateSer: "productSense",
        baseCss: "http://zhushou.youdao.com/css/",
        commonCssName: "extension_2_2_",
        //commonName: "gouwu_",
        commonName: "youdaoGWZS_",
        showTime: 0.2,
        baseUrl_test: "./server/",
        serUrl_test: "data1.js",
        baseCss_test: "./css/",
        commonCssName_test: "",
        basezIndex: 1000000000
    };

    $.extend('youdao.consts', consts);
})(youdao);

