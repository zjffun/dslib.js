const TreeNode = require('../dist/treenode');

beforeAll(() => {
  global.testTree = new TreeNode();
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
});

test("TreeNode.prototype.isLeaf()", ()=>{

})
test("TreeNode.prototype.isLastChild()", ()=>{

})
test("TreeNode.prototype.rTraverse()", ()=>{

})
test("TreeNode.prototype.traverse()", ()=>{

})