export function quickSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function swap(firstIndex, secondIndex) {
    if (firstIndex === secondIndex) {
      return;
    }

    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
    swaps += 1;
    steps.push({
      type: 'swap',
      indices: [firstIndex, secondIndex],
      values: [array[firstIndex], array[secondIndex]],
    });
  }

  function partition(low, high) {
    const pivot = array[high];
    let pivotIndex = low;

    for (let index = low; index < high; index += 1) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [index, high] });

      if (array[index] < pivot) {
        swap(index, pivotIndex);
        pivotIndex += 1;
      }
    }

    swap(pivotIndex, high);
    steps.push({ type: 'sorted', indices: [pivotIndex] });
    return pivotIndex;
  }

  function sort(low, high) {
    if (low > high) {
      return;
    }

    if (low === high) {
      steps.push({ type: 'sorted', indices: [low] });
      return;
    }

    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, array.length - 1);
  steps.push({ type: 'sorted', indices: Array.from({ length: array.length }, (_, index) => index) });

  return { steps, comparisons, swaps };
}
