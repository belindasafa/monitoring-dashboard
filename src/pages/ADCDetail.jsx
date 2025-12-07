import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LeaderContext } from "../context/LeaderContext";
import "../styles/adcDetail.css";

export default function ADCDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, updateStatus } = useContext(LeaderContext);

    const user = users.find(u => u.id === parseInt(id));

    const [checklist, setChecklist] = useState({
        ktp: false,
        npwp: false,
        slipGaji: false,
        dokUsaha: false,
        slik: false,
        formKredit: false,
        tandaTangan: false
    });

    if (!user) {
        Swal.fire({
            icon: "error",
            title: "Data Tidak Ditemukan",
            confirmButtonColor: "#ff8800",
        });
        return <h2>Data Tidak Ditemukan</h2>;
    }

    const toggleChecklist = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isAllComplete = Object.values(checklist).every(v => v === true);

    const confirmADC = () => {
        if (!isAllComplete) {
            Swal.fire({
                icon: "warning",
                title: "Dokumen Belum Lengkap",
                text: "Semua kelengkapan dokumen wajib dipenuhi sebelum menyelesaikan ADC.",
                confirmButtonColor: "#ff8800",
            });
            return;
        }

        Swal.fire({
            title: "Selesaikan Proses ADC?",
            text: "Pastikan semua dokumen valid dan lengkap.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Selesaikan",
            cancelButtonText: "Batal",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
        }).then((res) => {
            if (res.isConfirmed) {
                updateStatus(user.id, "ADC Completed");

                Swal.fire({
                    icon: "success",
                    title: "Proses ADC Selesai!",
                    text: "Nasabah berhasil melewati proses ADC.",
                    timer: 1800,
                    showConfirmButton: false,
                });

                navigate("/dashboard-adc");
            }
        });
    };

    return (
        <div className="adc-detail-wrapper">
            <button className="btn-back" onClick={() => navigate(-1)}>⬅ Kembali</button>
            <h1 className="adc-title">Detail ADC — {user.name}</h1>
            <div className="adc-main-card">
                <h2>Informasi Utama</h2>

                <div className="adc-info-grid">
                    <p><strong>Nama:</strong> {user.name}</p>
                    <p><strong>NIK:</strong> {user.nik}</p>
                    <p><strong>Diasign Oleh:</strong> {user.assignedBy}</p>
                    <p><strong>Pekerjaan:</strong> {user.job}</p>
                    <p><strong>Penghasilan:</strong> Rp {user.income.toLocaleString()}</p>
                    <p><strong>Tanggungan:</strong> {user.dependents}</p>
                    <p><strong>Riwayat Kredit:</strong> {user.creditHistory}</p>
                    <p><strong>Outstanding Pinjaman:</strong> Rp {user.outstandingLoan.toLocaleString()}</p>
                    <p><strong>Saldo Tabungan:</strong> Rp {user.savingBalance.toLocaleString()}</p>
                    <p><strong>Rekomendasi Sistem:</strong> {user.systemRecommendation}</p>
                </div>
            </div>

            <div className="adc-card">
                <h2>Checklist Kelengkapan Dokumen</h2>

                {Object.keys(checklist).map((key) => (
                    <div
                        key={key}
                        className={`check-item ${checklist[key] ? "checked" : ""}`}
                        onClick={() => toggleChecklist(key)}
                    >
                        <span>{checklist[key] ? "✔️" : "⬜"}</span>
                        <p>{{
                            ktp: "KTP",
                            npwp: "NPWP",
                            slipGaji: "Slip Gaji / Mutasi Rekening",
                            dokUsaha: "Dokumen Usaha",
                            slik: "SLIK / BI Checking",
                            formKredit: "Formulir Kredit",
                            tandaTangan: "Tanda Tangan Elektronik"
                        }[key]}</p>
                    </div>
                ))}
            </div>

            <button
                className={`finish-btn ${isAllComplete ? "active" : ""}`}
                onClick={confirmADC}
            >
                ✔ Selesaikan Proses ADC
            </button>
        </div>
    );
}
