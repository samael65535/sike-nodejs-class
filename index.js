/**
 * Created by samael on 15-6-11.
 */

module.exports = function (child, parent) {
    var fn = child.initialize || (function () {
        });
    for (var key in child) {
        if (key != "initialize") {
            fn.prototype[key] = child[key];
        }
    }
    fn.__super__ = Object;
    if (parent) {
        fn.prototype.constructor.prototype = parent.prototype;
        fn.__super__ = parent;
    }
    fn.prototype.constructor = fn;
    return fn
};

