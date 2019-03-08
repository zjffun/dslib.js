'use strict';

class Node {
    constructor(key, value) {
        this.key = null;
        this.value = null;
        this.key = key;
        this.value = value;
    }
    getKey() {
        return this.key;
    }
    getVaule() {
        return this.value;
    }
    clone() {
        return new Node(this.key, this.value);
    }
}
//# sourceMappingURL=node.js.map

class ListNode extends Node {
    constructor() {
        super(...arguments);
        this.prevNode = null;
        this.nextNode = null;
    }
    getPrevNode() {
        return this.prevNode;
    }
    getNextNode() {
        return this.nextNode;
    }
    deleteCurrent() {
        let node = this;
        if (node.prevNode) {
            node.prevNode.nextNode = node.nextNode;
        }
        if (this.nextNode) {
            node.nextNode.prevNode = node.prevNode;
        }
        node.prevNode = null;
        node.nextNode = null;
        return node;
    }
    deleteAfter() {
        let node = this.nextNode;
        if (node) {
            node.deleteCurrent();
        }
        return node;
    }
    insertAfter(node) {
        node.prevNode = this;
        node.nextNode = this.nextNode;
        node.prevNode.nextNode = node;
        if (node.nextNode) {
            node.nextNode.prevNode = node;
        }
    }
    insertBefore(node) {
        node.prevNode = this.prevNode;
        node.nextNode = this;
        node.nextNode.prevNode = node;
        if (node.nextNode) {
            node.prevNode.nextNode = node;
        }
    }
}
//# sourceMappingURL=listnode.js.map

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
// The length property of the from method is 1.
function from(arrayLike /*, mapFn, thisArg */) {
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
    // 1. Let C be the this value.
    var C = this;
    // 2. Let items be ToObject(arrayLike).
    var items = Object(arrayLike);
    // 3. ReturnIfAbrupt(items).
    if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    // 4. If mapfn is undefined, then let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
            throw new TypeError("List.from: when provided, the second argument must be a function");
        }
        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
            T = arguments[2];
        }
    }
    // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len = toLength(items.length);
    // 13. Let A be List.
    var L = new C();
    // 16. Let k be 0.
    var k = 0;
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue;
    while (k < len) {
        kValue = items[k];
        if (mapFn) {
            L.push(typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k));
        }
        else {
            L.push(kValue);
        }
        k += 1;
    }
    // 18. Let putStatus be Put(A, "length", len, true).
    L.length = len;
    // 20. Return A.
    return L;
}
//# sourceMappingURL=from.js.map

class List {
    constructor(...args) {
        this.length = 0;
        this.rear = null;
        this.head = null;
        if (args.length) {
            Object.assign(this, List.of(...args));
        }
        else {
            this.head = new ListNode(null, null);
            this.rear = this.head;
        }
    }
    forEach(f, thisArg) {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator]() {
        let currentNode = this.head;
        return {
            next() {
                currentNode = currentNode.getNextNode();
                return {
                    done: !currentNode,
                    value: currentNode && currentNode.getVaule()
                };
            }
        };
    }
    static from(...args) {
        return from.apply(this, args);
    }
    static of(...args) {
        return List.from(args);
    }
    static isList(value) {
        return value instanceof List;
    }
    push(value) {
        let node = new ListNode(null, value);
        this.rear.insertAfter(node);
        this.rear = node;
        this.length++;
    }
    pop() {
        let node = null;
        if (this.length > 0) {
            this.rear = this.rear.getPrevNode();
            node = this.rear.deleteAfter();
            this.length--;
        }
        return node ? node.getVaule() : null;
    }
    shift() {
        let node = null;
        if (this.length > 0) {
            node = this.head.deleteAfter();
            this.length--;
        }
        return node ? node.getVaule() : null;
    }
    unshift(value) {
        let node = new ListNode(null, value);
        this.head.insertAfter(node);
        this.length++;
    }
}

module.exports = List;
//# sourceMappingURL=list.js.map
