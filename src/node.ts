export default class Node {
  private _key = null;
  private _value = null;

  /**
   * Initialize node with the given value and key.
   * @param value 
   * @param key 
   */
  constructor(value = null, key = null) {
    this._key = key;
    this._value = value;
  }

  /**
   * Returns the key of the current node.
   */
  get key() {
    return this._key;
  }

  /**
   * Returns the value of the current node.
   */
  get value() {
    return this._value;
  }

  /**
   * Sets the key of the current node.
   * @param key Key will be set.
   */
  setKey(key) {
    this._key = key;
  }

  /**
   * Sets the value of the current node.
   * @param value Value will be set.
   */
  setValue(value) {
    this._value = value;
  }
}
