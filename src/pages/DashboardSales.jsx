import React, { useState, useMemo } from "react";
import customersDummy from "../data/sales";
import "../styles/sales.css";

export default function SalesDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nik, setNik] = useState("");

  const [customers, setCustomers] = useState(customersDummy);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      `${c.name} ${c.nik} ${c.sales}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);

  const totalPages = Math.ceil(filteredCustomers.length / perPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredCustomers.slice(start, start + perPage);
  }, [currentPage, perPage, filteredCustomers]);

  const handleAddCustomer = () => {
    if (!nik) return alert("NIK tidak boleh kosong!");

    const newCustomer = {
      id: customers.length + 1,
      name: `Nasabah Baru ${customers.length + 1}`,
      nik,
      sales: "Sales Baru",
    };

    setCustomers([...customers, newCustomer]);
    setNik("");
    setModalOpen(false);
  };

  return (
    <div className="dashboard-wrapper">

      <h2 className="dashboard-title">Dashboard Sales</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="value">{customers.length}</div>
          <div className="label">Total Pelanggan</div>
        </div>

        <div className="summary-card">
          <div className="value">98%</div>
          <div className="label">Achievement Target</div>
        </div>

        <div className="summary-card">
          <div className="value">94%</div>
          <div className="label">Loans Ratio</div>
        </div>

        <div className="summary-card">
          <div className="value">2.5%</div>
          <div className="label">NPL Ratio</div>
        </div>
      </div>

      <div className="search-action-row">
        <input
          type="text"
          placeholder="Cari Nama / NIK / Sales..."
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button className="btn-add" onClick={() => setModalOpen(true)}>
          Tambah Nasabah
        </button>
      </div>

      <div className="table-card">

        <div className="table-header-row">
          <h3 className="table-title">List Nasabah</h3>

          <select
            className="page-select"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={10}>10 / halaman</option>
            <option value={20}>20 / halaman</option>
            <option value={50}>50 / halaman</option>
            <option value={100}>100 / halaman</option>
          </select>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Nasabah</th>
              <th>NIK</th>
              <th>Nama Sales</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.nik}</td>
                <td>{c.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Halaman {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Tambah Nasabah</h3>

            <label>NIK:</label>
            <input
              type="text"
              value={nik}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setNik(value);
              }}
              placeholder="Masukkan NIK"
              className="input-field"
            />

            <div className="modal-actions">
              <button className="btn-save" onClick={handleAddCustomer}>
                Simpan
              </button>
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
