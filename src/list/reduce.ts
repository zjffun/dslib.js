// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
export default function (callback /*, initialValue*/ ) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback +
            ' is not a function');
    }

    var node = this.front();
    var value;

    if (arguments.length >= 2) {
        value = arguments[1];
    } else {
        if (!node) {
            throw new TypeError('Reduce of empty List ' +
                'with no initial value');
        }
        value = node.getValue();
        node = node.getNextNode();
    }

    while (node) {
        value = callback(value, node.getValue(), node.getKey(), this);
        node = node.getNextNode();
    }

    return value;
}