export function heapSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function swap(firstIndex, secondIndex) {
    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
    swaps += 1;
    steps.push({
      type: 'swap',
      indices: [firstIndex, secondIndex],
      values: [array[firstIndex], array[secondIndex]],
    });
  }

  function heapify(heapSize, rootIndex) {
    let largest = rootIndex;
    const left = rootIndex * 2 + 1;
    const right = rootIndex * 2 + 2;

    if (left < heapSize) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [left, largest] });
      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [right, largest] });
      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIndex) {
      swap(rootIndex, largest);
      heapify(heapSize, largest);
    }
  }

  for (let index = Math.floor(array.length / 2) - 1; index >= 0; index -= 1) {
    heapify(array.length, index);
  }

  for (let end = array.length - 1; end > 0; end -= 1) {
    swap(0, end);
    steps.push({ type: 'sorted', indices: [end] });
    heapify(end, 0);
  }

  if (array.length > 0) {
    steps.push({ type: 'sorted', indices: [0] });
  }

  return { steps, comparisons, swaps };
}
