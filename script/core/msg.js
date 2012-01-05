define(function(require, exports) {
    var _ = require('underscore');
    var mods = [];
    var listens = { };
    
    /* -------------------- msg class ----------------------- */
    var Msg = function(name) {
        this.name = name;
        this.listenList = [];
        this.index = mods.length;
        this.self = this;
        mods.push(this.self);
    };

    Msg.prototype = {

        // send msg to other mod  
        send: function(msg, options) {
            if (!listens[msg] || listens[msg].length === 0) { return; }
            var ls = listens[msg];
            var i = 0, len = ls.length;
            for (i; i < len; i++) {
                ls[i].callback();
            }
        },

        // bind callback for msg
        listen: function(msg, callback) {

            // addon self listenList
            this.listenList.push({
                msg: msg,
                callback: callback
            });

            // addon common listen list
            if (!listens[msg]) { listens[msg] = []; }
            // bind callback on itself
            var func = _.bind(callback, this.self);
            listens[msg].push({
                mod: this.self,
                callback: func
            });

        },

        rmListen: function() {
        }
    };

    /* -------------------- open API ----------------------- */
    exports.reg = function(name) {
        return new Msg(name);
    };

});
