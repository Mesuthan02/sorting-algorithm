import React from "react";
function MetricsPanel({ metrics }) {
  const metricRows = [
    ['Algorithm', metrics.algorithmName],
    ['Array size', metrics.arraySize],
    ['Comparisons', metrics.comparisons],
    ['Swaps / writes', metrics.swaps],
    ['Execution time', `${metrics.executionTime.toFixed(2)} ms`],
    ['Time complexity', metrics.timeComplexity],
    ['Space complexity', metrics.spaceComplexity],
  ];

  return (
    <section className="panel" aria-label="Performance metrics">
      <h2>Performance</h2>
      <dl className="metrics-list">
        {metricRows.map(([label, value]) => (
          <div className="metric-row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default MetricsPanel;
