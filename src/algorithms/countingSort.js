export function countingSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  let swaps = 0;

  if (array.length === 0) {
    return { steps, comparisons: 0, swaps };
  }

  const min = Math.min(...array);
  const max = Math.max(...array);
  const counts = Array.from({ length: max - min + 1 }, () => 0);

  array.forEach((value, index) => {
    counts[value - min] += 1;
    steps.push({ type: 'compare', indices: [index, index] });
  });

  let writeIndex = 0;

  counts.forEach((count, offset) => {
    for (let amount = 0; amount < count; amount += 1) {
      const value = offset + min;
      array[writeIndex] = value;
      swaps += 1;
      steps.push({
        type: 'overwrite',
        indices: [writeIndex],
        values: [value],
      });
      steps.push({ type: 'sorted', indices: [writeIndex] });
      writeIndex += 1;
    }
  });

  return { steps, comparisons: inputArray.length, swaps };
}
