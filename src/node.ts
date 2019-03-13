export default class Node {
  private _key = null;
  private _value = null;
  constructor(value = null, key = null) {
    this._key = key;
    this._value = value;
  }

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  setKey(key) {
    this._key = key;
  }
}
