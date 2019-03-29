import Node from "./node";

export default class ListNode extends Node {
  private _prevNode: ListNode = null;
  private _nextNode: ListNode = null;

  /**
   * The previous node.
   */
  get prevNode(): ListNode {
    return this._prevNode;
  }

  /**
   * The next node.
   */
  get nextNode(): ListNode {
    return this._nextNode;
  }

  /**
   * Delete current node and return deleted node. 
   */
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

  /**
   * Delete next node and return deleted node.
   */
  deleteAfter(): ListNode {
    let node = this._nextNode;
    if (node) {
      node.deleteCurrent();
    }
    return node;
  }

  /**
   * Delete previous node and return deleted node.
   */
  deleteBefore(): ListNode{
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
  insertAfter(node: ListNode): void {
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
  insertBefore(node: ListNode): void {
    node._prevNode = this._prevNode;
    node._nextNode = this;
    node._nextNode._prevNode = node;
    if (node._prevNode) {
      node._prevNode._nextNode = node;
    }
  }
}
