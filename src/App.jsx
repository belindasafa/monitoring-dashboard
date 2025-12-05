import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/DashboardSales";
import DashboardRBK from "./pages/DashboardRBK";
import DashboardLeader from "./pages/DashboardLeaders";
import LeaderDetail from "./pages/LeaderDetail";

import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="body-container">
      
      {/* Topbar tetap bekerja karena Router ada di main.jsx */}
      <Topbar />

      <div className="main-layout">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard-rbk" element={<DashboardRBK />} />
          <Route path="/dashboard-leader" element={<DashboardLeader />} />
          <Route path="/leader/detail/:id" element={<LeaderDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
