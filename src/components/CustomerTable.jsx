import React from "react";
import "../styles/leader-table.css";

export default function CustomerTable({
  data,
  search,
  setSearch,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  navigate,
  getPageNumbers,
}) {
  return (
    <div className="table-card">
      <div className="table-header-controls">
        <input
          type="text"
          className="table-search"
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
          {data.map((u) => (
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
  );
}
