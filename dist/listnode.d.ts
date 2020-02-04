import Node from "./node";
export default class ListNode extends Node {
    private _prevNode;
    private _nextNode;
    /**
     * The previous node.
     */
    get prevNode(): ListNode;
    /**
     * The next node.
     */
    get nextNode(): ListNode;
    /**
     * Delete current node and return deleted node.
     */
    deleteCurrent(): ListNode;
    /**
     * Delete next node and return deleted node.
     */
    deleteAfter(): ListNode;
    /**
     * Delete previous node and return deleted node.
     */
    deleteBefore(): ListNode;
    /**
     * Insert a note after current node.
     * @param node Node will inserted.
     */
    insertAfter(node: ListNode): void;
    /**
     * Insert a note before current node.
     * @param node Node will inserted.
     */
    insertBefore(node: ListNode): void;
}
