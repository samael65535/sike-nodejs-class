/**
 * Created by samael on 15-6-11.
 */

module.exports = function (obj) {
    var fn =  obj.initialize || (function(){});
    return fn;
};



