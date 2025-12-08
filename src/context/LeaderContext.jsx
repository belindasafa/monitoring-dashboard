import { createContext, useState } from "react";
import leaderUsers from "../data/leaderUsers";

export const LeaderContext = createContext();

export function LeaderProvider({ children }) {

    const [users, setUsers] = useState(leaderUsers);

    const updateStatus = (id, action, extra = "") => {
        setUsers(prev =>
            prev.map(user => {
                if (user.id !== id) return user;

                const updated = { ...user };
                updated.progress ??= {
                    salesInput: true,
                    rbkVerif: false,
                    leaderApprove: false,
                    adcProcess: false,
                    callVerif: false,
                    sdmVerif: false,
                    dukcapilVerif: false
                };

                updated.timeline ??= {
                    salesInputAt: new Date().toISOString(),
                    rbkVerifAt: null,
                    leaderApproveAt: null,
                    adcCompletedAt: null
                };

                updated.notifications ??= [];

                const pushNotif = (message, target) => {
                    const exists = updated.notifications.some(
                        n => n.message === message
                    );

                    if (!exists) {
                        updated.notifications.push({
                            id: Date.now(),
                            message,
                            target,
                            createdAt: new Date().toISOString()
                        });
                    }
                };

                if (action === "callVerif") {
                    updated.progress.callVerif = true;
                    return updated;
                }

                if (action === "sdmVerif") {
                    updated.progress.sdmVerif = true;
                    return updated;
                }

                if (action === "dukcapilVerif") {
                    updated.progress.dukcapilVerif = true;
                    return updated;
                }

                const allRBKDone =
                    updated.progress.callVerif &&
                    updated.progress.sdmVerif &&
                    updated.progress.dukcapilVerif;

                if (action === "RBK Done") {

                    updated.progress.callVerif = true;
                    updated.progress.sdmVerif = true;
                    updated.progress.dukcapilVerif = true;

                    updated.progress.rbkVerif = true;
                    updated.timeline.rbkVerifAt = new Date().toISOString();
                    updated.status = "Menunggu Approval Pemimpin";

                    pushNotif(
                        `RBK telah mengirim pengajuan untuk ${updated.name} ke ${extra}`,
                        ["pemimpin"]
                    );

                    return updated;
                }

                if (action === "Approved") {

                    updated.progress.leaderApprove = true;
                    updated.timeline.leaderApproveAt = new Date().toISOString();
                    updated.status = "Approved Leader";

                    pushNotif(
                        `Pemimpin telah menyetujui pengajuan ${updated.name}`,
                        ["rbk", "sales", "adc"]
                    );

                    return updated;
                }

                if (action === "Rejected") {

                    updated.progress.leaderApprove = false;
                    updated.timeline.leaderApproveAt = new Date().toISOString();
                    updated.status = "Rejected";

                    updated.rejectReason = extra;
                    updated.rejectedStep = "leaderApprove";

                    pushNotif(
                        `Pengajuan ${updated.name} ditolak. Alasan: ${extra}`,
                        ["sales", "rbk"]
                    );

                    return updated;
                }
                if (action === "ADC Completed") {

                    updated.progress.adcProcess = true;
                    updated.timeline.adcCompletedAt = new Date().toISOString();
                    updated.status = "ADC Completed";

                    pushNotif(
                        `ADC telah menyelesaikan proses kredit untuk ${updated.name}`,
                        ["pemimpin", "sales"]
                    );

                    return updated;
                }

                return updated;
            })
        );
    };

    return (
        <LeaderContext.Provider value={{ users, updateStatus }}>
            {children}
        </LeaderContext.Provider>
    );
}