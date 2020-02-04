/* dslib.js version 1.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.treenode = factory());
}(this, (function () { 'use strict';

  class Node {
      /**
       * Initialize node with the given value and key.
       * @param value
       * @param key
       */
      constructor(value = null, key = null) {
          this._key = null;
          this._value = null;
          this._key = key;
          this._value = value;
      }
      /**
       * Returns the key of the current node.
       */
      get key() {
          return this._key;
      }
      /**
       * Returns the value of the current node.
       */
      get value() {
          return this._value;
      }
      /**
       * Sets the key of the current node.
       * @param key Key will be set.
       */
      setKey(key) {
          this._key = key;
      }
      /**
       * Sets the value of the current node.
       * @param value Value will be set.
       */
      setValue(value) {
          this._value = value;
      }
  }

  class ListNode extends Node {
      constructor() {
          super(...arguments);
          this._prevNode = null;
          this._nextNode = null;
      }
      /**
       * The previous node.
       */
      get prevNode() {
          return this._prevNode;
      }
      /**
       * The next node.
       */
      get nextNode() {
          return this._nextNode;
      }
      /**
       * Delete current node and return deleted node.
       */
      deleteCurrent() {
          let node = this;
          if (node._prevNode) {
              node._prevNode._nextNode = node._nextNode;
          }
          if (this._nextNode) {
              node._nextNode._prevNode = node._prevNode;
          }
          node._prevNode = null;
          node._nextNode = null;
          return node;
      }
      /**
       * Delete next node and return deleted node.
       */
      deleteAfter() {
          let node = this._nextNode;
          if (node) {
              node.deleteCurrent();
          }
          return node;
      }
      /**
       * Delete previous node and return deleted node.
       */
      deleteBefore() {
          let node = this._prevNode;
          if (node) {
              node.deleteCurrent();
          }
          return node;
      }
      /**
       * Insert a note after current node.
       * @param node Node will inserted.
       */
      insertAfter(node) {
          node._prevNode = this;
          node._nextNode = this._nextNode;
          node._prevNode._nextNode = node;
          if (node._nextNode) {
              node._nextNode._prevNode = node;
          }
      }
      /**
       * Insert a note before current node.
       * @param node Node will inserted.
       */
      insertBefore(node) {
          node._prevNode = this._prevNode;
          node._nextNode = this;
          node._nextNode._prevNode = node;
          if (node._prevNode) {
              node._prevNode._nextNode = node;
          }
      }
  }

  // TODO: how to handle circular dependency?
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
      var L = new List();
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
  /* reference
  // [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  */

  function reduce (callback, initialValue) {
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
  /*refence
  [Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Polyfill)
  */

  function sort(list, compareFunction) {
      recQuickSort(list.front(), list.back());
      function recQuickSort(left, right) {
          var [cur, tleft, tright] = partition(left, right);
          if (tleft) {
              recQuickSort(tleft, cur.prevNode);
          }
          if (tright) {
              recQuickSort(cur.nextNode, tright);
          }
      }
      function partition(left, right) {
          var pivot = right, tleft = left, tright = right, temp;
          var node = left;
          while (node !== pivot) {
              temp = node.nextNode;
              if (compareFunction(node.value, pivot.value) > 0) {
                  node.deleteCurrent();
                  tright.insertAfter(node);
                  tright = node;
              }
              else {
                  tleft = node;
                  break;
              }
              tleft = temp;
              node = temp;
          }
          while (node !== pivot) {
              temp = node.nextNode;
              if (compareFunction(node.value, pivot.value) > 0) {
                  node.deleteCurrent();
                  tright.insertAfter(node);
                  tright = node;
              }
              node = temp;
          }
          return [
              pivot,
              tleft !== pivot ? tleft : null,
              tright !== pivot ? tright : null
          ];
      }
  }

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
              this._head = new ListNode();
              this._rear = new ListNode();
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
          return _from(arrayLike, mapFn, thisArg);
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
          let node = new ListNode(value, key);
          this._rear.insertBefore(node);
      }
      /**
       * Remove the last element from the list and return that element.
       */
      pop() {
          let node = null;
          if (this.back()) {
              node = this._rear.deleteBefore();
          }
          return node || new ListNode();
      }
      /**
       * Remove the first element from the list and return that element.
       */
      shift() {
          let node = null;
          if (this.front()) {
              node = this._head.deleteAfter();
          }
          return node || new ListNode();
      }
      /**
       * Add one element to the front of the List.
       * @param value element's value
       * @param key (Optinal) element's key
       */
      unshift(value, key = null) {
          let node = new ListNode(value, key);
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
          return reduce.call(this, callback, initialValue);
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
          if (!node) {
              return;
          }
          while (node !== this._rear) {
              thisArg
                  ? callback.call(thisArg, node.value, node.key, node)
                  : callback(node.value, node.key, node);
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
              thisArg
                  ? node.setValue(callback.call(thisArg, node.value, node.key, node))
                  : node.setValue(callback(node.value, node.key, node));
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
          sort(this, compareFunction);
          return this;
      }
      /**
       * Returns the number of elements in the list.
       * like [list::size - C++ Reference](http://www.cplusplus.com/reference/list/list/size/)
       */
      size() {
          let t = this.front(), size = 0;
          if (!t) {
              return size;
          }
          while (t !== this._rear) {
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
          return this._head.nextNode !== this._rear ? this._head.nextNode : null;
      }
      /**
       * Returns a reference to the last element in the list.
       * [list::back - C++ Reference](http://www.cplusplus.com/reference/list/list/back/)
       */
      back() {
          return this._rear.prevNode !== this._head ? this._rear.prevNode : null;
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
          return node !== this._rear ? node : null;
      }
  }

  class TreeNode extends Node {
      /**
       * Initialize treenode with the given value, key and parent node.
       * @param value The value of the treenode.
       * @param key The key of the treenode.
       * @param parent The parent node of the treenode.
       */
      constructor(value, key = null, parent = null) {
          super(value, key);
          this._parent = null;
          this._children = null;
          this._parent = parent;
          this._children = new List();
      }
      /**
       * The children node list.
       */
      get children() {
          return this._children;
      }
      /**
       * The parent node.
       */
      get parent() {
          return this._parent;
      }
      /**
       * Add a child node to current node.
       * @param value
       * @param key
       */
      addChild(value, key = null) {
          let node = null;
          if (value instanceof TreeNode) {
              value._parent = this;
              node = value;
          }
          else {
              node = new TreeNode(value, key, this);
          }
          this._children.push(node);
      }
      /**
       * Determines whether the current node is the leaf node.
       */
      isLeaf() {
          return !this._children.size();
      }
      /**
       * Determines whether the current node is the last node of the parent node.
       */
      isLastChild() {
          return this._parent && this._parent._children.back().value == this;
      }
      /**
       * Traverse the current treenode from bottom to top. (rTraverse means Reverse Traverse)
       * @param callback Function to execute on each element, taking three arguments:
       *   currentValue
       *     The current element's value being processed in the tree.
       *   currntKey(Optional)
       *     The current element's key being processed in the tree.
       *   currentNode(Optional)
       *     The current treenode being processed in the tree.
       *   currentListNode(Optional)
       *     The current listnode being processed in the children list.
       * @param thisArg Value to use as this when executing callback.
       */
      rTraverse(callback, thisArg) {
          let _traverse = (callback, thisArg, listnode) => {
              let treenode = listnode.value;
              if (treenode.children) {
                  treenode.children.forEach((v, k, n) => {
                      _traverse(callback, thisArg, n);
                  });
              }
              callback.call(thisArg, treenode.value, treenode.key, treenode, listnode);
          };
          _traverse(callback, thisArg, new ListNode(this));
      }
      /**
       * Traverse the current treenode from top to bottom.
       * @param callback Function to execute on each element, if callback return false stop traverse, taking three arguments:
       *   currentValue
       *     The current element's value being processed in the tree.
       *   currntKey(Optional)
       *     The current element's key being processed in the tree.
       *   currentNode(Optional)
       *     The current treenode being processed in the tree.
       *   currentListNode(Optional)
       *     The current listnode being processed in the children list.
       * @param thisArg Value to use as this when executing callback.
       */
      traverse(callback, thisArg) {
          let _traverse = (callback, thisArg, listnode) => {
              let treenode = listnode.value;
              if (callback.call(thisArg, treenode.value, treenode.key, treenode, listnode) !== false) {
                  treenode.children.forEach((v, k, n) => {
                      _traverse(callback, thisArg, n);
                  });
              }
          };
          _traverse(callback, thisArg, new ListNode(this));
      }
  }

  return TreeNode;

})));
