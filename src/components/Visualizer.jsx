import React from "react";
function Visualizer({ array, sortingState }) {
  const maxValue = Math.max(...array, 1);

  const getBarClassName = (index) => {
    const classes = ['bar'];

    if (sortingState.sorted.includes(index)) {
      classes.push('sorted');
    } else if (sortingState.swapped.includes(index)) {
      classes.push('swapped');
    } else if (sortingState.compared.includes(index)) {
      classes.push('compared');
    }

    return classes.join(' ');
  };

  return (
    <section className="visualizer panel" aria-label="Sorting visualization">
      <div className="bar-stage">
        {array.map((value, index) => (
          <div
            className={getBarClassName(index)}
            key={`${index}-${array.length}`}
            style={{ height: `${(value / maxValue) * 100}%` }}
            title={`Value ${value}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Visualizer;
