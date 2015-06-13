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
    if (parent) {
        fn.prototype.constructor.prototype = parent.prototype;
    }
    console.log(fn.prototype.constructor === parent.constructor);
    fn.prototype.constructor = fn;
    return fn
};

