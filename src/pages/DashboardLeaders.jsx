import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LeaderContext } from "../context/LeaderContext";
import "../styles/leader.css";

export default function LeaderDashboard() {
  const navigate = useNavigate();
  const { users } = useContext(LeaderContext);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const metricColors = {
    "Tabungan All": "blue",
    "Giro All": "green",
    "Deposito All": "orange",
    Flexi: "purple",
    Griya: "yellow",
    "Pra-NPL-P": "red",
    "Pra-NPL-K": "red",
    "New CIF": "teal",
    CASA: "brown",
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.nik.includes(search) ||
        u.assignedBy.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 4) pages.push("...");

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="leader-wrapper">
      <h2 className="title">Dashboard Pemimpin</h2>

      <div className="metrics-grid">
        {Object.keys(metricColors).map((m) => (
          <div key={m} className={`metric-card ${metricColors[m]}`}>
            {m}
          </div>
        ))}
      </div>

      <div className="top-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Cari Nama / NIK / Assign By..."
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
        <table className="leader-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>Assign By</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.nik}</td>
                <td>{u.assignedBy}</td>
                <td>
                  <span className={`status ${u.status.toLowerCase()}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-detail"
                    onClick={() => navigate(`/leader/detail/${u.id}`)}
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
