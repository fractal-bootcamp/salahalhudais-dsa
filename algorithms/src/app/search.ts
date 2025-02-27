import { start } from "repl";
// Data Structures & Algorithms
export class PriorityQueue<T> {
  private heap: {value : T, priority: number}[] = [];


  enqueue(value: T, priority: number) {
    this.heap.push({value, priority});
    this.heap.sort((a,b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.heap.shift()?.value;
  }
  isEmpty(): boolean {
    return this.heap.length == 0;
  }
}

export class Graph {
  private adjacencyList: Map<string, {node: string, weight: number}[]> = new Map();

  addVertex(vertex1: string) {
    if(!this.adjacencyList.has(vertex1)) {
      this.adjacencyList.set(vertex1,[]);
    }
  }

  addEdge(vertex1: string, vertex2: string, weight: number) {
    this.adjacencyList.get(vertex1)?.push({node: vertex2, weight});
    this.adjacencyList.get(vertex2)?.push({node: vertex1, weight});
  }

  getNeighbors(vertex1: string) {
    return this.adjacencyList.get(vertex1) || [];
  }

  printGraph() {
    console.log(this.adjacencyList);
  }

  getAllVertices() {
    return Array.from(this.adjacencyList.keys());
  }
}

// Rename Node to TreeNode to avoid conflict with DOM's Node type
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  insert(value: T) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return; 
    }

    let current = this.root;

    while(true) {
      if(current.value > value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newNode;
          return;
        }
      } else if(current.value < value) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newNode;
          return;
        }
      } else {
        return;
      }
    }
  }
}

type linearSearchState = {
  currentArr: number[];
  currentPointer: number | null;
}
export function linearSearch(num: number, arr: number[], callback?: (state: linearSearchState) => void): number {
  let indice: number = 0;
  arr.forEach((element, idx) => {
    callback?.(structuredClone({currentArr: arr, currentPointer: idx, currentPosition: null}))
    if (element === num) {
      indice = element;
      return;
    }
  });
  return indice;
}

console.log(linearSearch(3, [5,4,3,2,1,0,3,5,3,3]));

export type binarySearchState = {
  currentArr: number[];
  leftPointer: number | null;
  rightPointer: number | null;
  middlePointer: number | null;
}

export function binarySearch(num: number, arr: number[], callback?: (state: binarySearchState) => void): number {
  let start = 0, end = arr.length -1;
  callback?.(structuredClone({currentArr: arr, leftPointer: start, rightPointer: end, middlePointer: null}))
  while(start <= end) {
    let mid = Math.floor((end + start) / 2);
    callback?.(structuredClone({currentArr: arr, leftPointer: start, rightPointer: end, middlePointer: mid}))
    if (arr[mid] == num) return mid;
    if(num > arr[mid]) {
      start = mid + 1;
    } else if (num < arr[mid]) {
      end = mid -1;
    }
  }
  callback?.(structuredClone({currentArr: arr, leftPointer: start, rightPointer: end, middlePointer: null}))
  return -1;
}



console.log("Binary search for array:[1,2,3,4,5,7,8,19,20,21]:", binarySearch(21, [1,2,3,4,5,7,8,19,20,21]));


export type bubbleSortstate = {
currentArr: number[];
currentPosition: number | null;
currentPointer: number | null;
}

export function bubblesort(arr: number[], callback?: (state: bubbleSortstate) => void): number[] {
  let newArr = arr.slice();
  for(let i = 0; i < newArr.length - 1; i++) {
    callback?.(structuredClone({currentArr: newArr, currentPointer: i, currentPosition: null}))
    for(let j = 0; j < newArr.length - 1 - i; j++) {
      callback?.(structuredClone({currentArr: newArr, currentPointer: i, currentPosition: j}))
      if (newArr[j] > newArr[j + 1]) {
        let temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
        callback?.(structuredClone({currentArr: newArr, currentPointer: i, currentPosition: j}))
      }
    }
  }
  callback?.(structuredClone({currentArr: newArr, currentPointer: null, currentPosition: null}))
  return newArr;
}

console.log("Bubble sort for ", [9,8,7,6,5,4,3], bubblesort([9,8,7,6,5,4,3]));


export type SelectionSortState = {
  currentArr: number[],
  currentPosition: number | null,
  currentSmallestIdx: number | null,
  currentPointer: number | null, 
}


