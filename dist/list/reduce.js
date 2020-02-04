"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(callback, initialValue) {
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }
    var node = this.front();
    var accumulator;
    if (initialValue !== undefined) {
        accumulator = initialValue;
    }
    else {
        if (!node) {
            throw new TypeError("Reduce of empty List " + "with no initial value");
        }
        accumulator = node.value;
        node = node.nextNode;
    }
    if (!node) {
        return accumulator;
    }
    while (node !== this._rear) {
        accumulator = callback(accumulator, node.value, node.key, this);
        node = node.nextNode;
    }
    return accumulator;
}
exports.default = default_1;
/*refence
[Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Polyfill)
*/
