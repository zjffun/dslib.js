import Node from "./node";
import List from "./list";
export default class TreeNode extends Node {
    private _parent;
    private _children;
    /**
     * Initialize treenode with the given value, key and parent node.
     * @param value The value of the treenode.
     * @param key The key of the treenode.
     * @param parent The parent node of the treenode.
     */
    constructor(value: any, key?: any, parent?: TreeNode);
    /**
     * The children node list.
     */
    get children(): List;
    /**
     * The parent node.
     */
    get parent(): TreeNode;
    /**
     * Add a child node to current node.
     * @param value
     * @param key
     */
    addChild(value: any, key?: any): void;
    /**
     * Determines whether the current node is the leaf node.
     */
    isLeaf(): boolean;
    /**
     * Determines whether the current node is the last node of the parent node.
     */
    isLastChild(): boolean;
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
    rTraverse(callback: any, thisArg?: any): void;
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
    traverse(callback: any, thisArg?: any): void;
}