// only really use this if you're planning to pass a callback
// but it's serviceable and efficient even without a callback, just a few extra if statements.
export function selectionSort(arr:number[], callback?: (state: SelectionSortState) => void): number[] {
  let newArr = arr.slice();

  // for each position
  for (let i = 0; i < newArr.length; i++) {
    callback?.(structuredClone({currentArr: newArr, currentPosition: i, currentSmallestIdx: null, currentPointer: null}))
    let smallestIdx = i
    // find the smallest remaining element
    for(let j = i; j < newArr.length; j++) {
      callback?.(structuredClone({currentArr: newArr, currentPosition: i, currentSmallestIdx: smallestIdx, currentPointer: j}))
      if (newArr[j] < newArr[smallestIdx]) {
        smallestIdx = j;
        callback?.(structuredClone({currentArr: newArr, currentPosition: i, currentSmallestIdx: smallestIdx, currentPointer: j}))
      }
    }
    // put the smallest remaining element in the left-most remaining position
    [newArr[i], newArr[smallestIdx]] = [newArr[smallestIdx], newArr[i]]
    callback?.(structuredClone({currentArr: newArr, currentPosition: null, currentSmallestIdx: null, currentPointer: null}))
  }

  return newArr;
}
console.log("Selection Sort for ", [9,8,7,6,5,4,3], selectionSort([9,8,7,6,5,4,3]));

type insertionSortState = {
  key: number | null;
  leftIndex: number | null;
  currentPointer: number | null;
  currentArr: number[];
}

export function insertionSort( arr: number[], callback?: (state: insertionSortState) => void): number[] {
  let newArr = arr.slice();
  callback?.(structuredClone({key: null, leftIndex: null, currentPointer: null, currentArr: newArr}))
  for(let i = 1; i < newArr.length; i++) {
    let key = newArr[i];
    let j = i - 1;
    callback?.(structuredClone({key: key, leftIndex: j, currentPointer: i, currentArr: newArr}))
    while(j >= 0 && newArr[j] > key) {
      callback?.(structuredClone({key: key, leftIndex: j, currentPointer: i, currentArr: newArr}))
      newArr[j + 1] = newArr[j];
      j--;
    }

    newArr[j + 1] = key;
    callback?.(structuredClone({key: key, leftIndex: j, currentPointer: i, currentArr: newArr}))
  }

  callback?.(structuredClone({key: null, leftIndex: null, currentPointer: null, currentArr: newArr}))
  return newArr;
}

console.log("InsertionSort for ", [9,8,7,6,5,4,3], insertionSort([9,8,7,6,5,4,3]));

type mergeSortState = {
  currentArray: number[];     
  leftArray: number[];       
  rightArray: number[];      
  leftIndex: number | null;  
  rightIndex: number | null; 
  mergeIndex: number | null;
  depth: number; 
  isMerging: boolean;
}


