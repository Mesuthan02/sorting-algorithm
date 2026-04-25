export function insertionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({ type: 'sorted', indices: [0] });

  for (let index = 1; index < array.length; index += 1) {
    const key = array[index];
    let position = index - 1;

    while (position >= 0) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [position, position + 1] });

      if (array[position] <= key) {
        break;
      }

      array[position + 1] = array[position];
      swaps += 1;
      steps.push({
        type: 'overwrite',
        indices: [position + 1],
        values: [array[position + 1]],
      });
      position -= 1;
    }

    array[position + 1] = key;
    steps.push({
      type: 'overwrite',
      indices: [position + 1],
      values: [key],
    });
    steps.push({ type: 'sorted', indices: Array.from({ length: index + 1 }, (_, item) => item) });
  }

  return { steps, comparisons, swaps };
}
