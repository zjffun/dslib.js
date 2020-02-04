export default class Node {
    private _key;
    private _value;
    /**
     * Initialize node with the given value and key.
     * @param value
     * @param key
     */
    constructor(value?: any, key?: any);
    /**
     * Returns the key of the current node.
     */
    get key(): any;
    /**
     * Returns the value of the current node.
     */
    get value(): any;
    /**
     * Sets the key of the current node.
     * @param key Key will be set.
     */
    setKey(key: any): void;
    /**
     * Sets the value of the current node.
     * @param value Value will be set.
     */
    setValue(value: any): void;
}
