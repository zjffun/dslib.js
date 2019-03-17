import ListNode from "./listnode";
import from from "./list/from";
import reduce from "./list/reduce";

export default class List {
  private _length: number = 0;
  private _head: ListNode = null;
  [Symbol.iterator]() {
    let currentNode = this._head;
    return {
      next() {
        currentNode = currentNode.nextNode;
        return {
          done: !currentNode,
          value: currentNode && currentNode.value
        };
      }
    };
  }

  get length() {
    return this._length;
  }

  get rear() {
    let rear = this._head;
    while (rear.nextNode) {
      rear = rear.nextNode;
    }
    return rear;
  }

  get head() {
    return this._head;
  }

  constructor(...args) {
    if (args.length) {
      Object.assign(this, List.of(...args));
    } else {
      this._head = new ListNode();
    }
  }

  static from(...args): List {
    return from.apply(this, args);
  }

  static of(...args): List {
    return List.from(args);
  }

  static isList(node): boolean {
    return node instanceof List;
  }

  push(value, key = null): void {
    let node = new ListNode(value, key);
    this.rear.insertAfter(node);
    this._length++;
  }

  pop(): ListNode {
    let node = null;
    if (this._length > 0) {
      node = this.rear.deleteCurrent();
      this._length--;
    }
    return node || new ListNode();
  }

  shift(): ListNode {
    let node = null;
    if (this._length > 0) {
      node = this._head.deleteAfter();
      this._length--;
    }
    return node || new ListNode();
  }

  unshift(value, key = null): void {
    let node = new ListNode(value, key);
    this._head.insertAfter(node);
    this._length++;
  }

  reduce(callback, initialValue) {
    return reduce.call(this, callback, initialValue);
  }

  forEach(callback) {
    let node = this.front();
    while (node) {
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
    recQuickSort(this.front(), this.rear);
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
      var pivot = right,
        tleft = left,
        temp;
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
    recQuickSort(this.front(), this.rear);
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
      var pivot = right,
        tleft = left,
        tright = right,
        temp;
      var node = left;
      while (node !== pivot) {
        temp = node.nextNode;
        if (compareFunction(node.value, pivot.value) > 0) {
          node.deleteCurrent();
          tright.insertAfter(node);
          tright = node;
        } else {
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

  // Like c++ std::list::front
  front(): ListNode {
    return this._head.nextNode;
  }

  // list java java.util List get()
  get(index: number): ListNode {
    let node = this.front();
    for (let i = 0; node && i < index; i++) {
      node = node.nextNode;
    }
    return node;
  }
}
