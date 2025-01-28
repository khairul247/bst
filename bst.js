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

let test = new Tree([1,8,9,6,21,5,7,76,3,51,64]);
prettyPrint(test.root)
test.insert(2)
prettyPrint(test.root)
test.deleteItem(51)
prettyPrint(test.root)
console.log(test.find(51));
test.levelOrder(printNode)