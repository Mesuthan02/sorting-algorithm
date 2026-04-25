export const algorithmInfo = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description:
      'Bubble Sort repeatedly compares neighboring values and swaps them when they are out of order. Larger values gradually move to the end of the array after each pass.',
    bestFor:
      'A simple first algorithm for learning comparisons and swaps, but not a practical choice for large lists.',
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description:
      'Selection Sort scans the unsorted section to find the smallest value, then places it at the front. Each pass locks one more value into its final position.',
    bestFor:
      'Useful for understanding minimum selection and in-place sorting, though it still compares many pairs.',
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description:
      'Insertion Sort builds a sorted section from left to right. Each new value is inserted into the correct place among the values already processed.',
    bestFor:
      'Great for small or nearly sorted arrays because it can finish quickly when few moves are needed.',
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description:
      'Merge Sort divides the array into smaller halves, sorts each half, and merges the halves back together in order.',
    bestFor:
      'A dependable divide-and-conquer algorithm with predictable performance, especially when stable sorting matters.',
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n) average, O(n^2) worst',
    spaceComplexity: 'O(log n) average',
    description:
      'Quick Sort chooses a pivot, moves smaller values to one side and larger values to the other, then sorts each side recursively.',
    bestFor:
      'Often very fast in practice because partitioning is efficient and most work happens in place.',
  },
  heap: {
    name: 'Heap Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description:
      'Heap Sort first builds a max heap, then repeatedly moves the largest value to the end and rebuilds the heap for the remaining values.',
    bestFor:
      'A strong in-place option when predictable O(n log n) performance is more important than stable ordering.',
  },
  shell: {
    name: 'Shell Sort',
    timeComplexity: 'Depends on gap sequence',
    spaceComplexity: 'O(1)',
    description:
      'Shell Sort is a generalized insertion sort. It compares values far apart first, then gradually reduces the gap until the final insertion-style pass.',
    bestFor:
      'Good for showing how reducing disorder early can make the final pass much cheaper than plain insertion sort.',
  },
  counting: {
    name: 'Counting Sort',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    description:
      'Counting Sort counts how often each value appears, then writes values back in order. It does not sort by comparing pairs of items.',
    bestFor:
      'Very efficient when values are integers in a limited range, like this visualizer uses for bar heights.',
  },
};
