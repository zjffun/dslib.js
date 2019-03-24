import ListNode from "./listnode";
import from from "./list/from";
import reduce from "./list/reduce";

export default class List {
  private _head: ListNode = null;
  private _rear: ListNode = null;

  constructor(...args) {
    if (args.length) {
      Object.assign(this, List.of(...args));
    } else {
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
    this._rear.insertBefore(node);
  }

  pop(): ListNode {
    let node = null;
    if (this._rear.prevNode !== this._head) {
      node = this._rear.deleteBefore();
    }
    return node || new ListNode();
  }

  shift(): ListNode {
    let node = null;
    if (this._head.nextNode !== this._rear) {
      node = this._head.deleteAfter();
    }
    return node || new ListNode();
  }

  unshift(value, key = null): void {
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

  // like C++ std::list::size 
  size() : number {
    let t = this.front(), size = 0;
    while (t.nextNode) {
      t = t.nextNode;
      size++;
    }
    return size;
  }

  // Like C++ std::list::front
  front(): ListNode {
    return this._head.nextNode;
  }

  // like C++ std::list::back
  back(): ListNode {
    return this._rear.prevNode;
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
