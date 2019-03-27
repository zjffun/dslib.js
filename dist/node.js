"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value = null, key = null) {
        this._key = null;
        this._value = null;
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
    setValue(value) {
        this._value = value;
    }
}
exports.default = Node;
