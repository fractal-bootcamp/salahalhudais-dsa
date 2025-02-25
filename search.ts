// Data Structures & Algorithms
class PriorityQueue<T> {
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

class Graph {
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
}

class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;

constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

class BinaryTree<T> {
  root: Node<T> | null = null;

  insert(value: T) {
    const newNode = new Node(value);
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
        // Value already exists
        return;
      }
    }
  }
}


function linearSearch(num: number, arr: number[]): number[] {
  let indices: number[] = [];
  arr.forEach((element, idx) => {
    if (element === num) {
      indices.push(idx);
    }
  });
  return indices;
}

console.log(linearSearch(3, [5,4,3,2,1,0,3,5,3,3]));

function binarySearch(num: number, arr: number[]): number {
  let start = 0, end = arr.length -1;
  while(start <= end) {
    console.log(start, end);
    let mid = Math.floor((end + start) / 2);
    console.log(mid);
    if (arr[mid] == num) return mid;
    if(num > arr[mid]) {
      start = mid + 1;
    } else if (num < arr[mid]) {
      end = mid -1;
    }
  }
  return -1;
}

console.log("Binary search for array:[1,2,3,4,5,7,8,19,20,21]:", binarySearch(19, [1,2,3,4,5,7,8,19,20,21]));


function bubblesort(arr: number[]): number[] {
  let newArr = arr.slice();
  
  for(let i = 0; i < newArr.length - 1; i++) {
    for(let j = 0; j < newArr.length - 1 - i; j++) {
      if (newArr[j] > newArr[j + 1]) {
        let temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
      }
    }
  }
  return newArr;
}

console.log("Bubble sort for ", [9,8,7,6,5,4,3], bubblesort([9,8,7,6,5,4,3]));


function selectionSort(arr:number[]): number[] {
  let newArr = arr.slice();
  for (let i = 0; i < newArr.length; i++) {
    let smallest = newArr[i];
    let idx = i;
    for(let j = i; j < newArr.length; j++) {
      if (newArr[j] < smallest) {
        smallest = newArr[j];
        idx = j;
      }
    }
     let temp = newArr[i];
      newArr[i] = newArr[idx];
      newArr[idx] = temp;
  }
  return newArr;
}
console.log("Selection Sort for ", [9,8,7,6,5,4,3], selectionSort([9,8,7,6,5,4,3]));


function insertionSort( arr: number[]): number[] {
  let newArr = arr.slice();
  for(let i = 1; i < newArr.length; i++) {
    let key = newArr[i];
    let j = i - 1;
    while(j >= 0 && newArr[j] > key) {
      newArr[j + 1] = newArr[j];
      j--;
    }

    newArr[j + 1] = key;
  }
  return newArr;
}

console.log("InsertionSort for ", [9,8,7,6,5,4,3], insertionSort([9,8,7,6,5,4,3]));

function combine(arr1: number[], arr2: number[]) {
  let i = 0, j = 0;
  let arr: number[] = [];
  while(i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      arr.push(arr1[i]);
      i++;
    } else if (arr2[j] < arr1[i]) {
      arr.push(arr2[j]);
      j++;
    }
  }

  while(i <arr1.length) {
    arr.push(arr1[i]);
    i++;
  }
  
  while(j < arr2.length) {
    arr.push(arr2[j]);
    j++;
  }
  return arr;
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  let left = arr.slice(0, Math.floor(arr.length / 2));
  let right = arr.slice(Math.floor(arr.length / 2));

  let l = mergeSort(left);
  let r = mergeSort(right);
  return combine(l,r);
}

console.log("mergeSort for ", [9,8,7,6,5,4,3], mergeSort([9,8,7,6,5,4,3]));

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];
  
  let left: number[] = [], right: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

let arr: number[] = [9,8,7,6,5,4,3]
console.log("quickSort for: [9,8,7,6,5,4,3]: ", quickSort(arr));

