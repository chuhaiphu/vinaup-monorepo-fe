interface TreeNode {
  id: string;
  parent?: { id: string } | null;
  children?: this[];
  sortOrder: number;
}

export class TreeManager<T extends TreeNode> {
  private root: T;
  private nodeMap = new Map<string, T>();

  constructor(flatList: T[]) {
    this.root = this.buildTree(flatList);
  }

  private buildTree(flatList: T[]): T {
    let root: T | undefined;

    // clone each item in the flat list to the node map
    // each node has its own id and empty children array
    for (const item of flatList) {
      this.nodeMap.set(item.id, { ...item, children: [] });
    }
    // iterate through the flat list to build the tree
    for (const item of flatList) {
      // get the current node
      const node = this.nodeMap.get(item.id);
      if (!node) continue;
      // get its parent node
      if (item.parent?.id) {
        const parent = this.nodeMap.get(item.parent.id);
        if (parent) {
          parent?.children?.push(node);
          parent?.children?.sort((a, b) => a.sortOrder - b.sortOrder);
        }
      }
      // if the node has no parent, it is the root node
      else {
        root = node;
      }
    }

    if (!root) {
      throw new Error('Root node not found');
    }
    return root;
  }

  private traverse(node: T, action: (node: T) => void) {
    action(node);
    for (const child of node.children ?? []) {
      this.traverse(child, action);
    }
  }

  toFlatList(startNodeId?: string): T[] {
    // if startNodeId is provided, start from the node with the given id
    // otherwise, start from the root node
    const startNode = startNodeId ? this.getNodeById(startNodeId) : this.root;
    if (!startNode) return [];
    const result: T[] = [];
    this.traverse(startNode, (node) => result.push(node));
    return result;
  }

  toFlatListWithoutRoot(): T[] {
    const result: T[] = [];
    for (const child of this.root.children ?? []) {
      this.traverse(child, (node) => result.push(node));
    }
    return result;
  }

  toIds(nodes: T[]): Set<string> {
    const result = new Set<string>();
    for (const node of nodes) {
      this.traverse(node, (node) => result.add(node.id));
    }
    return result;
  }

  getRoot(): T {
    return this.root;
  }

  getNodeById(id: string): T | null {
    return this.nodeMap.get(id) ?? null;
  }

  getSiblings(id: string): T[] {
    const node = this.getNodeById(id);
    if (!node || !node.parent) return [];
    const parentNode = this.getNodeById(node.parent.id);
    if (!parentNode || !parentNode.children) return [];
    return parentNode.children.filter((child: T) => child.id !== id);
  }
}
