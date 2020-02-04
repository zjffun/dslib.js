"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const list_1 = require("./list");
const listnode_1 = require("./listnode");
class TreeNode extends node_1.default {
    /**
     * Initialize treenode with the given value, key and parent node.
     * @param value The value of the treenode.
     * @param key The key of the treenode.
     * @param parent The parent node of the treenode.
     */
    constructor(value, key = null, parent = null) {
        super(value, key);
        this._parent = null;
        this._children = null;
        this._parent = parent;
        this._children = new list_1.default();
    }
    /**
     * The children node list.
     */
    get children() {
        return this._children;
    }
    /**
     * The parent node.
     */
    get parent() {
        return this._parent;
    }
    /**
     * Add a child node to current node.
     * @param value
     * @param key
     */
    addChild(value, key = null) {
        let node = null;
        if (value instanceof TreeNode) {
            value._parent = this;
            node = value;
        }
        else {
            node = new TreeNode(value, key, this);
        }
        this._children.push(node);
    }
    /**
     * Determines whether the current node is the leaf node.
     */
    isLeaf() {
        return !this._children.size();
    }
    /**
     * Determines whether the current node is the last node of the parent node.
     */
    isLastChild() {
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
    rTraverse(callback, thisArg) {
        let _traverse = (callback, thisArg, listnode) => {
            let treenode = listnode.value;
            if (treenode.children) {
                treenode.children.forEach((v, k, n) => {
                    _traverse(callback, thisArg, n);
                });
            }
            callback.call(thisArg, treenode.value, treenode.key, treenode, listnode);
        };
        _traverse(callback, thisArg, new listnode_1.default(this));
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
    traverse(callback, thisArg) {
        let _traverse = (callback, thisArg, listnode) => {
            let treenode = listnode.value;
            if (callback.call(thisArg, treenode.value, treenode.key, treenode, listnode) !== false) {
                treenode.children.forEach((v, k, n) => {
                    _traverse(callback, thisArg, n);
                });
            }
        };
        _traverse(callback, thisArg, new listnode_1.default(this));
    }
}
exports.default = TreeNode;
