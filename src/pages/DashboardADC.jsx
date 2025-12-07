import React, { useContext, useMemo, useState } from "react";
import { LeaderContext } from "../context/LeaderContext";
import { useNavigate } from "react-router-dom";
import "../styles/adc.css";

export default function DashboardADC() {
    const { users } = useContext(LeaderContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const approvedUsers = users.filter(
        u => u.progress.leaderApprove === true
    );

    const filteredUsers = useMemo(() => {
        return approvedUsers.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.nik.includes(search)
        );
    }, [search, approvedUsers]);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredUsers.slice(start, start + rowsPerPage);
    }, [filteredUsers, currentPage, rowsPerPage]);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);
        if (currentPage > 3) pages.push("...");

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.push(i);
        }

        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="adc-wrapper">
            <h2 className="adc-title">Dashboard ADC</h2>
            <div className="adc-controls">
                <input
                    type="text"
                    placeholder="Cari Nama / NIK..."
                    value={search}
                    className="adc-search"
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
                </select>
            </div>
            <div className="adc-table-card">
                <table className="adc-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Status ADC</th>
                            <th>Detail</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.nik}</td>
                                <td>
                                    <span className={`adc-status ${u.progress.adcProcess ? "done" : "pending"}`}>
                                        {u.progress.adcProcess ? "Complete" : "Pending"}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn-detail"
                                        onClick={() => navigate(`/adc/detail/${u.id}`)}
                                    >
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
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

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
