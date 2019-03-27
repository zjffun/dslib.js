"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listnode_1 = require("./listnode");
const from_1 = require("./list/from");
const reduce_1 = require("./list/reduce");
const sort_1 = require("./list/sort");
/**
 * Doubly linked list
 */
class List {
    /**
     * Initialize list with the given elements.
     * ```
     * new List(element0, element1[, ...[, elementN]])
     * ```
     * @param args element0, element1, ..., elementN
     */
    constructor(...args) {
        this._head = null;
        this._rear = null;
        if (args.length) {
            Object.assign(this, List.of(...args));
        }
        else {
            this._head = new listnode_1.default();
            this._rear = new listnode_1.default();
            this._head.insertAfter(this._rear);
        }
    }
    /**
     * Return Iterator object that contains the values for each node in the list.
     */
    [Symbol.iterator]() {
        let currentNode = this._head, rear = this._rear;
        return {
            next() {
                currentNode = currentNode.nextNode;
                return {
                    done: currentNode === rear,
                    value: currentNode && currentNode.value
                };
            }
        };
    }
    /**
     * The rear node of the list
     */
    get rear() {
        return this._rear;
    }
    /**
     * The head node of the list
     */
    get head() {
        return this._head;
    }
    /**
     * Create a new List instance from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapFn Map function to call on every element of the array.
     * @param thisArg Value to use as `this` when executing `mapFn`.
     */
    static from(arrayLike, mapFn, thisArg) {
        return from_1.default(arrayLike, mapFn, thisArg);
    }
    /**
     * Creates a new List instance from a variable number of arguments.
     * ```
     * List.of(element0, element1[, ...[, elementN]])
     * ```
     * @param args element0, element1, ..., elementN
     */
    static of(...args) {
        return List.from(args);
    }
    /**
     * Determines whether the passed value is an list.
     * @param val The value to be checked.
     */
    static isList(val) {
        return val instanceof List;
    }
    /**
     * Add one element to the end of the list.
     * @param value element's value
     * @param key (Optinal) element's key
     */
    push(value, key = null) {
        let node = new listnode_1.default(value, key);
        this._rear.insertBefore(node);
    }
    /**
     * Remove the last element from the list and return that element.
     */
    pop() {
        let node = null;
        if (this._rear.prevNode !== this._head) {
            node = this._rear.deleteBefore();
        }
        return node || new listnode_1.default();
    }
    /**
     * Remove the first element from the list and return that element.
     */
    shift() {
        let node = null;
        if (this._head.nextNode !== this._rear) {
            node = this._head.deleteAfter();
        }
        return node || new listnode_1.default();
    }
    /**
     * Add one element to the front of the List.
     * @param value element's value
     * @param key (Optinal) element's key
     */
    unshift(value, key = null) {
        let node = new listnode_1.default(value, key);
        this._head.insertAfter(node);
    }
    /**
     * Execute a reducer function (that you provide) on each member of the list resulting in a single output value.
     * @param callback reducer functionFunction to execute on each element in the list, taking four arguments:
     *   accumulator
     *     The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param initialValue Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce() on an empty array without an initial value is an error.
     */
    reduce(callback, initialValue) {
        return reduce_1.default.call(this, callback, initialValue);
    }
    /**
     * Execute a provided function once for each list element.
     * @param callback Function to execute on each element, taking three arguments:
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach(callback, thisArg) {
        let node = this.front();
        while (node.nextNode) {
            thisArg ? callback.call(thisArg, node.value, node.key, node) : callback(node.value, node.key, node);
            node = node.nextNode;
        }
    }
    /**
     * Calling a provided function on every element in the calling list.
     * @param callback Function to execute on each element, taking three arguments:
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param thisArg Value to use as this when executing callback.
     */
    map(callback, thisArg) {
        let node = this.front();
        while (node) {
            thisArg ? node.setValue(callback.call(thisArg, node.value, node.key, node)) : node.setValue(callback(node.value, node.key, node));
            node = node.nextNode;
        }
        return this;
    }
    /**
     * Sort the elements of an list.
     * @param compareFunction Specifies a function that defines the sort order.
     *  firstEl
     *    The first element for comparison.
     *  secondEl
     *    The second element for comparison.
     */
    sort(compareFunction) {
        sort_1.default(this, compareFunction);
        return this;
    }
    /**
     * Returns the number of elements in the list.
     * like [list::size - C++ Reference](http://www.cplusplus.com/reference/list/list/size/)
     */
    size() {
        let t = this.front(), size = 0;
        while (t.nextNode) {
            t = t.nextNode;
            size++;
        }
        return size;
    }
    /**
     * Returns a reference to the first element in the list.
     * like [list::front - C++ Reference](http://www.cplusplus.com/reference/list/list/front/)
     */
    front() {
        return this._head.nextNode;
    }
    /**
     * Returns a reference to the last element in the list.
     * [list::back - C++ Reference](http://www.cplusplus.com/reference/list/list/back/)
     */
    back() {
        return this._rear.prevNode;
    }
    /**
     * Returns the element at the specified position in this list.
     * like [List get(int) - (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/util/List.html#get(int))
     * @param index index of the element to return
     */
    get(index) {
        let node = this.front();
        for (let i = 0; node && i < index; i++) {
            node = node.nextNode;
        }
        return node;
    }
}
exports.default = List;
