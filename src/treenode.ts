import Node from "./node";
import List from "./list";
import ListNode from "./listnode";

export default class TreeNode extends Node {
  private _parent: TreeNode = null;
  private _children: List = null;

  constructor(value, key = null, parent: TreeNode = null) {
    super(value, key);
    this._parent = parent;
    this._children = new List();
  }

  get children(): List {
    return this._children;
  }

  get parent(): TreeNode {
    return this._parent;
  }

  addChild(value, key = null): void {
    let node = null;
    if (value instanceof TreeNode) {
      value._parent = this;
      node = value;
    } else {
      node = new TreeNode(value, key, this);
    }
    this._children.push(node);
  }

  isLeaf(): boolean {
    return !this._children.size();
  }

  isLastChild(): boolean {
    return this._parent._children.rear.value == this;
  }

  // reverseTraverse
  rTraverse(f, thisArg) {
    var children = this._children,
      child = children.front();
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
        var children = value.children,
          child = children.front();
        while (child) {
          _traverse(f, thisArg, child);
          child = child.getNextNode();
        }
      }
    };
    _traverse(f, thisArg, new ListNode(this));
  }
}
