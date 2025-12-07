import React from "react";
import "../styles/progressSummary.css";

export default function ProgressSummary({ users }) {
  const total = users.length;

  const count = {
    salesInput: total,
    rbkVerif: users.filter(u => u.progress.rbkVerif).length,
    leaderApprove: users.filter(u => u.progress.leaderApprove).length,
    adcProcess: users.filter(u => u.progress.adcProcess).length,
  };

  const steps = [
    { key: "salesInput", label: "Sales Input" },
    { key: "rbkVerif", label: "Verifikasi RBK" },
    { key: "leaderApprove", label: "Approve Pemimpin" },
    { key: "adcProcess", label: "ADC Review" },
  ];

  const percent = (value) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="ps-card">
      <h3 className="ps-title">Progress Keseluruhan Pengajuan</h3>

      <div className="ps-list">
        {steps.map((s) => (
          <div key={s.key} className="ps-row">
            <div className="ps-row-header">
              <span className="ps-label">{s.label}</span>
              <span className="ps-value">
                {count[s.key]}/{total}
              </span>
            </div>

            <div className="ps-bar">
              <div
                className="ps-fill"
                style={{ width: `${percent(count[s.key])}%` }}
              ></div>
            </div>

            <div className="ps-percent">
              {percent(count[s.key])}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
