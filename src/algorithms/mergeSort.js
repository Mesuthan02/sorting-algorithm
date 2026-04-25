export function mergeSort(inputArray) {
  const array = [...inputArray];
  const auxiliary = [...inputArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function merge(start, middle, end) {
    let left = start;
    let right = middle + 1;
    let current = start;

    for (let index = start; index <= end; index += 1) {
      auxiliary[index] = array[index];
    }

    while (left <= middle && right <= end) {
      comparisons += 1;
      steps.push({ type: 'compare', indices: [left, right] });

      if (auxiliary[left] <= auxiliary[right]) {
        array[current] = auxiliary[left];
        steps.push({ type: 'overwrite', indices: [current], values: [auxiliary[left]] });
        left += 1;
      } else {
        array[current] = auxiliary[right];
        swaps += 1;
        steps.push({ type: 'overwrite', indices: [current], values: [auxiliary[right]] });
        right += 1;
      }

      current += 1;
    }

    while (left <= middle) {
      array[current] = auxiliary[left];
      steps.push({ type: 'overwrite', indices: [current], values: [auxiliary[left]] });
      left += 1;
      current += 1;
    }

    while (right <= end) {
      array[current] = auxiliary[right];
      steps.push({ type: 'overwrite', indices: [current], values: [auxiliary[right]] });
      right += 1;
      current += 1;
    }

    if (end - start === array.length - 1) {
      steps.push({ type: 'sorted', indices: Array.from({ length: array.length }, (_, index) => index) });
    }
  }

  function divide(start, end) {
    if (start >= end) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    divide(start, middle);
    divide(middle + 1, end);
    merge(start, middle, end);
  }

  divide(0, array.length - 1);

  return { steps, comparisons, swaps };
}
