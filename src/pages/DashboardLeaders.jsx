import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LeaderContext } from "../context/LeaderContext";
import "../styles/leader.css";
import MetricsCards from "../components/MetricsCards";
import ProgressSummary from "../components/ProgressSummary";
import CustomerTable from "../components/CustomerTable";

export default function LeaderDashboard() {
  const navigate = useNavigate();
  const { users } = useContext(LeaderContext);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const metricColors = {
    "Tabungan All": "green",
    "Giro All": "green",
    "Deposito All": "green",
    Flexi: "green",
    Griya: "green",
    "Pra-NPL-P": "red",
    "Pra-NPL-K": "red",
    "New CIF": "green",
    CASA: "green",
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

      <MetricsCards />

      <ProgressSummary users={users} />

      <CustomerTable
        data={paginatedData}
        search={search}
        setSearch={setSearch}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        navigate={navigate}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );

}
