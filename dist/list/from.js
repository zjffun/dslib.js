"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("../list");
function _from(arrayLike, mapFn, thisArg) {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
        return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) {
            return 0;
        }
        if (number === 0 || !isFinite(number)) {
            return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    // 2. Let items be ToObject(arrayLike).
    var items = Object(arrayLike);
    // 3. ReturnIfAbrupt(items).
    if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    // 4. If mapfn is undefined, then let mapping be false.
    if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
            throw new TypeError("List.from: when provided, the second argument must be a function");
        }
    }
    // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len = toLength(items.length);
    // 13. Let A be List.
    var L = new list_1.default();
    // 16. Let k be 0.
    var k = 0;
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue;
    while (k < len) {
        kValue = items[k];
        if (mapFn) {
            L.push(typeof thisArg === "undefined" ? mapFn(kValue, k) : mapFn.call(thisArg, kValue, k));
        }
        else {
            L.push(kValue);
        }
        k += 1;
    }
    // 20. Return A.
    return L;
}
exports.default = _from;
/* reference
// [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
*/ 
