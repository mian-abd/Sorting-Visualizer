import React from "react";
import './SortingVisualizer.css';

// GitHub Icon SVG component
const GitHubIcon = () => (
    <svg className="github-icon" height="20" width="20" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

// Algorithm information - complexities and descriptions
const algorithmInfo = {
    merge: {
        name: 'Merge Sort',
        description: 'A divide and conquer algorithm that divides the input array into two halves, recursively sorts them, then merges the sorted halves.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            percentages: { best: 60, average: 60, worst: 60 }
        },
        spaceComplexity: 'O(n)',
        spacePercentage: 100,
        stable: true,
        steps: [
            'Divide the array into two halves',
            'Recursively sort both halves',
            'Merge the sorted halves'
        ]
    },
    quick: {
        name: 'Quick Sort',
        description: 'A divide and conquer algorithm that picks an element as pivot and partitions the array around the pivot.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)',
            percentages: { best: 60, average: 60, worst: 100 }
        },
        spaceComplexity: 'O(log n)',
        spacePercentage: 60,
        stable: false,
        steps: [
            'Select a pivot element',
            'Partition array around pivot',
            'Recursively sort sub-arrays'
        ]
    },
    heap: {
        name: 'Heap Sort',
        description: 'A comparison-based sorting algorithm that uses a binary heap data structure.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            percentages: { best: 60, average: 60, worst: 60 }
        },
        spaceComplexity: 'O(1)',
        spacePercentage: 20,
        stable: false,
        steps: [
            'Build a max heap from the array',
            'Extract maximum element and place at end',
            'Reduce heap size and heapify root'
        ]
    },
    bubble: {
        name: 'Bubble Sort',
        description: 'A simple comparison algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if needed.',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            percentages: { best: 40, average: 100, worst: 100 }
        },
        spaceComplexity: 'O(1)',
        spacePercentage: 20,
        stable: true,
        steps: [
            'Compare adjacent elements',
            'Swap if they are in wrong order',
            'Repeat until no swaps needed'
        ]
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time by comparisons. Efficient for small data sets.',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            percentages: { best: 40, average: 100, worst: 100 }
        },
        spaceComplexity: 'O(1)',
        spacePercentage: 20,
        stable: true,
        steps: [
            'Start with second element',
            'Compare with elements before it',
            'Shift elements and insert in correct position'
        ]
    },
    selection: {
        name: 'Selection Sort',
        description: 'Divides the array into a sorted and unsorted part, repeatedly finding the minimum element from the unsorted part.',
        timeComplexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
            percentages: { best: 100, average: 100, worst: 100 }
        },
        spaceComplexity: 'O(1)',
        spacePercentage: 20,
        stable: false,
        steps: [
            'Find the minimum element in unsorted array',
            'Swap with the first element of unsorted part',
            'Move boundary of unsorted array by one'
        ]
    }
};

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
            arraySize: 50,
            speed: 50,
            isSorting: false,
            colors: [], // Stores the color of each bar
            isPaused: false,
            animations: [],
            currentAnimationStep: 0,
            sortedArray: [],
            currentAlgorithm: '', // Track which algorithm is currently running
            comparisons: 0,
            swaps: 0,
            elapsedTime: 0,
            sortingStartTime: null
        }
        this.animationController = null;
        this.timerInterval = null;
    }
    
    componentDidMount(){
        this.resetArray();
    }
    
    componentWillUnmount() {
        if (this.animationController) {
            clearTimeout(this.animationController);
        }
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
    
    resetArray(){
        if (this.animationController) {
            clearTimeout(this.animationController);
            this.animationController = null;
        }
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        const array = [];
        const colors = [];
        for(let i = 0; i < this.state.arraySize; i++){
            array.push(randomIntFromInterval(5, 350));
            colors.push('white'); // Default color for all bars
        }
        this.setState({
            array, 
            colors, 
            isSorting: false, 
            isPaused: false, 
            animations: [], 
            currentAnimationStep: 0,
            sortedArray: [],
            currentAlgorithm: '',
            comparisons: 0,
            swaps: 0,
            elapsedTime: 0,
            sortingStartTime: null
        });
    }
    
    handleArraySizeChange = (e) => {
        const size = parseInt(e.target.value);
        this.setState({arraySize: size}, this.resetArray);
    }
    
    handleSpeedChange = (e) => {
        this.setState({speed: parseInt(e.target.value)});
    }
    
    // Start timing for algorithms
    startTiming = () => {
        // Clear any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        const startTime = Date.now();
        this.setState({ sortingStartTime: startTime, elapsedTime: 0 });
        
        // Update elapsed time every 100ms
        this.timerInterval = setInterval(() => {
            if (this.state.isSorting && !this.state.isPaused) {
                const currentTime = Date.now();
                const elapsedTime = (currentTime - startTime) / 1000; // in seconds
                this.setState({ elapsedTime });
            }
        }, 100);
    }
    
    // Create a delay based on the speed setting
    sleep = (ms) => {
        return new Promise(resolve => {
            this.animationController = setTimeout(resolve, ms);
        });
    }
    
    // Update tracking stats for visualization
    updateStats = (isComparison, isSwap) => {
        let { comparisons, swaps } = this.state;
        
        if (isComparison) comparisons++;
        if (isSwap) swaps++;
        
        this.setState({ comparisons, swaps });
    }
    
    // Main function to execute merge sort with animation
    mergeSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'merge') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({
                isSorting: true, 
                isPaused: false, 
                currentAlgorithm: 'merge',
                comparisons: 0,
                swaps: 0
            }, resolve);
        });
        
        this.startTiming();
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        // Call the merge sort helper function to populate the animations array
        await this.mergeSortHelper(sortedArray, 0, sortedArray.length - 1, animations);
        
        // Mark all elements as in final position (green) when sort is complete
        const finalAnimation = [];
        for (let i = 0; i < sortedArray.length; i++) {
            finalAnimation.push({ index: i, color: 'green' });
        }
        animations.push(finalAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    // Helper function for merge sort that captures animations
    mergeSortHelper = async (array, startIdx, endIdx, animations) => {
        if (startIdx >= endIdx) return;
        
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        
        // Recursively sort left half
        await this.mergeSortHelper(array, startIdx, middleIdx, animations);
        
        // Recursively sort right half
        await this.mergeSortHelper(array, middleIdx + 1, endIdx, animations);
        
        // Merge the two halves
        await this.merge(array, startIdx, middleIdx, endIdx, animations);
    }
    
    // Merge function that handles merging subarrays and captures animations
    merge = async (array, startIdx, middleIdx, endIdx, animations) => {
        // Create temporary arrays
        const leftSize = middleIdx - startIdx + 1;
        const rightSize = endIdx - middleIdx;
        
        const leftArray = new Array(leftSize);
        const rightArray = new Array(rightSize);
        
        // Copy data to temporary arrays
        for (let i = 0; i < leftSize; i++) {
            leftArray[i] = array[startIdx + i];
        }
        for (let j = 0; j < rightSize; j++) {
            rightArray[j] = array[middleIdx + 1 + j];
        }
        
        // Merge the temp arrays back into the main array
        let i = 0; // Left array index
        let j = 0; // Right array index
        let k = startIdx; // Merged array index
        
        while (i < leftSize && j < rightSize) {
            // Elements being compared - highlight in red
            const comparisonAnimation = [
                { index: startIdx + i, color: 'red' },
                { index: middleIdx + 1 + j, color: 'red' }
            ];
            animations.push(comparisonAnimation);
            
            if (leftArray[i] <= rightArray[j]) {
                // Left element is smaller or equal, place it in the main array
                array[k] = leftArray[i];
                
                // Mark this element as sorted within its subarray (green)
                const placeAnimation = [{ index: k, value: leftArray[i], color: 'green' }];
                animations.push(placeAnimation);
                
                i++;
            } else {
                // Right element is smaller, place it in the main array
                array[k] = rightArray[j];
                
                // Mark this element as sorted within its subarray (green)
                const placeAnimation = [{ index: k, value: rightArray[j], color: 'green' }];
                animations.push(placeAnimation);
                
                j++;
            }
            k++;
        }
        
        // Copy remaining elements of leftArray if any
        while (i < leftSize) {
            array[k] = leftArray[i];
            
            // Mark this element as sorted within its subarray (green)
            const placeAnimation = [{ index: k, value: leftArray[i], color: 'green' }];
            animations.push(placeAnimation);
            
            i++;
            k++;
        }
        
        // Copy remaining elements of rightArray if any
        while (j < rightSize) {
            array[k] = rightArray[j];
            
            // Mark this element as sorted within its subarray (green)
            const placeAnimation = [{ index: k, value: rightArray[j], color: 'green' }];
            animations.push(placeAnimation);
            
            j++;
            k++;
        }
        
        // Check if this subarray is in its final sorted position
        if (startIdx === 0 && endIdx === array.length - 1) {
            // If this is the final merge of the entire array, elements will be in their final position
            const finalPositionAnimation = [];
            for (let i = startIdx; i <= endIdx; i++) {
                finalPositionAnimation.push({ index: i, color: 'green' });
            }
            animations.push(finalPositionAnimation);
        }
    }
    
    // Function to play the animations with proper timing
    playAnimations = async (animations, startStep, sortedArray) => {
        // Check if we should continue at all
        if (this.state.isPaused) return;
        
        // Clone the array to modify during animations
        let newArray = startStep === 0 ? [...this.state.array] : [...sortedArray];
        let newColors = [...this.state.colors];
        
        // Play each animation frame
        for (let i = startStep; i < animations.length; i++) {
            // Check again at each step if we should continue
            if (this.state.isPaused) {
                this.setState({ currentAnimationStep: i });
                return;
            }
            
            const animation = animations[i];
            
            // Update colors and values based on the animation
            for (let change of animation) {
                newColors[change.index] = change.color;
                
                // If the animation includes a value change, update the array
                if (change.value !== undefined) {
                    newArray[change.index] = change.value;
                }
            }
            
            // Update the state and wait for it to be applied
            await new Promise(resolve => {
                this.setState({ array: newArray, colors: newColors }, resolve);
            });
            
            // Calculate delay based on speed with enhanced scaling
            const delay = 500 / (this.state.speed * 2);
            
            // Wait before the next animation frame
            await this.sleep(delay);
        }
        
        // Animation completed
        if (!this.state.isPaused) {
            this.setState({ isSorting: false });
        }
    }
    
    // Placeholder for other sorting algorithms - to be implemented later
    quickSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'quick') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({isSorting: true, isPaused: false, currentAlgorithm: 'quick'}, resolve);
        });
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        // Call the quick sort helper function to populate the animations array
        await this.quickSortHelper(sortedArray, 0, sortedArray.length - 1, animations);
        
        // Mark all elements as in final position (green) when sort is complete
        const finalAnimation = [];
        for (let i = 0; i < sortedArray.length; i++) {
            finalAnimation.push({ index: i, color: 'green' });
        }
        animations.push(finalAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    // Helper function for quick sort that captures animations
    quickSortHelper = async (array, startIdx, endIdx, animations) => {
        if (startIdx >= endIdx) return;
        
        // Partition the array and get the pivot index
        const pivotIdx = await this.partition(array, startIdx, endIdx, animations);
        
        // Recursively sort the left and right subarrays
        await this.quickSortHelper(array, startIdx, pivotIdx - 1, animations);
        await this.quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
    
    // Partition function for quick sort
    partition = async (array, startIdx, endIdx, animations) => {
        // Choose the last element as the pivot
        const pivotValue = array[endIdx];
        
        // Highlight the pivot element in a distinctive color
        const pivotAnimation = [{ index: endIdx, color: 'orange' }];
        animations.push(pivotAnimation);
        
        // Index of smaller element
        let i = startIdx - 1;
        
        // Compare each element with pivot
        for (let j = startIdx; j < endIdx; j++) {
            // Elements being compared with the pivot
            const comparisonAnimation = [
                { index: j, color: 'red' },
                { index: endIdx, color: 'orange' } // Keep pivot highlighted
            ];
            animations.push(comparisonAnimation);
            
            // If current element is smaller than or equal to pivot
            if (array[j] <= pivotValue) {
                i++;
                
                // Swap elements
                if (i !== j) {
                    // Highlight elements being swapped
                    const swapHighlightAnimation = [
                        { index: i, color: 'blue' },
                        { index: j, color: 'blue' }
                    ];
                    animations.push(swapHighlightAnimation);
                    
                    // Perform the swap
                    const temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    
                    // Animate the swap
                    const swapAnimation = [
                        { index: i, value: array[i], color: 'green' },
                        { index: j, value: array[j], color: 'green' }
                    ];
                    animations.push(swapAnimation);
                } else {
                    // Element is already in correct position
                    const noSwapAnimation = [{ index: i, color: 'green' }];
                    animations.push(noSwapAnimation);
                }
            } else {
                // Current element is larger than pivot, don't swap
                const noActionAnimation = [{ index: j, color: 'white' }];
                animations.push(noActionAnimation);
            }
        }
        
        // Place pivot element in its correct position
        i++;
        if (i !== endIdx) {
            // Highlight elements being swapped (pivot and its final position)
            const pivotSwapHighlightAnimation = [
                { index: i, color: 'blue' },
                { index: endIdx, color: 'blue' }
            ];
            animations.push(pivotSwapHighlightAnimation);
            
            // Perform the swap
            const temp = array[i];
            array[i] = array[endIdx];
            array[endIdx] = temp;
            
            // Animate the swap
            const pivotSwapAnimation = [
                { index: i, value: array[i], color: 'green' },
                { index: endIdx, value: array[endIdx], color: 'white' }
            ];
            animations.push(pivotSwapAnimation);
        } else {
            // Pivot is already in the correct position
            const pivotCorrectAnimation = [{ index: endIdx, color: 'green' }];
            animations.push(pivotCorrectAnimation);
        }
        
        // Return the partition index
        return i;
    }
    
    bubbleSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'bubble') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({isSorting: true, isPaused: false, currentAlgorithm: 'bubble'}, resolve);
        });
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        // Bubble sort algorithm with animations
        const n = sortedArray.length;
        
        // For each pass
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            // Last i elements are already in place
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight elements being compared in red
                const comparisonAnimation = [
                    { index: j, color: 'red' },
                    { index: j + 1, color: 'red' }
                ];
                animations.push(comparisonAnimation);
                
                // If the element is greater than the next element, swap them
                if (sortedArray[j] > sortedArray[j + 1]) {
                    // Highlight elements being swapped in blue
                    const swapHighlightAnimation = [
                        { index: j, color: 'blue' },
                        { index: j + 1, color: 'blue' }
                    ];
                    animations.push(swapHighlightAnimation);
                    
                    // Perform the swap
                    const temp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = temp;
                    swapped = true;
                    
                    // Animate the swap and color them green (in correct position for this pass)
                    const swapAnimation = [
                        { index: j, value: sortedArray[j], color: 'green' },
                        { index: j + 1, value: sortedArray[j + 1], color: 'green' }
                    ];
                    animations.push(swapAnimation);
                } else {
                    // Elements are already in order for this comparison
                    const noSwapAnimation = [
                        { index: j, color: 'green' },
                        { index: j + 1, color: 'green' }
                    ];
                    animations.push(noSwapAnimation);
                }
            }
            
            // Mark the last element of this pass as in its final position (green)
            const finalPositionAnimation = [
                { index: n - i - 1, color: 'green' }
            ];
            animations.push(finalPositionAnimation);
            
            // If no elements were swapped in this pass, the array is sorted
            if (!swapped) {
                // Mark all remaining elements as in their final position
                const allSortedAnimation = [];
                for (let k = 0; k < n - i - 1; k++) {
                    allSortedAnimation.push({ index: k, color: 'green' });
                }
                if (allSortedAnimation.length > 0) {
                    animations.push(allSortedAnimation);
                }
                break;
            }
        }
        
        // Mark all elements as in final position (green) when sort is complete
        const finalAnimation = [];
        for (let i = 0; i < sortedArray.length; i++) {
            finalAnimation.push({ index: i, color: 'green' });
        }
        animations.push(finalAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    heapSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'heap') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({isSorting: true, isPaused: false, currentAlgorithm: 'heap'}, resolve);
        });
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        const n = sortedArray.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(sortedArray, n, i, animations);
        }
        
        // Extract elements from the heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end (largest element)
            
            // Highlight elements being swapped in blue
            const swapHighlightAnimation = [
                { index: 0, color: 'blue' },
                { index: i, color: 'blue' }
            ];
            animations.push(swapHighlightAnimation);
            
            // Swap first and last element
            const temp = sortedArray[0];
            sortedArray[0] = sortedArray[i];
            sortedArray[i] = temp;
            
            // Animate the swap
            const swapAnimation = [
                { index: 0, value: sortedArray[0], color: 'green' },
                { index: i, value: sortedArray[i], color: 'green' } // This element is now in its final position
            ];
            animations.push(swapAnimation);
            
            // Call heapify on the reduced heap
            await this.heapify(sortedArray, i, 0, animations);
        }
        
        // Mark the first element as sorted (green)
        const finalElementAnimation = [
            { index: 0, color: 'green' }
        ];
        animations.push(finalElementAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    // Heapify a subtree rooted at index i
    heapify = async (array, heapSize, rootIndex, animations) => {
        let largest = rootIndex; // Initialize largest as root
        const left = 2 * rootIndex + 1; // Left child
        const right = 2 * rootIndex + 2; // Right child
        
        // Visualize the root node we're examining
        const rootAnimation = [
            { index: rootIndex, color: 'orange' } // Highlight the current root
        ];
        animations.push(rootAnimation);
        
        // If left child exists and is larger than root
        if (left < heapSize) {
            // Show comparison between root and left child
            const leftComparisonAnimation = [
                { index: largest, color: 'red' },
                { index: left, color: 'red' }
            ];
            animations.push(leftComparisonAnimation);
            
            if (array[left] > array[largest]) {
                // Update largest
                const updateLargestAnimation = [
                    { index: largest, color: 'white' },
                    { index: left, color: 'orange' } // New largest
                ];
                animations.push(updateLargestAnimation);
                
                largest = left;
            } else {
                // Root is still largest
                const noChangeAnimation = [
                    { index: largest, color: 'orange' },
                    { index: left, color: 'white' }
                ];
                animations.push(noChangeAnimation);
            }
        }
        
        // If right child exists and is larger than largest so far
        if (right < heapSize) {
            // Show comparison between current largest and right child
            const rightComparisonAnimation = [
                { index: largest, color: 'red' },
                { index: right, color: 'red' }
            ];
            animations.push(rightComparisonAnimation);
            
            if (array[right] > array[largest]) {
                // Update largest
                const updateLargestAnimation = [
                    { index: largest, color: 'white' },
                    { index: right, color: 'orange' } // New largest
                ];
                animations.push(updateLargestAnimation);
                
                largest = right;
            } else {
                // Current largest is still largest
                const noChangeAnimation = [
                    { index: largest, color: 'orange' },
                    { index: right, color: 'white' }
                ];
                animations.push(noChangeAnimation);
            }
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest !== rootIndex) {
            // Highlight elements being swapped in blue
            const swapHighlightAnimation = [
                { index: rootIndex, color: 'blue' },
                { index: largest, color: 'blue' }
            ];
            animations.push(swapHighlightAnimation);
            
            // Swap
            const temp = array[rootIndex];
            array[rootIndex] = array[largest];
            array[largest] = temp;
            
            // Animate the swap
            const swapAnimation = [
                { index: rootIndex, value: array[rootIndex], color: 'green' },
                { index: largest, value: array[largest], color: 'green' }
            ];
            animations.push(swapAnimation);
            
            // Recursively heapify the affected sub-tree
            await this.heapify(array, heapSize, largest, animations);
        } else {
            // If no swap needed, mark current node as processed
            const processedAnimation = [
                { index: rootIndex, color: 'green' }
            ];
            animations.push(processedAnimation);
        }
    }
    
    stopSorting = () => {
        console.log("Sorting paused");
        this.setState({isPaused: true, isSorting: false});
        
        // Clear any pending animation timeouts
        if (this.animationController) {
            clearTimeout(this.animationController);
            this.animationController = null;
        }
    }
    
    // Insertion Sort
    insertionSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'insertion') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({isSorting: true, isPaused: false, currentAlgorithm: 'insertion'}, resolve);
        });
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        const n = sortedArray.length;
        
        // Mark the first element as sorted (green)
        const firstElementAnimation = [
            { index: 0, color: 'green' }
        ];
        animations.push(firstElementAnimation);
        
        // Start from the second element
        for (let i = 1; i < n; i++) {
            // Element to be inserted
            const key = sortedArray[i];
            
            // Highlight the current element to be inserted
            const currentElementAnimation = [
                { index: i, color: 'red' }
            ];
            animations.push(currentElementAnimation);
            
            // Start comparing with previous elements
            let j = i - 1;
            
            // Compare with each element in the sorted region
            while (j >= 0 && sortedArray[j] > key) {
                // Highlight elements being compared
                const comparisonAnimation = [
                    { index: j, color: 'red' },
                    { index: j + 1, color: 'red' }
                ];
                animations.push(comparisonAnimation);
                
                // Shift the element to the right
                sortedArray[j + 1] = sortedArray[j];
                
                // Animate the shift
                const shiftAnimation = [
                    { index: j + 1, value: sortedArray[j], color: 'blue' }
                ];
                animations.push(shiftAnimation);
                
                j--;
            }
            
            // Place the key in the correct position
            sortedArray[j + 1] = key;
            
            // Animate placing the key
            const placeKeyAnimation = [
                { index: j + 1, value: key, color: 'green' }
            ];
            animations.push(placeKeyAnimation);
            
            // Update all sorted elements to green
            const sortedRegionAnimation = [];
            for (let k = 0; k <= i; k++) {
                sortedRegionAnimation.push({ index: k, color: 'green' });
            }
            animations.push(sortedRegionAnimation);
        }
        
        // Mark all elements as in final position (green) when sort is complete
        const finalAnimation = [];
        for (let i = 0; i < sortedArray.length; i++) {
            finalAnimation.push({ index: i, color: 'green' });
        }
        animations.push(finalAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    // Selection Sort
    selectionSort = async () => {
        // If we're paused, resume from where we left off
        if (this.state.isPaused && this.state.animations.length > 0 && this.state.currentAlgorithm === 'selection') {
            // Use a callback to ensure state is updated before continuing
            await new Promise(resolve => {
                this.setState({isPaused: false, isSorting: true}, resolve);
            });
            
            await this.playAnimations(
                this.state.animations, 
                this.state.currentAnimationStep,
                this.state.sortedArray
            );
            return;
        }
        
        // For new sort, also use callback to ensure state is updated
        await new Promise(resolve => {
            this.setState({isSorting: true, isPaused: false, currentAlgorithm: 'selection'}, resolve);
        });
        
        // Create a copy of the array to avoid mutating the state directly
        const array = [...this.state.array];
        const sortedArray = [...array]; // Keep a copy for resuming
        const animations = [];
        
        const n = sortedArray.length;
        
        // One by one move boundary of unsorted subarray
        for (let i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            let minIdx = i;
            
            // Highlight current position as potential minimum
            const currentPosAnimation = [
                { index: i, color: 'orange' }
            ];
            animations.push(currentPosAnimation);
            
            // Find minimum element
            for (let j = i + 1; j < n; j++) {
                // Highlight elements being compared
                const comparisonAnimation = [
                    { index: minIdx, color: 'orange' },
                    { index: j, color: 'red' }
                ];
                animations.push(comparisonAnimation);
                
                if (sortedArray[j] < sortedArray[minIdx]) {
                    // Update old minimum to white
                    const updateMinAnimation = [
                        { index: minIdx, color: 'white' },
                        { index: j, color: 'orange' } // New minimum
                    ];
                    animations.push(updateMinAnimation);
                    
                    minIdx = j;
                } else {
                    // This element is not the minimum, revert to white
                    const notMinAnimation = [
                        { index: j, color: 'white' }
                    ];
                    animations.push(notMinAnimation);
                }
            }
            
            // Swap the found minimum element with the first element
            if (minIdx !== i) {
                // Highlight elements being swapped
                const swapHighlightAnimation = [
                    { index: i, color: 'blue' },
                    { index: minIdx, color: 'blue' }
                ];
                animations.push(swapHighlightAnimation);
                
                // Swap
                const temp = sortedArray[i];
                sortedArray[i] = sortedArray[minIdx];
                sortedArray[minIdx] = temp;
                
                // Animate the swap
                const swapAnimation = [
                    { index: i, value: sortedArray[i], color: 'green' },
                    { index: minIdx, value: sortedArray[minIdx], color: 'white' }
                ];
                animations.push(swapAnimation);
            } else {
                // If the minimum is already at the right place
                const alreadyInPlaceAnimation = [
                    { index: i, color: 'green' }
                ];
                animations.push(alreadyInPlaceAnimation);
            }
            
            // Show progress by marking sorted region
            const progressAnimation = [];
            for (let k = 0; k <= i; k++) {
                progressAnimation.push({ index: k, color: 'green' });
            }
            animations.push(progressAnimation);
        }
        
        // Mark the last element as in final position (green)
        const lastElementAnimation = [
            { index: n - 1, color: 'green' }
        ];
        animations.push(lastElementAnimation);
        
        // Store animations for potential pause/resume
        await new Promise(resolve => {
            this.setState({animations, sortedArray}, resolve);
        });
        
        // Play the animations
        await this.playAnimations(animations, 0, sortedArray);
    }
    
    // Helper method to get current algorithm details
    getCurrentAlgorithmInfo = () => {
        const { currentAlgorithm } = this.state;
        if (!currentAlgorithm) return algorithmInfo.merge; // Default to merge sort when none selected
        return algorithmInfo[currentAlgorithm];
    }
    
    // Method to render complexity bars
    renderComplexityBar = (percentage) => {
        return (
            <div className="complexity-bar">
                <div className="complexity-fill" style={{ width: `${percentage}%` }}></div>
            </div>
        );
    }
    
    render(){
        const {
            array, arraySize, speed, isSorting, isPaused, colors, 
            currentAlgorithm, comparisons, swaps, elapsedTime
        } = this.state;
        
        const currentAlgoInfo = this.getCurrentAlgorithmInfo();
        
        return (
            <div className="app-container">
                {/* Decorative elements */}
                <div className="decorative-element decoration-1"></div>
                <div className="decorative-element decoration-2"></div>
                <div className="decorative-element decoration-3"></div>
                
                {/* Top Navigation Bar */}
                <div className="top-nav">
                    <h1 className="app-logo">AlgoVision</h1>
                    <a 
                        href="https://github.com/mian-abd/Sorting-Visualizer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-button"
                    >
                        <GitHubIcon />
                        <span>View on GitHub</span>
                    </a>
                </div>
                
                <div className="main-content">
                    {/* Left side panel */}
                    <div className="side-panel left-panel">
                        <div className="algorithm-info">
                            <h3>{currentAlgoInfo.name || "Algorithm Info"}</h3>
                            <p>{currentAlgoInfo.description}</p>
                            
                            <div className="time-complexity">
                                <h4>Time Complexity</h4>
                                
                                <div className="complexity-label">
                                    <span>Best Case:</span>
                                    <span>{currentAlgoInfo.timeComplexity.best}</span>
                                </div>
                                {this.renderComplexityBar(currentAlgoInfo.timeComplexity.percentages.best)}
                                
                                <div className="complexity-label">
                                    <span>Average Case:</span>
                                    <span>{currentAlgoInfo.timeComplexity.average}</span>
                                </div>
                                {this.renderComplexityBar(currentAlgoInfo.timeComplexity.percentages.average)}
                                
                                <div className="complexity-label">
                                    <span>Worst Case:</span>
                                    <span>{currentAlgoInfo.timeComplexity.worst}</span>
                                </div>
                                {this.renderComplexityBar(currentAlgoInfo.timeComplexity.percentages.worst)}
                            </div>
                            
                            <div className="space-complexity">
                                <h4>Space Complexity</h4>
                                <div className="complexity-label">
                                    <span>Auxiliary Space:</span>
                                    <span>{currentAlgoInfo.spaceComplexity}</span>
                                </div>
                                {this.renderComplexityBar(currentAlgoInfo.spacePercentage)}
                            </div>
                            
                            <div className="algorithm-stability">
                                <h4>Stability</h4>
                                <p>{currentAlgoInfo.stable ? "Stable" : "Not Stable"}</p>
                            </div>
                        </div>
                        
                        <div className="step-tracker">
                            <h3>Algorithm Steps</h3>
                            {currentAlgoInfo.steps.map((step, index) => (
                                <div key={index} className={`step ${index === 0 ? 'active' : ''}`}>
                                    {index + 1}. {step}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Main visualization area */}
                    <div className="array-visualization">
                        <div className="array-container">
                            <div className="arrays">
                                <div className="bars">
                                    {array.map((value, index) => (
                                        <div 
                                            className="array-bar" 
                                            key={index} 
                                            style={{
                                                height: `${value}px`,
                                                width: `${Math.max(3, Math.floor(window.innerWidth / (arraySize * 5)))}px`,
                                                backgroundColor: colors[index] // Use the color from state
                                            }}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="controls-container">
                                <div className="slider-container">
                                    <div className="slider-group">
                                        <label>Array Size: {arraySize}</label>
                                        <input 
                                            type="range" 
                                            min="10" 
                                            max="100" 
                                            value={arraySize} 
                                            onChange={this.handleArraySizeChange}
                                            disabled={isSorting || isPaused}
                                            className="slider"
                                        />
                                    </div>
                                    
                                    <div className="slider-group">
                                        <label>Speed: {speed}</label>
                                        <input 
                                            type="range" 
                                            min="1" 
                                            max="100" 
                                            value={speed} 
                                            onChange={this.handleSpeedChange}
                                            className="slider"
                                        />
                                    </div>
                                </div>
                                
                                <div className="buttons-container">
                                    <div className="main-buttons">
                                        <button 
                                            onClick={() => this.resetArray()} 
                                            disabled={isSorting}
                                            className="primary-button"
                                        >
                                            Generate New Array
                                        </button>
                                        
                                        <button 
                                            onClick={this.stopSorting} 
                                            disabled={!isSorting}
                                            className="stop-button"
                                        >
                                            {isPaused ? "Paused" : "Stop"}
                                        </button>
                                    </div>
                                    
                                    <div className="algorithm-buttons">
                                        <button 
                                            onClick={this.mergeSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'merge')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'merge' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'merge' ? "Continue Merge Sort" : "Merge Sort"}
                                        </button>
                                        
                                        <button 
                                            onClick={this.quickSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'quick')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'quick' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'quick' ? "Continue Quick Sort" : "Quick Sort"}
                                        </button>
                                        
                                        <button 
                                            onClick={this.bubbleSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'bubble')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'bubble' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'bubble' ? "Continue Bubble Sort" : "Bubble Sort"}
                                        </button>
                                        
                                        <button 
                                            onClick={this.heapSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'heap')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'heap' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'heap' ? "Continue Heap Sort" : "Heap Sort"}
                                        </button>
                                        
                                        <button 
                                            onClick={this.insertionSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'insertion')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'insertion' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'insertion' ? "Continue Insertion Sort" : "Insertion Sort"}
                                        </button>
                                        
                                        <button 
                                            onClick={this.selectionSort} 
                                            disabled={(isSorting && !isPaused) || (isPaused && currentAlgorithm !== 'selection')}
                                            className={`algo-button ${isPaused && currentAlgorithm === 'selection' ? "resume-button" : ""}`}
                                        >
                                            {isPaused && currentAlgorithm === 'selection' ? "Continue Selection Sort" : "Selection Sort"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side panel */}
                    <div className="side-panel right-panel">
                        <div className="stats-container">
                            <h3>Sorting Statistics</h3>
                            
                            <div className="stat-item">
                                <span>Array Size:</span>
                                <span className="stat-value">{arraySize} elements</span>
                            </div>
                            
                            <div className="stat-item">
                                <span>Comparisons:</span>
                                <span className="stat-value">{comparisons}</span>
                            </div>
                            
                            <div className="stat-item">
                                <span>Swaps/Moves:</span>
                                <span className="stat-value">{swaps}</span>
                            </div>
                            
                            <div className="stat-item">
                                <span>Time Elapsed:</span>
                                <span className="stat-value">{elapsedTime.toFixed(2)} seconds</span>
                            </div>
                            
                            <div className="stat-item">
                                <span>Current Status:</span>
                                <span className="stat-value">
                                    {isSorting ? (isPaused ? "Paused" : "Sorting") : "Idle"}
                                </span>
                            </div>
                        </div>
                        
                        <div className="color-legend">
                            <h3>Color Legend</h3>
                            <div className="legend-item">
                                <span className="legend-color" style={{backgroundColor: 'white'}}></span>
                                <span>Unsorted Element</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{backgroundColor: 'red'}}></span>
                                <span>Currently Comparing</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{backgroundColor: 'blue'}}></span>
                                <span>Swapping Elements</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{backgroundColor: 'green'}}></span>
                                <span>Sorted Position</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{backgroundColor: 'orange'}}></span>
                                <span>Pivot/Special Element</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="footer">
                    <div className="footer-content">
                        <div className="creator-info">
                            Created by <a href="https://www.linkedin.com/in/mian-abdullah-91639a221/" target="_blank" rel="noopener noreferrer" className="creator-link">Mian Abdullah</a>
                        </div>
                        <div className="tagline">
                            Visualize & understand sorting algorithms
                        </div>
                        <div className="copyright">
                            © 2025 AlgoVision - A Sorting Algorithm Visualization Tool
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
