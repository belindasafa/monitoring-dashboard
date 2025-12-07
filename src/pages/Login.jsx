import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/login.css";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = form;

        if (!username || !password) {
            Swal.fire({
                icon: "warning",
                title: "Input tidak lengkap",
                text: "Username dan password harus diisi!",
                confirmButtonColor: "#FF8800",
            });
            return;
        }

        let role = null;
        if (username === "sales") role = "sales";
        else if (username === "rbk") role = "rbk";
        else if (username === "leader") role = "pemimpin";
        else if (username === "adc") role = "adc";
        else {
            Swal.fire({
                icon: "error",
                title: "Login gagal",
                text: "User tidak dikenal!",
                confirmButtonColor: "#d33",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Login berhasil!",
            timer: 1200,
            showConfirmButton: false,
        });

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("role", role);

        setTimeout(() => {
            if (role === "sales") navigate("/dashboard-sales");
            else if (role === "rbk") navigate("/dashboard-rbk");
            else if (role === "pemimpin") navigate("/dashboard-leader");
            else if (role === "adc") navigate("/dashboard-adc");
        }, 1200);
    };

    return (
        <div className="login-bg">
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>

            <div className="login-card glass">
                <img
                    src="src/assets/logo bni.png"
                    className="login-logo"
                />

                <h2 className="login-title">Selamat Datang</h2>
                <p className="login-subtitle">Silakan masuk ke akun Anda</p>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">🔒</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="login-btn-new">Login</button>
                </form>

                <p className="login-footer">© 2025 Bank BNI — All Rights Reserved</p>
            </div>
        </div>
    );
}