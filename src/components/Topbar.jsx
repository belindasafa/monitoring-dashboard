import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";
import "../styles/topbar.css";

export default function Topbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);

    const menuRef = useRef();
    const notifRef = useRef();
    const navigate = useNavigate();

    const role = sessionStorage.getItem("role");
    const { getNotificationsForRole } = useContext(NotificationContext);

    const notifications = getNotificationsForRole(role);
    const unreadCount = notifications.length;

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target))
                setOpenMenu(false);

            if (notifRef.current && !notifRef.current.contains(e.target))
                setOpenNotif(false);
        };
        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="topbar">
            <div className="topbar-left">
                <img src="src/assets/logo bni.png" className="bni-logo" />
            </div>

            <div className="topbar-right">
                <div className="notif-wrapper" ref={notifRef}>
                    <div
                        className="notif-icon"
                        onClick={() => setOpenNotif(!openNotif)}
                    >
                        🔔
                        {unreadCount > 0 && (
                            <span className="notif-badge">{unreadCount}</span>
                        )}
                    </div>

                    <div className={`notif-dropdown ${openNotif ? "show" : ""}`}>
                        <h4 className="notif-title">Notifikasi</h4>

                        {notifications.length === 0 ? (
                            <div className="notif-empty">Tidak ada notifikasi</div>
                        ) : (
                            notifications.map((n) => (
                                <div className="notif-item" key={n.id}>
                                    <div className="notif-msg">{n.message}</div>
                                    <div className="notif-time">
                                        {new Date(n.createdAt).toLocaleString("id-ID")}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="user-wrapper" ref={menuRef}>
                    <div
                        className="user-info"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <img src="https://i.pravatar.cc/100" className="user-photo" />
                        <div className="user-text">
                            <div className="user-name">Ulion Pardede</div>
                            <div className="user-id">T071236</div>
                        </div>
                    </div>

                    <div className={`dropdown-menu ${openMenu ? "show" : ""}`}>
                        {/* <div className="dropdown-item">Profile</div> */}
                        <div className="dropdown-item logout" onClick={logout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}