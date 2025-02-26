'use client'
import { useEffect, useRef, useState } from "react";
import 'reactflow/dist/style.css';
import { bubblesort, 
  insertionSort, 
  linearSearch, 
  selectionSort, 
  binarySearch, 
  quickSort, 
  mergeSort, 
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
  currentIndex: number;
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
  depth?: boolean | null;


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
          quickSort(arr, (state) => {
            let visualArr = [...state.currentArray];
            if (state.!== null && state.leftIndex !== null) {
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Array Visualization</h1>

      <div>
        <div className="algorithm-type-selector">
          <button
            onClick={() => {
              setsortType('selection');
              setalgorithmType(null);
            }}
            className={sortType !== null ? 'active' : ""}
          >Sorting</button>
          <button
            onClick={() => {
              setalgorithmType('linear');
              setsortType(null);
            }}
            className={searchType !== null ? 'active' : ""}
            >
              Searching
            </button>
        </div>
          
        {sortType !== null && (
          <select
          value={sortType}
          onChange={(e) => setsortType(e.target.value as sortType)}
          >
            <option value="selection">Selection Sort</option>
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        )}
        
        {searchType !== null && (
          <>
          <select
            value={searchType}
            onChange={(e) => setalgorithmType(e.target.value as searchType)}
          >
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>
          <input 
          type="number" 
          placeholder="Search target" 
          value={searchTarget}
          onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}/>
          </>
        )}
      </div>x

      <div ref={animationParent} className="flex items-end mb-8">
        {history[currentFrame]?.currentArr?.map((element: number, index: number) => {
          const isCurrentIndex = index === history[currentFrame]?.currentIndex;
          const isComparingIndex = index === history[currentFrame]?.comparingIndex;
          const isKeyElement = history[currentFrame]?.keyValue !== undefined && 
                               element === history[currentFrame]?.keyValue;
          
          let className = "w-10 mr-1 flex items-center justify-center text-white";
          
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
        <button
         
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsPlaying(true)}
        >
          Sort
        </button>
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setCurrentFrame(0)}
        >
          Reset
        </button>
      </div>
      <div className="border rounded p-4">
        <h2 className="text-xl font-bold mb-4">Algorithm Flow</h2>
      </div>
    </div>
  );
}
