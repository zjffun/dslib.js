const List = require('../dist/list');
let list = new List();
list.push(123);
list.push(456);
list.push(789);
console.log([...list]);
console.log(list.pop());
console.log(list.shift());
console.log([...list]);
console.log(list.pop());
console.log(list.shift());
console.log(list.pop());
console.log(list.shift());
console.log(list.pop());
console.log([...list]);

let list2 = new List(1,2,3,4,5,'zxc','sad','qwe');
console.log(...list2);