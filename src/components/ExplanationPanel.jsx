import React from "react";
function ExplanationPanel({ info }) {
  return (
    <section className="panel explanation-panel" aria-label="Algorithm explanation">
      <h2>{info.name}</h2>
      <p>{info.description}</p>
      <p className="best-for">{info.bestFor}</p>
    </section>
  );
}

export default ExplanationPanel;
