import React, { useMemo } from "react";
import "../styles/progress.css";

export default function ProgressTracker({ progress, rejectedStep }) {
    const steps = [
        { key: "salesInput", label: "Sales Input" },
        { key: "rbkVerif", label: "Verifikasi RBK" },
        { key: "leaderApprove", label: "Approve Pemimpin" },
        { key: "adcProcess", label: "ADC Review" },
    ];

    const getStatus = (stepKey, index) => {
        if (rejectedStep === stepKey) return "rejected";
        if (progress[stepKey]) return "done";

        const firstFalse = steps.findIndex(s => !progress[s.key]);
        if (firstFalse === index) return "current";

        return "pending";
    };

    const progressWidth = useMemo(() => {
        let last = -1;

        steps.forEach((s, idx) => {
            if (progress[s.key] === true) last = idx;
        });
        if (last === steps.length - 1) return "100%";
        if (last === -1) return "5%";
        return ((last + 1) / steps.length) * 100 + "%";
    }, [progress]);

    return (
        <div className="pt-wrapper">
            <div className="pt-line">
                <div
                    className="pt-fill"
                    style={{ width: progressWidth }}
                ></div>
            </div>

            <div className="pt-steps">
                {steps.map((step, index) => {
                    const status = getStatus(step.key, index);
                    return (
                        <div className="pt-item" key={index}>
                            <div className={`pt-circle ${status}`}>
                                {status === "done" && "✓"}
                                {status === "current" && index + 1}
                                {status === "pending" && index + 1}
                                {status === "rejected" && "❌"}
                            </div>
                            <div className="pt-label">{step.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}