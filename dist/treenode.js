/* dslib.js version 1.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.treenode = factory());
}(this, function () { 'use strict';

  class Node {
      constructor(value = null, key = null) {
          this._key = null;
          this._value = null;
          this._key = key;
          this._value = value;
      }
      get key() {
          return this._key;
      }
      get value() {
          return this._value;
      }
      setKey(key) {
          this._key = key;
      }
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
      get prevNode() {
          return this._prevNode;
      }
      get nextNode() {
          return this._nextNode;
      }
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
      deleteAfter() {
          let node = this._nextNode;
          if (node) {
              node.deleteCurrent();
          }
          return node;
      }
      deleteBefore() {
          let node = this._prevNode;
          if (node) {
              node.deleteCurrent();
          }
          return node;
      }
      insertAfter(node) {
          node._prevNode = this;
          node._nextNode = this._nextNode;
          node._prevNode._nextNode = node;
          if (node._nextNode) {
              node._nextNode._prevNode = node;
          }
      }
      insertBefore(node) {
          node._prevNode = this._prevNode;
          node._nextNode = this;
          node._nextNode._prevNode = node;
          if (node._prevNode) {
              node._prevNode._nextNode = node;
          }
      }
  }

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
      var L = new this();
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
      // 20. Return A.
      return L;
  }
  /* reference
  // [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  */

  function reduce (callback /*, initialValue*/) {
      if (typeof callback !== 'function') {
          throw new TypeError(callback +
              ' is not a function');
      }
      var node = this.front();
      var value;
      if (arguments.length >= 2) {
          value = arguments[1];
      }
      else {
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

  class List {
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
      get rear() {
          return this._rear;
      }
      get head() {
          return this._head;
      }
      static from(...args) {
          return from.apply(this, args);
      }
      static of(...args) {
          return List.from(args);
      }
      static isList(node) {
          return node instanceof List;
      }
      push(value, key = null) {
          let node = new ListNode(value, key);
          this._rear.insertBefore(node);
      }
      pop() {
          let node = null;
          if (this._rear.prevNode !== this._head) {
              node = this._rear.deleteBefore();
          }
          return node || new ListNode();
      }
      shift() {
          let node = null;
          if (this._head.nextNode !== this._rear) {
              node = this._head.deleteAfter();
          }
          return node || new ListNode();
      }
      unshift(value, key = null) {
          let node = new ListNode(value, key);
          this._head.insertAfter(node);
      }
      reduce(callback, initialValue) {
          return reduce.call(this, callback, initialValue);
      }
      forEach(callback) {
          let node = this.front();
          while (node.nextNode) {
              callback(node.value, node);
              node = node.nextNode;
          }
      }
      map(callback) {
          let node = this.front();
          while (node) {
              node.setValue(callback(node.value, node));
              node = node.nextNode;
          }
          return this;
      }
      sort(compareFunction) {
          recQuickSort(this.front(), this.back());
          return this;
          function recQuickSort(left, right) {
              var cur = partition(left, right);
              if (cur.prevNode && left !== cur && left !== cur.prevNode) {
                  recQuickSort(left, cur.prevNode);
              }
              if (cur.nextNode && right !== cur && right !== cur.nextNode) {
                  recQuickSort(cur.nextNode, right);
              }
          }
          function partition(left, right) {
              var pivot = right, tleft = left, temp;
              var node = left;
              while (node !== pivot) {
                  if (compareFunction(node.value, pivot.value) < 0) {
                      temp = node.value;
                      node.setValue(tleft.value);
                      tleft.setValue(temp);
                      tleft = tleft.nextNode;
                  }
                  node = node.nextNode;
              }
              temp = tleft.value;
              tleft.setValue(pivot.value);
              pivot.setValue(temp);
              pivot = tleft;
              return pivot;
          }
      }
      sortNode(compareFunction) {
          recQuickSort(this.front(), this.back());
          return this;
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
      // like C++ std::list::size 
      size() {
          let t = this.front(), size = 0;
          while (t.nextNode) {
              t = t.nextNode;
              size++;
          }
          return size;
      }
      // Like C++ std::list::front
      front() {
          return this._head.nextNode;
      }
      // like C++ std::list::back
      back() {
          return this._rear.prevNode;
      }
      // list java java.util List get()
      get(index) {
          let node = this.front();
          for (let i = 0; node && i < index; i++) {
              node = node.nextNode;
          }
          return node;
      }
  }

  class TreeNode extends Node {
      constructor(value, key = null, parent = null) {
          super(value, key);
          this._parent = null;
          this._children = null;
          this._parent = parent;
          this._children = new List();
      }
      get children() {
          return this._children;
      }
      get parent() {
          return this._parent;
      }
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
      isLeaf() {
          return !this._children.size();
      }
      isLastChild() {
          return this._parent._children.rear.value == this;
      }
      // reverseTraverse
      rTraverse(f, thisArg) {
          var children = this._children, child = children.front();
          while (child) {
              child.value.rTraverse(f, thisArg);
              child = child.nextNode;
          }
          f.call(thisArg, this);
      }
      traverse(f, thisArg) {
          let _traverse = (f, thisArg, rowNode) => {
              let value = rowNode.getValue();
              if (f.call(thisArg, value, rowNode) !== false) {
                  var children = value.children, child = children.front();
                  while (child) {
                      _traverse(f, thisArg, child);
                      child = child.getNextNode();
                  }
              }
          };
          _traverse(f, thisArg, new ListNode(this));
      }
  }

  return TreeNode;

}));
/* follow me on Twitter! @rich_harris */
