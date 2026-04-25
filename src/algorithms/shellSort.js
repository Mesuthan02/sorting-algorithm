export function shellSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let index = gap; index < array.length; index += 1) {
      const currentValue = array[index];
      let position = index;

      while (position >= gap) {
        comparisons += 1;
        steps.push({ type: 'compare', indices: [position - gap, position] });

        if (array[position - gap] <= currentValue) {
          break;
        }

        array[position] = array[position - gap];
        swaps += 1;
        steps.push({
          type: 'overwrite',
          indices: [position],
          values: [array[position]],
        });
        position -= gap;
      }

      array[position] = currentValue;
      steps.push({
        type: 'overwrite',
        indices: [position],
        values: [currentValue],
      });
    }
  }

  steps.push({ type: 'sorted', indices: Array.from({ length: array.length }, (_, index) => index) });

  return { steps, comparisons, swaps };
}
