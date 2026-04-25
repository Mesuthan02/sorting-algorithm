import React from "react";
import { algorithmInfo } from '../algorithms/algorithmInfo';

function ControlPanel({
  algorithmKey,
  arraySize,
  speed,
  isSorting,
  onAlgorithmChange,
  onGenerateArray,
  onReset,
  onSizeChange,
  onSpeedChange,
  onStart,
}) {
  return (
    <section className="panel control-panel" aria-label="Sorting controls">
      <div className="control-group">
        <label htmlFor="algorithm">Algorithm</label>
        <select
          id="algorithm"
          value={algorithmKey}
          disabled={isSorting}
          onChange={(event) => onAlgorithmChange(event.target.value)}
        >
          {Object.entries(algorithmInfo).map(([key, info]) => (
            <option key={key} value={key}>
              {info.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <div className="range-heading">
          <label htmlFor="array-size">Array size</label>
          <span>{arraySize}</span>
        </div>
        <input
          id="array-size"
          type="range"
          min="10"
          max="100"
          value={arraySize}
          disabled={isSorting}
          onChange={(event) => onSizeChange(Number(event.target.value))}
        />
      </div>

      <div className="control-group">
        <div className="range-heading">
          <label htmlFor="speed">Animation speed</label>
          <span>{speed}</span>
        </div>
        <input
          id="speed"
          type="range"
          min="1"
          max="100"
          value={speed}
          disabled={isSorting}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
        />
      </div>

      <div className="button-grid">
        <button type="button" onClick={onGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button type="button" className="primary-button" onClick={onStart} disabled={isSorting}>
          Start Sorting
        </button>
        <button type="button" onClick={onReset} disabled={isSorting}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default ControlPanel;
