'use client'
import { useEffect, useRef, useState } from "react";
import 'reactflow/dist/style.css';
import { bubblesort, 
  insertionSort, 
  linearSearch, 
  selectionSort, 
  binarySearch, 
  quickSort, 
  mergeSortHead, 
  treeDFS, 
  graphDFS, 
  treeBFS, 
  graphBFS, 
  dijkstra, 
  Graph,
  PriorityQueue
} from "./search";
import autoAnimate from "@formkit/auto-animate";
import { TreeNode } from "./search";


type algorithmCategory = 'array' | 'tree' | 'graph' | null;
type searchType = 'linear' | 'binary' | null;
type sortType = 'selection' | 'bubble' | 'quick' | 'merge' | 'insertion' | null;
type treeTraversalType = 'bfs' | 'dfs' | null;
type graphTraversalType = 'bfs' | 'dfs' | 'dijkstra' | null;

// Generic algorithm state that works for all algorithms
// todo: add recursive algorithms sort and graphs/trees traversals

interface AlgorithmState {
  currentArr: number[];
  currentIndex: number | undefined
  comparingIndex?: number;
  sortedIndices?: number[];
  foundIndex?: number; 
  isSearching?: boolean;
  targetValue?: number;
  keyValue?: number;

  //merge sort
  leftIndex?: number | null;
  rightIndex?: number | null;
  mergeIndex?: number | null;
  isMerging?: boolean;

  // quicksort
  leftArray?: number[];
  rightArray?: number[];
  pivotIndex?: number | null;
  pivotValue?: number | null;
  swapping?: boolean;
  isPartitioning?: boolean;
  depth?: number | null


  //trees
  visited?: number[];
  isLeaf?: boolean;
  parentValue?: number | null;
  currentNode?: TreeNode<number>
  stack?: TreeNode<number>[];

  // graph
  graphVisited?: Set<string>;
  neighbors?: string[];
  graph?: Graph;
  stackGraph?: string[];
  queue?: string[];
  queueGraph?: PriorityQueue<string>;
  shortestPath?: string[],
  distances?: Map<string, number>;
}

