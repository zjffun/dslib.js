import ListNode from "./listnode";
import from from "./list/from";
import reduce from './list/reduce';

export default class List {
  forEach(f: any, thisArg: any): any {
    throw new Error("Method not implemented.");
  }
  public length = 0;
  public rear: ListNode = null;
  public head: ListNode = null;
  [Symbol.iterator]() {
    let currentNode = this.head;
    return {
      next() {
        currentNode = currentNode.getNextNode();
        return {
          done: !currentNode,
          value: currentNode && currentNode.getValue()
        };
      }
    };
  }

  constructor(...args) {
    if(args.length){
      Object.assign(this, List.of(...args));
    }else{
      this.head = new ListNode(null, null);
      this.rear = this.head;
    }
  }

  static from(...args): List {
    return from.apply(this, args);
  }

  static of(...args): List{
    return List.from(args);
  }

  static isList(value): boolean {
    return value instanceof List;
  }

  push(value): void {
    let node = new ListNode(null, value);
    this.rear.insertAfter(node);
    this.rear = node;
    this.length++;
  }

  pop() {
    let node = null;
    if (this.length > 0) {
      this.rear = this.rear.getPrevNode(); 
      node = this.rear.deleteAfter();
      this.length--;
    }
    return node ? node.getValue() : null;
  }

  shift(): void {
    let node = null; 
    if (this.length > 0) {
      node = this.head.deleteAfter();
      this.length--;
    }
    return node ? node.getValue() : null;
  }

  unshift(value): void {
    let node = new ListNode(null, value);
    this.head.insertAfter(node);
    this.length++;
  }

  // Like c++ std::list::front 
  front(): ListNode {
    return this.head.getNextNode();
  }

  reduce(callback, initialValue){
    return reduce.call(this, callback, initialValue);
  }
}
