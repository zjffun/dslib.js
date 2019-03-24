import Node from "./node";

export default class ListNode extends Node {
  private _prevNode: ListNode = null;
  private _nextNode: ListNode = null;

  get prevNode(): ListNode {
    return this._prevNode;
  }
  get nextNode(): ListNode {
    return this._nextNode;
  }
  deleteCurrent(): ListNode {
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
  deleteAfter(): ListNode {
    let node = this._nextNode;
    if (node) {
      node.deleteCurrent();
    }
    return node;
  }
  deleteBefore(): ListNode{
    let node = this._prevNode;
    if (node) {
      node.deleteCurrent();
    }
    return node;
  }

  insertAfter(node: ListNode): void {
    node._prevNode = this;
    node._nextNode = this._nextNode;
    node._prevNode._nextNode = node;
    if (node._nextNode) {
      node._nextNode._prevNode = node;
    }
  }

  insertBefore(node: ListNode): void {
    node._prevNode = this._prevNode;
    node._nextNode = this;
    node._nextNode._prevNode = node;
    if (node._prevNode) {
      node._prevNode._nextNode = node;
    }
  }
}
