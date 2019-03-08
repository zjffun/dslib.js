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

  getVaule() {
    return this.value;
  }
  
  clone() {
    return new Node(this.key, this.value);
  }
}
