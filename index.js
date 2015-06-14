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
        var current_class = fn;
        return function() {
            var methodName = arguments[0];
            var args = [].slice.call(arguments, 1);
            current_class = current_class.__super__;
            var result = current_class.prototype[methodName].apply(this, args);
            current_class = fn;
            return result;
        }
//        return fn.__super__.prototype[methodName].apply(this, args);
    }();

    if (parent) {
        var _super = parent.prototype;
        var prototype = fn.prototype;
        for (var name in child) {
            prototype[name] = child[name] instanceof Function &&
            _super[name] instanceof Function?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        console.log(ret);
                        return ret;
                    };
                })(name, child[name]) :
                child[name];
            }
    }
    return fn;
};

