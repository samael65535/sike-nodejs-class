/**
 * Created by samael on 15-6-11.
 */

module.exports = function (obj) {
    var fn = obj.initialize || (function () {
        });
    for (var key in obj) {
        if (key != "initialize") {
            fn.prototype[key] = obj[key];
        }

    }
    return fn;
};



