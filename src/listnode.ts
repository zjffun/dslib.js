import Node from "./node";

export default class ListNode extends Node {
  private prevNode: ListNode = null;
  private nextNode: ListNode = null;

  getPrevNode(): ListNode {
    return this.prevNode;
  }
  getNextNode(): ListNode {
    return this.nextNode;
  }
  deleteCurrent(): ListNode {
    let node = this;
    if (node.prevNode) {
      node.prevNode.nextNode = node.nextNode;
    }
    if (this.nextNode) {
      node.nextNode.prevNode = node.prevNode;
    }
    node.prevNode = null;
    node.nextNode = null;
    return node;
  }
  deleteAfter(): ListNode {
    let node = this.nextNode;
    if (node) {
      node.deleteCurrent();
    }
    return node;
  }

  insertAfter(node): void {
    node.prevNode = this;
    node.nextNode = this.nextNode;
    node.prevNode.nextNode = node;
    if (node.nextNode) {
      node.nextNode.prevNode = node;
    }
  }

  insertBefore(node): void {
    node.prevNode = this.prevNode;
    node.nextNode = this;
    node.nextNode.prevNode = node;
    if (node.nextNode) {
      node.prevNode.nextNode = node;
    }
  }
}
