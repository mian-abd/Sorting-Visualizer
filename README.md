# Sorting Algorithms Visualizer

A dynamic web application that helps visualize various sorting algorithms to better understand how they work and compare their performance.

**[Live Demo: ](https://mian-abd.github.io/Sorting-Visualizer/)**

## Features

- **Visualize 6 different sorting algorithms**
- **Adjust array size** - Test with different data sizes
- **Control animation speed** - Slow down or speed up to better understand the steps
- **Start/Pause functionality** - Pause at any moment to examine the current state
- **Real-time statistics** - Track comparisons, swaps, and elapsed time
- **Algorithm details** - View time/space complexity and step-by-step descriptions

## Algorithms Included

The visualizer includes the following sorting algorithms:

- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Divides array into sorted and unsorted parts
- **Insertion Sort** - Builds sorted array one item at a time
- **Merge Sort** - Divide and conquer algorithm with consistent performance
- **Quick Sort** - Efficient divide and conquer algorithm with pivot point
- **Heap Sort** - Uses a binary heap data structure with constant space

## Color Coding

The visualization uses a color-coding system to help understand the algorithm steps:

- **White** - Default unsorted bars
- **Red** - Elements being compared
- **Blue** - Elements being swapped
- **Orange** - Special elements (pivot in quicksort, minimum in selection sort)
- **Green** - Elements in their correct position/sorted

## Technologies Used

- React.js
- CSS3
- JavaScript ES6+

## Local Development

If you want to run the project locally:

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Further Documentation

For detailed technical information about the implementation, algorithm approaches, and code structure, please refer to the [Technical Documentation](./src/README.md). 