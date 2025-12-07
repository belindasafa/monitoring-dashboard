import React from "react";
import "../styles/metrics.css";

export default function MetricsCards() {
  const cards = [
    { label: "Tabungan All", color: "green" },
    { label: "Giro All", color: "green" },
    { label: "Deposito All", color: "green" },
    { label: "Flexi", color: "green" },
    { label: "Griya", color: "green" },
    { label: "New CIF", color: "emerald" },
    { label: "CASA", color: "emerald" },
    { label: "Pra-NPL-P", color: "red" },
    { label: "Pra-NPL-K", color: "red" },
  ];

  return (
    <div className="mc-grid">
      {cards.map((c) => (
        <div key={c.label} className={`mc-card ${c.color}`}>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  );
}
