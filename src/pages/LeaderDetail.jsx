import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LeaderContext } from "../context/LeaderContext";
import ProgressTracker from "../components/ProgressTracker";
import "../styles/leaderDetail.css";

export default function LeaderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateStatus } = useContext(LeaderContext);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const found = users.find(u => u.id === parseInt(id));
    setCurrentUser(found);
  }, [users, id]);

  if (!currentUser) return <h2>Loading...</h2>;

  const approve = () => {
    updateStatus(currentUser.id, "Approved");

    Swal.fire({
      icon: "success",
      title: "Berhasil Approve!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const reject = () => {
    Swal.fire({
      title: "Alasan Reject",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((res) => {
      if (res.isConfirmed) {
        updateStatus(currentUser.id, "Rejected", res.value);

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
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>⬅ Kembali</button>

      <h1 className="detail-title">Detail Nasabah</h1>
      <h3 className="progress-title">Progress Pengajuan</h3>
      <ProgressTracker
        progress={currentUser.progress}
        rejectedStep={currentUser.rejectedStep}
      />

      <div className="detail-container">
        <div className="detail-card">
          <h2>Data Kredit</h2>

          <div className="detail-grid">
            <div className="detail-row"><span className="detail-label">Nama:</span>
              <span className="detail-value">{currentUser.name}</span></div>

            <div className="detail-row"><span className="detail-label">NIK:</span>
              <span className="detail-value">{currentUser.nik}</span></div>

            <div className="detail-row"><span className="detail-label">Diasign Oleh:</span>
              <span className="detail-value">{currentUser.assignedBy}</span></div>

            <div className="detail-row"><span className="detail-label">Penghasilan:</span>
              <span className="detail-value">Rp {currentUser.income.toLocaleString()}</span></div>

            <div className="detail-row"><span className="detail-label">Pekerjaan:</span>
              <span className="detail-value">{currentUser.job}</span></div>

            <div className="detail-row"><span className="detail-label">Lama Bekerja:</span>
              <span className="detail-value">{currentUser.workLength} tahun</span></div>

            <div className="detail-row"><span className="detail-label">Tanggungan:</span>
              <span className="detail-value">{currentUser.dependents}</span></div>

            <div className="detail-row"><span className="detail-label">Riwayat Kredit:</span>
              <span className="detail-value">{currentUser.creditHistory}</span></div>

            <div className="detail-row"><span className="detail-label">Outstanding Pinjaman:</span>
              <span className="detail-value">Rp {currentUser.outstandingLoan.toLocaleString()}</span></div>

            <div className="detail-row"><span className="detail-label">Saldo Tabungan:</span>
              <span className="detail-value">Rp {currentUser.savingBalance.toLocaleString()}</span></div>

            <div className="detail-row"><span className="detail-label">Skor Kredit:</span>
              <span className="detail-value">{currentUser.creditScore}</span></div>

            <div className="detail-row"><span className="detail-label">Rekomendasi Sistem:</span>
              <span className="detail-value">{currentUser.systemRecommendation}</span></div>
          </div>

          <div className="detail-actions">
            <button className="approve" onClick={approve}>Approve</button>
            <button className="reject" onClick={reject}>Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}
