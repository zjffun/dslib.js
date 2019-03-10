import Node from "./node";
import List from "./list";
import ListNode from "./listnode";

export default class TreeNode extends Node {
  private parent: TreeNode = null;
  private children: List = null;

  constructor(key, value, parent: TreeNode = null) {
    super(key, value);
    this.parent = parent;
    this.children = new List();
  }

  getChildren(): List {
    return this.children;
  }

  getParent(): TreeNode{
    return this.parent;
  }

  addChild(value): void {
    let node = null;
    if (value instanceof TreeNode) {
      value.parent = this;
      node = value;
    } else {
      node = new TreeNode(null, value, this);
    }
    this.children.push(node);
  }

  isLeaf(): boolean {
    return !this.children.length;
  }

  isLastChild(): boolean {
    return this.parent.children.rear.getValue() == this;
  }

  // reverseTraverse
  rTraverse(f, thisArg) {
    var children = this.children,
      child = children.front();
    while (child) {
      child.getValue().rTraverse(f, thisArg);
      child = child.getNextNode();
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
    }
    _traverse(f, thisArg, new ListNode(null, this));
  }

  clone() {
    return new TreeNode(this.getKey(), this.getValue());
  }
}