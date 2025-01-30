class Node {
    constructor (data){
        this.data = data;
        this.left = null;
        this.right= null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array){
        let sortedArray = [...new Set(array)].sort((a,b) => a-b);

        if (sortedArray.length === 0) return null;

        const mid = Math.floor(sortedArray.length/2);
        const left = sortedArray.slice(0,mid);
        const right = sortedArray.slice(mid+1);

        let root = new Node(sortedArray[mid]);
        root.left = this.buildTree(left);
        root.right = this.buildTree(right);

        return root;

    }

    insert(value){

      const insertNode = (currentNode,value) => {

        if (currentNode === null) return new Node(value);

        if (value < currentNode.data) {
          currentNode.left = insertNode(currentNode.left, value)
        } else if (value > currentNode.data){
          currentNode.right = insertNode(currentNode.right, value);
        }

        return currentNode;
      }

      this.root = insertNode(this.root, value);
    }

    deleteItem(value) {

      const compareNode = (currentNode, value) => {

        if (currentNode === null) return null;

        if (value === currentNode.data){
          
          //case 1: leaf node

          if (currentNode.left === null && currentNode.right === null){
            return null;
          }

          //case 2: one child

          if (currentNode.left !== null && currentNode.right === null){
            return currentNode.left;
          } else if (currentNode.left === null && currentNode.right !== null){
            return currentNode.right;
          }

          //case 2: two children
          if (currentNode.left !== null && currentNode.right !== null){

            let successor = currentNode.right;
            while (successor.left !== null){
              successor = successor.left;
            }

            currentNode.data = successor.data;

            currentNode.right = compareNode(currentNode.right, successor.data)
          }
        }
        
        if (value > currentNode.data) {
          currentNode.right = compareNode(currentNode.right, value);
        } else if (value < currentNode.data) {
          currentNode.left = compareNode (currentNode.left, value);
        }

        return currentNode;
      }

      this.root = compareNode(this.root, value);

    }

    find(value){

      const searchNode = (currentNode, value) =>{

        if (currentNode === null) return null;

        if (value === currentNode.data) return currentNode;

        if (value > currentNode.data){
          return searchNode(currentNode.right, value)
        }

        else if (value < currentNode.data){
          return searchNode(currentNode.left, value)
        }
      }

      return searchNode(this.root,value);
    }

    // levelOrder(callback){ - this is iterative approach

    //   if (typeof callback !== 'function'){
    //     throw new Error('A callback function is required')
    //   }

    //   if (this.root === null) return;

    //   const queue = [this.root];

    //   while (queue.length > 0){
        
    //     const currentNode = queue.shift();

    //     callback(currentNode);

    //     if (currentNode.left !== null) queue.push(currentNode.left);
    //     if (currentNode.right !== null) queue.push(currentNode.right)
    //   }
    // }

    levelOrder(callback){

      if (typeof callback !== 'function'){
        throw new Error ('A callback function is required')
      }
      
      if (this.root === null) return;

      const helper = (queue) => {

        if (queue.length === 0) return;

        const currentNode = queue.shift();

        callback(currentNode);

        if (currentNode.left !== null) queue.push(currentNode.left);
        if (currentNode.right !== null) queue.push(currentNode.right);

        helper(queue);
      }

      helper([this.root])
    }

    inOrder(callback) {

      if (typeof callback !== 'function') {
        throw new Error ('A callback function is required');
      }

      if (this.root === null) return;

      const traverse = (currentNode) => {

        if (currentNode === null) return null;

        traverse(currentNode.left);
        callback(currentNode);
        traverse(currentNode.right);
      }

      traverse(this.root);
    }

    preOrder(callback) {

      if (typeof callback !== 'function') {
        throw new Error ('A callback function is required');
      }

      if (this.root === null) return;

      const traverse = (currentNode) => {

        if (currentNode === null) return null;

        callback(currentNode);
        traverse(currentNode.left);
        traverse(currentNode.right);

      }

      traverse(this.root);
    }

    postOrder(callback) {

      if (typeof callback !== 'function') {
        throw new Error ('A callback function is required');
      }

      if (this.root === null) return;

      const traverse = (currentNode) => {

        if (currentNode === null) return null;

        traverse(currentNode.left);
        traverse(currentNode.right);
        callback(currentNode);
      }

      traverse(this.root);
    }

    height(node){

      if (node === null) return -1;

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      return 1 + Math.max(leftHeight,rightHeight)
    }

    depth(node, currentNode = this.root, currentDepth = 0){

      if (node === null) return `Node doesn't exist`;

      if (node === currentNode) return currentDepth;

      if (node.data < currentNode.data){
        return this.depth(node, currentNode.left, currentDepth + 1);
      } else return this.depth(node, currentNode.right, currentDepth + 1)
    }

    isBalanced(){

      const checkNode = (node) => {
      
      if (node === null) return true;

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      const diff = Math.abs(leftHeight - rightHeight);

      if (diff >= 2){
          return false;
        } else return checkNode(node.left) && checkNode (node.right);

      }

      return checkNode(this.root)
    } 

    rebalance(){

      const inOrderTraversal = (node, result = []) => {

        if (node === null) return result;

        inOrderTraversal(node.left, result);
        result.push(node.data);
        inOrderTraversal(node.right, result);

        return result;
      }

      const sortedResult = inOrderTraversal(this.root);

      this.root = this.buildTree(sortedResult);
    }
    
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const printNode = (node) =>{
  console.log(node.data)
}


const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(generateRandomArray(10));
prettyPrint(tree.root)
// Confirm the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print tree traversals
console.log("Level Order Traversal:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order Traversal:");
tree.preOrder(node => console.log(node.data));

console.log("Post-order Traversal:");
tree.postOrder(node => console.log(node.data));

console.log("In-order Traversal:");
tree.inOrder(node => console.log(node.data));

// Unbalance the tree by adding numbers > 100
tree.insert(101);
tree.insert(120);
tree.insert(150);

console.log("Is the tree still balanced?", tree.isBalanced());

prettyPrint(tree.root);

// Rebalance the tree
tree.rebalance();

// Confirm the tree is balanced again
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

prettyPrint(tree.root);

// Print tree traversals after rebalancing
console.log("Level Order Traversal after rebalancing:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order Traversal after rebalancing:");
tree.preOrder(node => console.log(node.data));

console.log("Post-order Traversal after rebalancing:");
tree.postOrder(node => console.log(node.data));

console.log("In-order Traversal after rebalancing:");
tree.inOrder(node => console.log(node.data));