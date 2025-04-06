# AlgoVision: Technical Implementation Details

This document provides in-depth technical information about the implementation of the sorting algorithms visualizer.

## Project Structure

The project follows a standard React application structure:
- `src/SortingVisualizer/` - Contains the main visualization component
- `src/App.js` - Entry point for the React application

## Algorithm Implementations

### Merge Sort
Merge Sort is implemented using a divide and conquer approach with the following steps:
1. The array is recursively divided into two halves until subarrays of size 1 are reached
2. The subarrays are then merged back together in sorted order
3. Animations track the comparisons and movements during the merge process

```javascript
// Pseudo-implementation
function mergeSort(array) {
    if (array.length <= 1) return array;
    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = mergeSort(array.slice(0, middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));
    return merge(firstHalf, secondHalf);
}
```

### Quick Sort
Quick Sort uses a pivot-based partitioning strategy:
1. A pivot element is selected (typically the rightmost element)
2. Elements are partitioned around the pivot
3. The partitioning process is recursively applied to the subarrays

### Heap Sort
Heap Sort builds a max heap from the input array and repeatedly extracts the maximum element:
1. Build a max heap from the unsorted array
2. Swap the root (maximum value) with the last element of the heap
3. Reduce the heap size by 1 and heapify the root
4. Repeat until the heap size becomes 1

### Bubble Sort
Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they're in the wrong order.

### Insertion Sort
Insertion Sort builds the final sorted array one element at a time by comparing each element with the previous elements and shifting as needed.

### Selection Sort
Selection Sort repeatedly finds the minimum element from the unsorted part of the array and moves it to the beginning of the unsorted section.

## Animation System

The animation system works as follows:
1. Each algorithm generates a sequence of animation steps
2. Each step includes information about which elements to compare, swap, or color
3. The animation controller plays these steps at the specified speed
4. DOM updates are batched for performance

## Performance Considerations

- The application uses React's state management for the array and animation states
- For large arrays, animations are optimized to minimize unnecessary DOM updates
- Time and space complexity tracking provides real-time insights into algorithm performance

## Customization Options

The visualizer offers several customization options:
- Array size adjustment (5-100 elements)
- Animation speed control (1-100)
- Pause/resume functionality during animations
- Real-time statistics tracking 