export default function Home() {
  const [arr, setArr] = useState([9,8,7,6,5,4,3,2,1]);
  const [history, setHistory] = useState<AlgorithmState[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [searchType, setalgorithmType] = useState<searchType>(null);
  const [sortType, setsortType] = useState<sortType>(null)
  const [searchTarget, setSearchTarget] = useState<number>(0);
  
  const animationParent = useRef(null)


  useEffect(() => { 
    animationParent.current && autoAnimate(animationParent.current)
  }, [animationParent])

  // if the user updates the array, generate all the frames for the new animation
  // and reset the animation frame
  useEffect(() => {
    const newHistory: AlgorithmState[] = []
    //pick SortType
    if (sortType) {
      switch(sortType) {
        case 'selection':
          selectionSort(arr, (state) => {
            const genericState: AlgorithmState = {
              currentArr: state.currentArr,
              currentIndex: state.currentPosition !== null ? state.currentPosition : 0,
              comparingIndex: state.currentPointer !== null ? state.currentPointer : undefined,
            };
            newHistory.push(genericState);
          });
          break;
        case 'bubble':
          bubblesort(arr, (state) => {
            const genericState: AlgorithmState = {
              currentArr: state.currentArr,
              currentIndex: state.currentPosition !== null ? state.currentPosition : 0,
              comparingIndex: state.currentPointer !== null ? state.currentPointer : undefined,
            };
            newHistory.push(genericState);
          });
          break;
        case 'insertion':
          insertionSort(arr, (state) => {
            let visualArr = [...state.currentArr];
            if (state.key !== null && state.leftIndex !== null) {
              visualArr = state.currentArr.slice();
            }
            
            const genericState: AlgorithmState = {
              currentArr: visualArr,
              currentIndex: state.currentPointer !== null ? state.currentPointer : 0,
              comparingIndex: state.leftIndex !== null ? state.leftIndex : undefined,
              keyValue: state.key !== null ? state.key : undefined
            };
            newHistory.push(genericState);
          });
          break;
        case 'quick':
        case 'quick':
          quickSort(arr, (state) => {
            const genericState: AlgorithmState = {
              currentArr: state.currentArray,
              currentIndex: state.leftIndex !== null ? state.leftIndex : undefined,
              comparingIndex: state.rightIndex !== null ? state.rightIndex : undefined,
              pivotIndex: state.pivotIndex,
              pivotValue: state.pivotValue,
              depth: state.depth
            };
            newHistory.push(genericState);
          });
          break;
        case 'merge':
          mergeSortHead(arr, (state) => {
            newHistory.push({
              currentArr: state.currentArray,
              leftArray: state.leftArray,
              rightArray: state.rightArray,
              currentIndex: state.mergeIndex !== null ? state.mergeIndex : undefined,
              comparingIndex: state.leftIndex !== null ? state.leftIndex : undefined,
              depth: state.depth,
              isMerging: state.isMerging
            });
          });
          break;
      }
    } else if (searchType) {
      switch(searchType) {
        case 'linear':
          linearSearch(searchTarget, arr, (state) => {
            const genericState: AlgorithmState = {
              currentArr: state.currentArr,
              currentIndex: state.currentPointer || 0,
              isSearching: true,
              targetValue: searchTarget,
            };
            newHistory.push(genericState);
          });
          break;

        case 'binary':
          binarySearch(searchTarget, arr, (state) => {
            const genericState: AlgorithmState = {
              currentArr: state.currentArr,
              currentIndex: state.middlePointer || 0,
              comparingIndex: state.leftPointer || 0,
              isSearching: true,
              targetValue: searchTarget,
            };
            newHistory.push(genericState);
          });
          break;
      }
    }
    setHistory(newHistory)
    setCurrentFrame(0)
    console.log("NEW HISTORY:", newHistory)
    console.log("NEW ARR:", arr)
  }, [arr, sortType, searchType])

  // animation loop -- each time there is a new incoming frame
  // run this function ONCE.
  useEffect(() => {
    console.log("I AM ANIMATING")
    // if we are on the final index, stop advancing frames.
    if (isPlaying && currentFrame < history.length - 1){
      setTimeout(() => setCurrentFrame(prev => prev+1), 100)
    }
    // if we are on the final frame, stop playing
    if (currentFrame >= history.length - 1){
      setIsPlaying(false)
    }
    console.log("CURRENT FRAME IS: ", currentFrame, "CURRENT HISTORY IS: ")
    console.log(history[currentFrame])
  }, [currentFrame, isPlaying, history])


  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex justify-center">Algorithm Visualizer</h1>

      {/* Algorithm Selection Section */}
      <div className="mb-6 flex flex-col items-center space-y-4">
        <div className="algorithm-type-selector space-x-4">
          <button
            onClick={() => {
              setsortType('selection');
              setalgorithmType(null);
            }}
            className={`px-6 py-3 rounded-lg border shadow-sm transition-all ${
              sortType !== null 
                ? 'bg-blue-600 text-white border-blue-700 shadow-blue-200' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Sorting Algorithms
          </button>
          <button
            onClick={() => {
              setalgorithmType('linear');
              setsortType(null);
            }}
            className={`px-6 py-3 rounded-lg border shadow-sm transition-all ${
              searchType !== null 
                ? 'bg-blue-600 text-white border-blue-700 shadow-blue-200' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Searching Algorithms
          </button>
        </div>
        
        {/* Algorithm Dropdown Section */}
        <div className="w-full max-w-md">
          {sortType !== null && (
            <select
              value={sortType}
              onChange={(e) => setsortType(e.target.value as sortType)}
              className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Sorting Algorithm</option>
              <option value="selection">Selection Sort</option>
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
          )}
          
          {searchType !== null && (
            <div className="flex space-x-4">
              <select
                value={searchType}
                onChange={(e) => setalgorithmType(e.target.value as searchType)}
                className="flex-1 px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Search Algorithm</option>
                <option value="linear">Linear Search</option>
                <option value="binary">Binary Search</option>
              </select>
              <input 
                type="number" 
                placeholder="Search target" 
                value={searchTarget}
                onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                className="w-32 px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Array Input Section */}
        <div className="w-full max-w-md">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Input Array</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={arr.join(', ')}
                onChange={(e) => {
                  const newArr = e.target.value
                    .split(/[,\s]+/)
                    .map(num => parseInt(num.trim()))
                    .filter(num => !isNaN(num));
                  if (newArr.length > 0) setArr(newArr);
                }}
                placeholder="Enter numbers separated by commas"
                className="flex-1 px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setArr([9,8,7,6,5,4,3,2,1])}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
            <p className="text-sm text-gray-500">Example: 9, 8, 7, 6, 5, 4, 3, 2, 1</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div ref={animationParent} className="flex items-end justify-center mb-8 h-64">
          {history[currentFrame]?.currentArr?.map((element: number, index: number) => {
            const isCurrentIndex = index === history[currentFrame]?.currentIndex;
            const isComparingIndex = index === history[currentFrame]?.comparingIndex;
            const isKeyElement = history[currentFrame]?.keyValue !== undefined && 
                               element === history[currentFrame]?.keyValue;
            
            let className = "w-16 mx-1 flex items-center justify-center text-white rounded-t-lg";
            
            if (isCurrentIndex) {
              className += " bg-green-500";
            } else if (isComparingIndex) {
              className += " bg-yellow-500";
            } else if (isKeyElement) {
              className += " bg-purple-500";
            } else {
              className += " bg-blue-500";
            }
            
            return (
              <div
                key={`${index}-${element}`} 
                className={className}
                style={{ height: `${element * 20}px` }}
              >
                {element}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            onClick={() => setIsPlaying(true)}
          >
            Sort
          </button>
          <button
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            onClick={() => setCurrentFrame(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
  