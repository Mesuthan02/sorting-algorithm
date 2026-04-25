export function bubbleSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let pass = 0; pass < array.length - 1; pass += 1) {
    for (let index = 0; index < array.length - pass - 1; index += 1) {
      const nextIndex = index + 1;
      comparisons += 1;
      steps.push({ type: 'compare', indices: [index, nextIndex] });

      if (array[index] > array[nextIndex]) {
        [array[index], array[nextIndex]] = [array[nextIndex], array[index]];
        swaps += 1;
        steps.push({
          type: 'swap',
          indices: [index, nextIndex],
          values: [array[index], array[nextIndex]],
        });
      }
    }

    steps.push({ type: 'sorted', indices: [array.length - 1 - pass] });
  }

  if (array.length > 0) {
    steps.push({ type: 'sorted', indices: [0] });
  }

  return { steps, comparisons, swaps };
}
