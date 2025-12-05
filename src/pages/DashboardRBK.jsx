import React, { useState } from "react";
import Swal from "sweetalert2";
import rbkUsersDummy from "../data/rbkUsers";
import "../styles/rbk.css";

export default function RBKDashboard() {
    const [users, setUsers] = useState(rbkUsersDummy);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState("");

    const leaders = ["Pak Andi", "Bu Sari", "Pak Hendra", "Bu Putri"];

    const updateStatus = (id, field) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, [field]: true } : u))
        );

        const label = {
            callVerif: "Verifikasi Call User",
            sdmVerif: "Verifikasi SDM",
            dukcapilVerif: "Verifikasi Dukcapil",
        };

        Swal.fire({
            icon: "success",
            title: `${label[field]} berhasil!`,
            timer: 1200,
            showConfirmButton: false,
        });
    };

    const handleSend = () => {
        if (!selectedLeader) {
            Swal.fire({
                icon: "warning",
                title: "Pilih pemimpin terlebih dahulu!",
                timer: 1200,
                showConfirmButton: false,
            });
            return;
        }

        setUsers((prev) =>
            prev.map((u) =>
                u.id === selectedUser.id ? { ...u, sentToLeader: true } : u
            )
        );

        Swal.fire({
            icon: "success",
            title: `Berhasil dikirim ke ${selectedLeader}`,
            timer: 1500,
            showConfirmButton: false,
        });

        setOpenModal(false);
        setSelectedLeader("");
    };

    return (
        <div className="rbk-wrapper">
            <h2 className="title">Dashboard RBK</h2>

            <div className="table-card">
                <table className="rbk-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Verif Call</th>
                            <th>Verif SDM</th>
                            <th>Verif Dukcapil</th>
                            <th>Kirim ke Pemimpin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => {
                            const allDone = u.callVerif && u.sdmVerif && u.dukcapilVerif;

                            return (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.nik}</td>

                                    <td>
                                        <button
                                            className={`btn ${u.callVerif ? "done" : ""}`}
                                            onClick={() => updateStatus(u.id, "callVerif")}
                                            disabled={u.callVerif}
                                        >
                                            {u.callVerif ? "Selesai" : "Verif Call"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn ${u.sdmVerif ? "done" : ""}`}
                                            onClick={() => updateStatus(u.id, "sdmVerif")}
                                            disabled={u.sdmVerif}
                                        >
                                            {u.sdmVerif ? "Selesai" : "Verif SDM"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn ${u.dukcapilVerif ? "done" : ""}`}
                                            onClick={() => updateStatus(u.id, "dukcapilVerif")}
                                            disabled={u.dukcapilVerif}
                                        >
                                            {u.dukcapilVerif ? "Selesai" : "Verif Dukcapil"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn send"
                                            disabled={!allDone}
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setOpenModal(true);
                                            }}
                                        >
                                            {u.sentToLeader ? "Dikirim" : "Kirim"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {openModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Pilih Pemimpin</h3>

                        <select
                            className="dropdown-select"
                            value={selectedLeader}
                            onChange={(e) => setSelectedLeader(e.target.value)}
                        >
                            <option value="">-- Pilih Pemimpin --</option>
                            {leaders.map((leader) => (
                                <option key={leader} value={leader}>
                                    {leader}
                                </option>
                            ))}
                        </select>

                        <div className="modal-actions">
                            <button className="btn-save" onClick={handleSend}>
                                Kirim
                            </button>
                            <button className="btn-cancel" onClick={() => setOpenModal(false)}>
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
