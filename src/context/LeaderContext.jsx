// src/context/LeaderContext.jsx
import { createContext, useState } from "react";
import leaderUsersData from "../data/leaderUsers";

export const LeaderContext = createContext();

export function LeaderProvider({ children }) {
  const [users, setUsers] = useState(leaderUsersData);

  const updateStatus = (id, newStatus, reason = "") => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: newStatus, rejectReason: reason } : u
      )
    );
  };

  return (
    <LeaderContext.Provider value={{ users, updateStatus }}>
      {children}
    </LeaderContext.Provider>
  );
}
