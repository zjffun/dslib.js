import ListNode from "../listnode";

export default function (callback /*, initialValue*/ ) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback +
            ' is not a function');
    }

    var node:ListNode = this.front();
    var value;

    if (arguments.length >= 2) {
        value = arguments[1];
    } else {
        if (!node) {
            throw new TypeError('Reduce of empty List ' +
                'with no initial value');
        }
        value = node.value;
        node = node.nextNode;
    }

    while (node) {
        value = callback(value, node.value, node.key, this);
        node = node.nextNode;
    }

    return value;
}

/*refence
[Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Polyfill)
*/