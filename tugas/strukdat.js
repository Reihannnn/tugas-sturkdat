class TreeNode {
  constructor(key) {
    this.key = key;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  getHeight(node) {
    if (!node) {
      return 0;
    }
    return node.height;
  }

  getBalance(node) {
    if (!node) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    return y;
  }

  insert(root, key) {
    if (!root) {
      return new TreeNode(key);
    }

    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    } else {
      return root;
    }

    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    const balance = this.getBalance(root);

    // Left-Left Case
    if (balance > 1 && key < root.left.key) {
      return this.rotateRight(root);
    }

    // Right-Right Case
    if (balance < -1 && key > root.right.key) {
      return this.rotateLeft(root);
    }

    // Left-Right Case
    if (balance > 1 && key > root.left.key) {
      root.left = this.rotateLeft(root.left);
      return this.rotateRight(root);
    }

    // Right-Left Case
    if (balance < -1 && key < root.right.key) {
      root.right = this.rotateRight(root.right);
      return this.rotateLeft(root);
    }

    return root;
  }

  preOrderTraversal(root) {
    if (root) {
      console.log(root.key);
      this.preOrderTraversal(root.left);
      this.preOrderTraversal(root.right);
    }
  }
}

// Contoh penggunaan AVL Tree
const avlTree = new AVLTree();
let root = null;

const keys = [10, 20, 30, 40, 50, 25];

for (const key of keys) {
  root = avlTree.insert(root, key);
}

console.log("Pre-order traversal hasil AVL Tree:");
avlTree.preOrderTraversal(root);

// reihan achmad susilo
// 51422405
// 2IA25
