import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LeaderContext } from "../context/LeaderContext";
import "../styles/leaderDetail.css";

export default function LeaderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateStatus } = useContext(LeaderContext);

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return <h2>Data tidak ditemukan</h2>;

  const handleApprove = () => {
    updateStatus(user.id, "Approved");

    Swal.fire({
      icon: "success",
      title: "Nasabah berhasil di-approve!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Alasan Reject",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((res) => {
      if (res.isConfirmed) {
        updateStatus(user.id, "Rejected", res.value);
        Swal.fire({
          icon: "success",
          title: "Reject berhasil!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="detail-wrapper">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ⬅ Kembali
      </button>

      <h2>Detail Nasabah</h2>

      <div className="detail-card">
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>NIK:</strong> {user.nik}</p>
        <p><strong>Diasign Oleh:</strong> {user.assignedBy}</p>

        <hr />

        <h3>Data Kredit</h3>

        <p><strong>Penghasilan:</strong> Rp {user.income.toLocaleString()}</p>
        <p><strong>Pekerjaan:</strong> {user.job}</p>
        <p><strong>Lama Bekerja:</strong> {user.workLength} tahun</p>
        <p><strong>Tanggungan:</strong> {user.dependents}</p>
        <p><strong>Riwayat Kredit:</strong> {user.creditHistory}</p>
        <p><strong>Outstanding Pinjaman:</strong> Rp {user.outstandingLoan.toLocaleString()}</p>
        <p><strong>Saldo Tabungan:</strong> Rp {user.savingBalance.toLocaleString()}</p>
        <p><strong>Skor Kredit:</strong> {user.creditScore}</p>
        <p><strong>Rekomendasi Sistem:</strong> {user.systemRecommendation}</p>

        <div className="detail-actions">
          <button className="approve" onClick={handleApprove}>Approve</button>
          <button className="reject" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
}
