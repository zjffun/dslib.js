"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
class ListNode extends node_1.default {
    constructor() {
        super(...arguments);
        this._prevNode = null;
        this._nextNode = null;
    }
    /**
     * The previous node.
     */
    get prevNode() {
        return this._prevNode;
    }
    /**
     * The next node.
     */
    get nextNode() {
        return this._nextNode;
    }
    /**
     * Delete current node and return deleted node.
     */
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
    /**
     * Delete next node and return deleted node.
     */
    deleteAfter() {
        let node = this._nextNode;
        if (node) {
            node.deleteCurrent();
        }
        return node;
    }
    /**
     * Delete previous node and return deleted node.
     */
    deleteBefore() {
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
    insertAfter(node) {
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
    insertBefore(node) {
        node._prevNode = this._prevNode;
        node._nextNode = this;
        node._nextNode._prevNode = node;
        if (node._prevNode) {
            node._prevNode._nextNode = node;
        }
    }
}
exports.default = ListNode;
