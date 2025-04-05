# Sorting Algorithms Implementation Approach

This project helps visualize various sorting algorithms to better understand how they work.

## How to Run

1. Clone this repository
2. Navigate to the sorting directory:
   ```
   cd sorting
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Algorithms Implemented
Each sorting algorithm is implemented as a separate component with visualization capabilities. The approach includes:
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

## Data Structure

The visualization uses an array of numbers, represented as bars with heights proportional to their values.

## Visualization Approach

The visualization uses an array of numbers, represented as bars with heights proportional to their values, using a simple color-coding system:

- White: Default unsorted bars
- Red: Elements being compared
- Blue: Elements being swapped
- Orange: Special elements (pivot in quicksort, minimum in selection sort)
- Green: Elements in their correct position/sorted

For detailed information about the approach and implementation of the sorting algorithms, please refer to the [Sorting Implementation Documentation](./sorting/README.md). 