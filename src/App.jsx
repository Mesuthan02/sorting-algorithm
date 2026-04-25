import React, { useCallback, useMemo, useRef, useState } from "react";
import { bubbleSort } from './algorithms/bubbleSort';
import { selectionSort } from './algorithms/selectionSort';
import { insertionSort } from './algorithms/insertionSort';
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import { heapSort } from './algorithms/heapSort';
import { shellSort } from './algorithms/shellSort';
import { countingSort } from './algorithms/countingSort';
import { algorithmInfo } from './algorithms/algorithmInfo';
import ControlPanel from './components/ControlPanel';
import ExplanationPanel from './components/ExplanationPanel';
import MetricsPanel from './components/MetricsPanel';
import Visualizer from './components/Visualizer';
import { generateArray } from './utils/generateArray';
import { createSortingSoundEngine } from './utils/sound';

const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
  shell: shellSort,
  counting: countingSort,
};

const DEFAULT_SIZE = 36;
const DEFAULT_SPEED = 58;

function createInitialMetrics(algorithmKey, size) {
  const info = algorithmInfo[algorithmKey];

  return {
    algorithmName: info.name,
    arraySize: size,
    comparisons: 0,
    swaps: 0,
    executionTime: 0,
    timeComplexity: info.timeComplexity,
    spaceComplexity: info.spaceComplexity,
  };
}

function App() {
  const [algorithmKey, setAlgorithmKey] = useState('bubble');
  const [arraySize, setArraySize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [array, setArray] = useState(() => generateArray(DEFAULT_SIZE));
  const [initialArray, setInitialArray] = useState(array);
  const [sortingState, setSortingState] = useState({
    compared: [],
    swapped: [],
    sorted: [],
  });
  const [metrics, setMetrics] = useState(() => createInitialMetrics('bubble', DEFAULT_SIZE));
  const [isSorting, setIsSorting] = useState(false);
  const arrayRef = useRef(array);
  const soundEngineRef = useRef(null);

  const selectedInfo = algorithmInfo[algorithmKey];
  const delay = useMemo(() => Math.max(8, 180 - speed * 1.7), [speed]);

  const prepareMetrics = useCallback((key, size) => {
    setMetrics(createInitialMetrics(key, size));
  }, []);

  const updateArray = (nextArray) => {
    arrayRef.current = nextArray;
    setArray(nextArray);
  };

  const getSoundEngine = () => {
    if (!soundEngineRef.current) {
      soundEngineRef.current = createSortingSoundEngine();
    }

    return soundEngineRef.current;
  };

  const handleAlgorithmChange = (nextAlgorithm) => {
    setAlgorithmKey(nextAlgorithm);
    prepareMetrics(nextAlgorithm, array.length);
    setSortingState({ compared: [], swapped: [], sorted: [] });
  };

  const handleGenerateArray = (size = arraySize) => {
    const nextArray = generateArray(size);
    updateArray(nextArray);
    setInitialArray(nextArray);
    setSortingState({ compared: [], swapped: [], sorted: [] });
    prepareMetrics(algorithmKey, size);
  };

  const handleArraySizeChange = (nextSize) => {
    setArraySize(nextSize);
    handleGenerateArray(nextSize);
  };

  const handleReset = () => {
    updateArray(initialArray);
    setSortingState({ compared: [], swapped: [], sorted: [] });
    prepareMetrics(algorithmKey, initialArray.length);
  };

  const runAnimationStep = (step) => {
    soundEngineRef.current?.playStep(step, arrayRef.current);

    if (step.type === 'compare') {
      setSortingState((state) => ({ ...state, compared: step.indices, swapped: [] }));
      return;
    }

    if (step.type === 'swap') {
      setArray((currentArray) => {
        const nextArray = [...currentArray];
        const [firstIndex, secondIndex] = step.indices;
        const [firstValue, secondValue] = step.values;
        nextArray[firstIndex] = firstValue;
        nextArray[secondIndex] = secondValue;
        arrayRef.current = nextArray;
        return nextArray;
      });
      setSortingState((state) => ({ ...state, compared: [], swapped: step.indices }));
      return;
    }

    if (step.type === 'overwrite') {
      setArray((currentArray) => {
        const nextArray = [...currentArray];
        nextArray[step.indices[0]] = step.values[0];
        arrayRef.current = nextArray;
        return nextArray;
      });
      setSortingState((state) => ({ ...state, compared: [], swapped: step.indices }));
      return;
    }

    if (step.type === 'sorted') {
      setSortingState((state) => ({
        compared: [],
        swapped: [],
        sorted: Array.from(new Set([...state.sorted, ...step.indices])),
      }));
    }
  };

  const handleStartSorting = async () => {
    const soundEngine = getSoundEngine();
    soundEngine.resume();
    setIsSorting(true);
    setSortingState({ compared: [], swapped: [], sorted: [] });

    const sort = algorithms[algorithmKey];
    const start = performance.now();
    const { steps, comparisons, swaps } = sort(array);
    const generationTime = performance.now() - start;

    setMetrics({
      algorithmName: selectedInfo.name,
      arraySize: array.length,
      comparisons,
      swaps,
      executionTime: generationTime,
      timeComplexity: selectedInfo.timeComplexity,
      spaceComplexity: selectedInfo.spaceComplexity,
    });

    for (const step of steps) {
      runAnimationStep(step);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setSortingState({
      compared: [],
      swapped: [],
      sorted: arrayRef.current.map((_, index) => index),
    });
    setIsSorting(false);
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Interactive learning tool</p>
          <h1>Sorting Algorithm Visualizer</h1>
          <p className="hero-copy">
            Explore how classic sorting algorithms compare, swap, and place values into order.
          </p>
        </div>
      </section>

      <section className="workspace">
        <ControlPanel
          algorithmKey={algorithmKey}
          arraySize={arraySize}
          speed={speed}
          isSorting={isSorting}
          onAlgorithmChange={handleAlgorithmChange}
          onGenerateArray={() => handleGenerateArray()}
          onReset={handleReset}
          onSizeChange={handleArraySizeChange}
          onSpeedChange={setSpeed}
          onStart={handleStartSorting}
        />

        <Visualizer array={array} sortingState={sortingState} />

        <div className="side-panels">
          <MetricsPanel metrics={metrics} />
          <ExplanationPanel info={selectedInfo} />
        </div>
      </section>
    </main>
  );
}

export default App;
