const TreeNode = require("../").TreeNode;

beforeAll(() => {
  global.testTree = new TreeNode(0);
  global.node1 = new TreeNode(1);
  global.node2 = new TreeNode(2);
  global.node3 = new TreeNode(3);
  global.node4 = new TreeNode(4);
  global.node5 = new TreeNode(5);
  global.node6 = new TreeNode(6);
  global.node7 = new TreeNode(7);
  global.node8 = new TreeNode(8);
  global.node9 = new TreeNode(9);
  testTree.addChild(node1);
  testTree.addChild(node2);
  testTree.addChild(node3);
  testTree.addChild(node4);
  node3.addChild(node5);
  node3.addChild(node6);
  node4.addChild(node7);
  node4.addChild(node8);
  node4.addChild(node9);
  /**
   * tree
   * root testTree(0)
   * ├─ node1(1)
   * ├─ node2(2)
   * ├─ node3(3)
   * │  └─ node5(5)
   * │  └─ node6(6)
   * └─ node4(4)
   * │  └─ node7(7)
   * │  └─ node8(8)
   * │  └─ node9(9)
   */
});

function getLevelOrderTraverseNodes(treenode) {
  let nodes = [];
  treenode.traverse((v, k, n) => nodes.push(n));
  return nodes;
}

test("TreeNode.prototype.addChild()", () => {
  let tree = new TreeNode(0),
    tn1 = new TreeNode(1),
    tn2 = new TreeNode(2);
  tree.addChild(tn1);
  tree.addChild(tn2);
  expect(getLevelOrderTraverseNodes(tree)).toEqual([tree, tn1, tn2]);
});

test("TreeNode.prototype.isLeaf()", () => {
  expect(testTree.isLeaf()).toBeFalsy();
  expect(node1.isLeaf()).toBeTruthy();
});

test("TreeNode.prototype.isLastChild()", () => {
  expect(testTree.isLastChild()).toBeFalsy();
  expect(node4.isLastChild()).toBeTruthy();
});

test("TreeNode.prototype.rTraverse()", () => {
  let nodes = [];
  testTree.rTraverse((v, k, n) => nodes.push(v));
  expect(nodes).toEqual([1, 2, 5, 6, 3, 7, 8, 9, 4, 0]);
});

test("TreeNode.prototype.traverse()", () => {
  let nodes = [];
  testTree.traverse((v, k, n) => nodes.push(v));
  expect(nodes).toEqual([0, 1, 2, 3, 5, 6, 4, 7, 8, 9]);
});
