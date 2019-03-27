"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const list_1 = require("./list");
const listnode_1 = require("./listnode");
class TreeNode extends node_1.default {
    constructor(value, key = null, parent = null) {
        super(value, key);
        this._parent = null;
        this._children = null;
        this._parent = parent;
        this._children = new list_1.default();
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
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
    isLeaf() {
        return !this._children.size();
    }
    isLastChild() {
        return this._parent._children.rear.value == this;
    }
    // reverseTraverse
    rTraverse(f, thisArg) {
        var children = this._children, child = children.front();
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
                var children = value.children, child = children.front();
                while (child) {
                    _traverse(f, thisArg, child);
                    child = child.getNextNode();
                }
            }
        };
        _traverse(f, thisArg, new listnode_1.default(this));
    }
}
exports.default = TreeNode;
