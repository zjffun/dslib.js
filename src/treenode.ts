import Node from "./node";
import List from "./list";

export default class TreeNode extends Node {
  private parent: TreeNode = null;
  private children: List = null;

  constructor(key, value, parent: TreeNode = null) {
    super(key, value);
    this.parent = parent;
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
    return this.parent.children.rear.getVaule() == this;
  }

  traverse(f, thisArg) {
    if (f.call(thisArg, this) !== false) {
      var children = this.children, child = children.head;
      while(child){
        child.getVaule().traverse(f, thisArg);
        child = child.getNextNode();
      }
    }
  };

  clone() {
    return new TreeNode(this.getKey(), this.getVaule());
  }
}
