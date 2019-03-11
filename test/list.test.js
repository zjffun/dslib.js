const List = require("../dist/list");

let list = null;

test("List", () => {
  list = new List(1, 2, 3, 4, 5, "zxc", "sad", "qwe");
  expect([...list]).toEqual([1, 2, 3, 4, 5, "zxc", "sad", "qwe"]);
});

test("List.length", () => {
  expect(list.length).toEqual(8);
});

test("List.from()", () => {
  // Array
  list = List.from([1, 2, 3, 'zxc']);
  expect([...list]).toEqual([1, 2, 3, 'zxc']);
  list = List.from([1, 2, 3], x => x * 2)
  expect([...list]).toEqual([2, 4, 6]);

  // Set
  list = List.from(new Set([1, 2, 3, 'zxc', 1]));
  expect([...list]).toEqual([1, 2, 3, 'zxc']);

  // Map
  list = List.from(new Map([[1, 2], [2, 4], [4, 8]]));
  expect([...list]).toEqual([[1, 2], [2, 4], [4, 8]]);
});

// expect(list.pop()).toBe(null);
//   expect(list.shift()).toBe(null);
//   list.push(123);
//   list.push(456);
//   list.push(789);
//   expect([...list]).toEqual([123, 456, 789]);
//   expect(list.pop()).toBe(789);
//   expect(list.shift()).toBe(123);
//   expect([...list]).toEqual([456]);
//   list.pop();
//   expect(list.pop()).toBe(null);
//   expect(list.shift()).toBe(null);
//   expect([...list]).toEqual([]);