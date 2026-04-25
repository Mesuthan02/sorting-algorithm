export function selectionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let start = 0; start < array.length; start += 1) {
    let minIndex = start;

    for (let index = start + 1; index < array.length; index += 1) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [minIndex, index] });

      if (array[index] < array[minIndex]) {
        minIndex = index;
      }
    }

    if (minIndex !== start) {
      [array[start], array[minIndex]] = [array[minIndex], array[start]];
      swaps += 1;
      steps.push({
        type: 'swap',
        indices: [start, minIndex],
        values: [array[start], array[minIndex]],
      });
    }

    steps.push({ type: 'sorted', indices: [start] });
  }

  return { steps, comparisons, swaps };
}
