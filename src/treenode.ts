import Node from "./node";
import List from "./list";
import ListNode from "./listnode";

export default class TreeNode extends Node {
  private _parent: TreeNode = null;
  private _children: List = null;

  /**
   * Initialize treenode with the given value, key and parent node.
   * @param value The value of the treenode.
   * @param key The key of the treenode.
   * @param parent The parent node of the treenode.
   */
  constructor(value, key = null, parent: TreeNode = null) {
    super(value, key);
    this._parent = parent;
    this._children = new List();
  }
  
  /**
   * The children node list.
   */
  get children(): List {
    return this._children;
  }
  
  /**
   * The parent node.
   */
  get parent(): TreeNode {
    return this._parent;
  }

  /**
   * Add a child node to current node.
   * @param value 
   * @param key 
   */
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

  /**
   * Determines whether the current node is the leaf node. 
   */
  isLeaf(): boolean {
    return !this._children.size();
  }

  /**
   * Determines whether the current node is the last node of the parent node.
   */
  isLastChild(): boolean {
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
  rTraverse(callback, thisArg?: any) {
    let _traverse = (callback, thisArg, listnode: ListNode) => {
      let treenode = listnode.value;
      if(treenode.children){
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
  traverse(callback, thisArg?: any) {
    let _traverse = (callback, thisArg, listnode: ListNode) => {
      let treenode = listnode.value;
      if (callback.call(thisArg, treenode.value, treenode.key, treenode, listnode) !== false) {
        treenode.children.forEach((v, k, n) => {
          _traverse(callback, thisArg, n);
        })
      }
    };
    _traverse(callback, thisArg, new ListNode(this));
  }
}
