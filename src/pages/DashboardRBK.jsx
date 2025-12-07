import React, { useState, useMemo, useContext } from "react";
import Swal from "sweetalert2";
import "../styles/rbk.css";
import { LeaderContext } from "../context/LeaderContext";

export default function RBKDashboard() {

    const { users, updateStatus } = useContext(LeaderContext);

    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState("");

    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const leaders = ["Pak Andi", "Bu Sari", "Pak Hendra", "Bu Putri"];

    const filteredUsers = useMemo(() => {
        return users.filter(
            u =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.nik.includes(search)
        );
    }, [search, users]);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredUsers.slice(start, start + rowsPerPage);
    }, [filteredUsers, currentPage, rowsPerPage]);


    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 4) pages.push("...");

            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                if (i > 1 && i < totalPages) pages.push(i);
            }

            if (currentPage < totalPages - 3) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    const getStatusLabel = (u) => {
        const { callVerif, sdmVerif, dukcapilVerif } = u.progress;

        if (!callVerif && !sdmVerif && !dukcapilVerif)
            return { text: "Belum Verifikasi", class: "status-none" };

        if (callVerif && sdmVerif && dukcapilVerif)
            return { text: "Complete", class: "status-complete" };

        return { text: "Pending", class: "status-pending" };
    };

    const verifyField = (id, field) => {
        updateStatus(id, field);

        const label = {
            callVerif: "Verifikasi Call User",
            sdmVerif: "Verifikasi SDM",
            dukcapilVerif: "Verifikasi Dukcapil"
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

        updateStatus(selectedUser.id, "RBK Done", selectedLeader);

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

            <div className="rbk-controls">
                <input
                    type="text"
                    placeholder="Cari Nama / NIK..."
                    className="rbk-search"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <select
                    className="rows-select"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={10}>10 / halaman</option>
                    <option value={20}>20 / halaman</option>
                    <option value={50}>50 / halaman</option>
                    <option value={100}>100 / halaman</option>
                </select>
            </div>

            <div className="table-card">
                <table className="rbk-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Status Verifikasi</th>
                            <th>Verif Call</th>
                            <th>Verif SDM</th>
                            <th>Verif Dukcapil</th>
                            <th>Kirim ke Pemimpin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedUsers.map((u) => {
                            const status = getStatusLabel(u);
                            const done =
                                u.progress.callVerif &&
                                u.progress.sdmVerif &&
                                u.progress.dukcapilVerif;

                            return (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.nik}</td>

                                    <td>
                                        <span className={`verif-status ${status.class}`}>
                                            {status.text}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn ${u.progress.callVerif ? "done" : ""}`}
                                            onClick={() => verifyField(u.id, "callVerif")}
                                            disabled={u.progress.callVerif}
                                        >
                                            {u.progress.callVerif ? "Selesai" : "Verif Call"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn ${u.progress.sdmVerif ? "done" : ""}`}
                                            onClick={() => verifyField(u.id, "sdmVerif")}
                                            disabled={u.progress.sdmVerif}
                                        >
                                            {u.progress.sdmVerif ? "Selesai" : "Verif SDM"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className={`btn ${u.progress.dukcapilVerif ? "done" : ""}`}
                                            onClick={() => verifyField(u.id, "dukcapilVerif")}
                                            disabled={u.progress.dukcapilVerif}
                                        >
                                            {u.progress.dukcapilVerif ? "Selesai" : "Verif Dukcapil"}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn send"
                                            disabled={!done}
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setOpenModal(true);
                                            }}
                                        >
                                            {u.progress.rbkVerif ? "Dikirim" : "Kirim"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    {getPageNumbers().map((p, i) =>
                        p === "..." ? (
                            <span key={i} className="dots">...</span>
                        ) : (
                            <button
                                key={i}
                                className={currentPage === p ? "active" : ""}
                                onClick={() => setCurrentPage(p)}
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
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
