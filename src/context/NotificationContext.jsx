import { createContext, useContext } from "react";
import { LeaderContext } from "./LeaderContext";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const { users } = useContext(LeaderContext);

    const role = sessionStorage.getItem("role");
    const getNotificationsForRole = (role) => {
        let notif = [];

        users.forEach((u) => {
            if (!u.notifications) return;

            u.notifications.forEach((n) => {
                if (!n.target) return;
                if (n.target.includes(role)) {
                    notif.push({
                        id: n.id,
                        message: n.message,
                        createdAt: n.createdAt,
                        userId: u.id,
                    });
                }
            });
        });

        notif.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return notif;
    };

    return (
        <NotificationContext.Provider value={{ getNotificationsForRole }}>
            {children}
        </NotificationContext.Provider>
    );
}
