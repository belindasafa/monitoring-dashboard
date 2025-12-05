import React, { useState, useEffect, useRef } from "react";
import "../styles/topbar.css";

export default function Topbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="topbar">
            <div className="topbar-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/70/Bank_Negara_Indonesia_logo.svg"
                    alt="BNI Logo"
                    className="bni-logo"
                />

                <div className="nav-menu">
                    <a className="active">Bank Performance</a>
                    <a>Monitoring KC</a>
                    <a>Monitoring KCP</a>
                    <a>Customer</a>
                    <a>Financial Reports</a>
                </div>
            </div>

            {/* FIX STRUCTURE */}
            <div className="topbar-right">
                <div className="user-wrapper" ref={ref}>
                    <div
                        className="user-info"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <img src="https://i.pravatar.cc/100" className="user-photo" />
                        <div className="user-text">
                            <div className="user-name">Ulian Faradiba</div>
                            <div className="user-id">1927625</div>
                        </div>
                    </div>

                    {/* Dropdown SELALU berada DI DALAM user-wrapper */}
                    <div className={`dropdown-menu ${openMenu ? "show" : ""}`}>
                        <div className="dropdown-item">Profile</div>
                        <div className="dropdown-item logout">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
