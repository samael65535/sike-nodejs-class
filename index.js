/**
 * Created by samael on 15-6-11.
 */

module.exports = function (child, parent) {
    var fn = child.initialize || (function () {
        });
    fn.__super__ = Object;
    if (parent) {
        fn.__super__ = parent;
        //fn.prototype.constructor.prototype = parent.prototype;
    }
    fn.prototype.constructor = fn;

    for (var key in child) {
        if (key != "initialize") {
            fn.prototype[key] = child[key];
        }
    }

    fn.prototype.super = function() {
        var methodName = arguments[0];
        var args = [].slice.call(arguments, 1);
        return fn.__super__.prototype[methodName].apply(this, args);
    };
    return fn
};