export function mergeSortHead(arr: number[], callback?: (state: mergeSortState) => void): number[] {
  const fullArray = [...arr];  // Keep track of full array state

  function mergeSort(start: number, end: number, depth: number = 0): number[] {
    if (end - start <= 1) {
      callback?.({
        currentArray: [...fullArray],
        leftArray: [],
        rightArray: [],
        leftIndex: start,
        rightIndex: end,
        mergeIndex: null,
        depth: depth,
        isMerging: false
      });
      return fullArray.slice(start, end);
    }

    const mid = Math.floor((start + end) / 2);
    
    // Show division state
    callback?.({
      currentArray: [...fullArray],
      leftArray: fullArray.slice(start, mid),
      rightArray: fullArray.slice(mid, end),
      leftIndex: start,
      rightIndex: end,
      mergeIndex: mid,
      depth: depth,
      isMerging: false
    });

    const sortedLeft = mergeSort(start, mid, depth + 1);
    const sortedRight = mergeSort(mid, end, depth + 1);
    
    // Merge the sorted portions back into fullArray
    const merged = helpercombine(sortedLeft, sortedRight);
    for (let i = 0; i < merged.length; i++) {
      fullArray[start + i] = merged[i];
    }

    callback?.({
      currentArray: [...fullArray],
      leftArray: sortedLeft,
      rightArray: sortedRight,
      leftIndex: start,
      rightIndex: end,
      mergeIndex: mid,
      depth: depth,
      isMerging: true
    });

    return merged;
  }

  function helpercombine(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      callback?.({
        currentArray: [...fullArray],
        leftArray: left,
        rightArray: right,
        leftIndex: i,
        rightIndex: j,
        mergeIndex: result.length,
        depth: 0,
        isMerging: true
      });

      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Handle remaining elements
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  mergeSort(0, fullArray.length);
  return fullArray;
}

console.log("mergeSort for ", [9,8,7,6,5,4,3], mergeSortHead([9,8,7,6,5,4,3]));


type quickSortType = {
  currentArray: number[];
  leftArray: number[];
  rightArray: number[];
  leftIndex: number | null;
  rightIndex: number | null;
  pivotIndex: number | null;
  pivotValue:  number | null;
  depth: number | null
  swapping: boolean;
  isPartitioning: boolean;
}

export function quickSort(arr: number[], callback?: (state: quickSortType) => void): number[] {
  const fullArray = [...arr];

  function quickSortHelper(start: number, end: number, depth: number = 0): void {
    if (start >= end) return;

    const pivotIndex = Math.floor(start + Math.random() * (end - start + 1));
    const pivot = fullArray[pivotIndex];

    callback?.({
      currentArray: [...fullArray],
      leftArray: [],
      rightArray: [],
      leftIndex: start,
      rightIndex: end,
      pivotIndex: pivotIndex,
      pivotValue: pivot,
      depth: depth,
      swapping: false,
      isPartitioning: false
    });

    [fullArray[pivotIndex], fullArray[end]] = [fullArray[end], fullArray[pivotIndex]];
    
    let partitionIndex = start;
    
    for (let i = start; i < end; i++) {
      if (fullArray[i] < pivot) {
        callback?.({
          currentArray: [...fullArray],
          leftArray: fullArray.slice(start, partitionIndex),
          rightArray: fullArray.slice(partitionIndex, end),
          leftIndex: i,
          rightIndex: partitionIndex,
          pivotIndex: end,
          pivotValue: pivot,
          depth: depth,
          swapping: true,
          isPartitioning: true
        });

        [fullArray[i], fullArray[partitionIndex]] = [fullArray[partitionIndex], fullArray[i]];
        partitionIndex++;
      }
    }
    [fullArray[partitionIndex], fullArray[end]] = [fullArray[end], fullArray[partitionIndex]];
    callback?.({
      currentArray: [...fullArray],
      leftArray: fullArray.slice(start, partitionIndex),
      rightArray: fullArray.slice(partitionIndex + 1, end + 1),
      leftIndex: start,
      rightIndex: end,
      pivotIndex: partitionIndex,
      pivotValue: pivot,
      depth: depth,
      swapping: false,
      isPartitioning: false
    });

    quickSortHelper(start, partitionIndex - 1, depth + 1);
    quickSortHelper(partitionIndex + 1, end, depth + 1);
  }

  quickSortHelper(0, fullArray.length - 1);
  return fullArray;
}

let arr: number[] = [9,8,7,6,5,4,3]
console.log("quickSort for: [9,8,7,6,5,4,3]: ", quickSort(arr));


const myTree = new BinaryTree<number>();
myTree.insert(10);
myTree.insert(5);
myTree.insert(15);
myTree.insert(3);
myTree.insert(7);
console.log("Created a binary tree with values: 10, 5, 15, 3, 7");

const myGraph = new Graph();
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
myGraph.addVertex("D");
myGraph.addEdge("A", "B", 1);
myGraph.addEdge("A", "C", 2);
myGraph.addEdge("B", "D", 3);
myGraph.addEdge("C", "D", 1);
console.log("Created a graph with vertices A, B, C, D and edges between them:");
myGraph.printGraph();


type treeDFSType = {
  depth: number;
  visited: number[];
  isLeaf: boolean;
  parentValue: number | null;
  currentNode: TreeNode<number>
  stack: TreeNode<number>[];
}

export function treeDFS(
  root: TreeNode<number> | null, 
  callback?: (state: treeDFSType) => void, 
  depth: number = 0,
  visited: number[] = [],
  stack: TreeNode<number>[] = []
): void {
  if (!root) {
    return;
  }

  const isLeaf = !root.left && !root.right;
  stack.push(root);
  visited.push(root.value);

  callback?.({
    depth: depth,
    isLeaf: isLeaf,
    currentNode: root,
    parentValue: stack[stack.length - 2]?.value ?? null,
    stack: [...stack],
    visited: [...visited]
  });

  treeDFS(root.left, callback, depth + 1, visited, stack);
  treeDFS(root.right, callback, depth + 1, visited, stack);
  stack.pop();
}
console.log("DFS tree traversal:");
treeDFS(myTree.root);



type treeBFS = {
  currentNode: TreeNode<number> | null;
  queue: (TreeNode<number> | null)[];
  depth: number;
  isLeaf: boolean;
  parentValue: TreeNode<number>[];
  visited: number[];
}

export function treeBFS(root: TreeNode<number> | null, callback?: (state: treeBFS) => void, depth: number = 0): void {
  let queue: (TreeNode<number> | null)[] = [];
  let visited: number[] = [];

  if (root) {
    queue.push(root);
    callback?.({
      currentNode: root,
      queue: [...queue],
      depth: depth,
      isLeaf: !root.left && !root.right,
      parentValue: [],
      visited: []
    });
  }

  while(queue.length) {
    let current = queue.shift();
    if (!current) continue;

    visited.push(current.value);
    const isLeaf = !current.left && !current.right;

    callback?.({
      currentNode: current,
      queue: [...queue],
      depth: depth,
      isLeaf: isLeaf,
      parentValue: [],
      visited: [...visited]
    });

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
}

interface GraphNode<T> {
  value: T;
}
interface Edge<T> {
  node: T;
  weight: number;
}
type  graphType = {
  visited: Set<string>;
  currentNode: string | null;
  graph: Graph;  
}

type GraphTraversalState = {
  visited: Set<string>;
  currentNode: string,
  neighbors: string[],
  graph: Graph;
  depth: number;

}

type graphDFSState = Partial<GraphTraversalState> & {
  stack: string[],
}

export function graphDFS(graph: Graph, startNodeId: string, callback?: (state: graphDFSState) => void): void {
  const visited = new Set<string>();
  const stack: string[] = [];
  callback?.({
    visited: new Set(),
    currentNode: startNodeId,
    stack: [],
    neighbors: graph.getNeighbors(startNodeId).map(edge => edge.node),
    graph: graph,
    depth: 0
  });

  function dfsHelper(nodeId: string, depth: number = 0): void {
    if (visited.has(nodeId)) {
      return;
    }
    
    visited.add(nodeId);
    stack.push(nodeId);

    const neighbors = graph.getNeighbors(nodeId).map(edge => edge.node);

    callback?.({
      visited: new Set(visited),  
      currentNode: nodeId,
      stack: [...stack],
      neighbors: [...neighbors],
      graph: graph,
      depth: depth
    });

    for (const edge of graph.getNeighbors(nodeId)) {
      dfsHelper(edge.node, depth + 1);
    }

    stack.pop();
  }
  
  dfsHelper(startNodeId);
}

type graphBFSState = Partial<GraphTraversalState> & {
  queue: string[];
}

export function graphBFS(graph: Graph, startNode: string, callback?: (state: graphBFSState) => void): void {
  const visited = new Set<string>();
  const queue: string[] = [startNode];

  callback?.({
    visited: new Set(),
    currentNode: startNode,
    queue: [startNode],
    neighbors: graph.getNeighbors(startNode).map(edge => edge.node),
    graph: graph,
    depth: 0
  });

  visited.add(startNode);

  while(queue.length) {
    let current = queue.shift();
    if(!current) continue;

    const neighbors = graph.getNeighbors(current).map(edge => edge.node);
    
    callback?.({
      visited: new Set(visited),
      currentNode: current,
      queue: [...queue],
      neighbors: [...neighbors],
      graph: graph,
      depth: visited.size - 1
    });

    for(const edge of graph.getNeighbors(current)) {
      if(!visited.has(edge.node)) {
        visited.add(edge.node);
        queue.push(edge.node);
      }
    }
  }
}
type graphDijkstra = GraphTraversalState & {
  queue: PriorityQueue<string>;
  distances: Map<string, number>;
  previous: Map<string, string | null>;
  shortestPath: string[];
  currentDistance: number;
}

export function dijkstra(graph: Graph, startNode: string, endNode: string, callback?: (state: graphDijkstra) => void) {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const queue = new PriorityQueue<string>();
  const visited = new Set<string>();

  
  for(const vertex of graph.getAllVertices()) {
    distances.set(vertex, Infinity);
    previous.set(vertex, null);
  }
  distances.set(startNode, 0);
  queue.enqueue(startNode, 0);
  callback?.({
    visited: new Set<string>(),
    currentNode: startNode,
    neighbors: graph.getNeighbors(startNode).map(edge => edge.node),
    graph: graph,
    depth: 0,
    queue: structuredClone(queue),
    distances: new Map(distances),
    previous: new Map(previous),
    currentDistance: 0,
    shortestPath: [startNode]
  });

  while(!queue.isEmpty()) {
    const current = queue.dequeue();
    if(!current) continue;
    if (current === endNode) {
      const currentPath = buildPath(previous, current);
      callback?.({
        visited: new Set(visited),
        currentNode: current,
        neighbors: graph.getNeighbors(current).map(edge => edge.node),
        graph: graph,
        depth: visited.size,
        queue: structuredClone(queue),
        distances: new Map(distances),
        previous: new Map(previous),
        currentDistance: distances.get(current) || 0,
        shortestPath: currentPath
      });
      break;
    }
    if(visited.has(current)) continue;
    visited.add(current);
    const currentPath = buildPath(previous, current);
    callback?.({
      visited: new Set(visited),
      currentNode: current,
      neighbors: graph.getNeighbors(current).map(edge => edge.node),
      graph: graph,
      depth: visited.size,
      queue: structuredClone(queue),
      distances: new Map(distances),
      previous: new Map(previous),
      currentDistance: distances.get(current) || 0,
      shortestPath: currentPath
    });
    
    for(const edge of graph.getNeighbors(current)) {
      if(visited.has(edge.node)) continue;
      
      const tentativeDistance = (distances.get(current) || 0) + edge.weight;
      
      if (tentativeDistance < (distances.get(edge.node) || Infinity)) {
        distances.set(edge.node, tentativeDistance);
        previous.set(edge.node, current);
        queue.enqueue(edge.node, tentativeDistance);
        
        // Neighbor update state callback
        const neighborPath = buildPath(previous, edge.node);
        callback?.({
          visited: new Set(visited),
          currentNode: edge.node,
          neighbors: graph.getNeighbors(current).map(e => e.node),
          graph: graph,
          depth: visited.size,
          queue: structuredClone(queue),
          distances: new Map(distances),
          previous: new Map(previous),
          currentDistance: tentativeDistance,
          shortestPath: neighborPath
        });
      }
    }
  }

  const path = buildPath(previous, endNode);
  
  return {
    distance: distances.get(endNode) || Infinity,
    path
  };
}

function buildPath(previous: Map<string, string | null>, endNode: string): string[] {
  const path: string[] = [];
  let current = endNode;
  
  while(current) {
    path.unshift(current);
    current = previous.get(current) || '';
    if(current === null || current === '') break;
  }
  
  return path;
}

// Test Dijkstra's algorithm
console.log("Testing Dijkstra's algorithm:");

// Create a test graph
const testGraph = new Graph();
testGraph.addVertex("A");
testGraph.addVertex("B");
testGraph.addVertex("C");
testGraph.addVertex("D");
testGraph.addVertex("E");

// Add edges with weights
testGraph.addEdge("A", "B", 4);
testGraph.addEdge("A", "C", 2);
testGraph.addEdge("B", "E", 3);
testGraph.addEdge("C", "D", 2);
testGraph.addEdge("C", "B", 1);
testGraph.addEdge("D", "E", 3);

// Test cases
const testCases = [
  { start: "A", end: "E", expectedDistance: 6, expectedPath: ["A", "C", "B", "E"] },
  { start: "A", end: "D", expectedDistance: 4, expectedPath: ["A", "C", "D"] },
  { start: "B", end: "C", expectedDistance: 1, expectedPath: ["B", "C"] }
];

// Run tests
for (const test of testCases) {
  const result = dijkstra(testGraph, test.start, test.end);
  
  console.log(`Path from ${test.start} to ${test.end}:`);
  console.log(`  Expected distance: ${test.expectedDistance}, Got: ${result.distance}`);
  console.log(`  Expected path: ${test.expectedPath.join(" → ")}`);
  console.log(`  Actual path: ${result.path.join(" → ")}`);
  
  const passed = result.distance === test.expectedDistance && 
                 JSON.stringify(result.path) === JSON.stringify(test.expectedPath);
  
  console.log(`  Test ${passed ? "PASSED" : "FAILED"}`);
}







