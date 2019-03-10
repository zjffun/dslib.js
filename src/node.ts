export default class Node {
  private key = null;
  private value = null;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  getKey() {
    return this.key;
  }
  
  setKey(key) {
    this.key = key;
  }

  getValue() {
    return this.value;
  }
  
  clone() {
    return new Node(this.key, this.value);
  }
}
