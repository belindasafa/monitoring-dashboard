import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import DashboardSales from "./pages/DashboardSales";
import DashboardRBK from "./pages/DashboardRBK";
import DashboardLeader from "./pages/DashboardLeaders";
import LeaderDetail from "./pages/LeaderDetail";
import DashboardADC from "./pages/DashboardADC"; 
import ADCDetail from "./pages/ADCDetail";

import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

function App() {
  const location = useLocation();
  const hideTopbar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="body-container">

      {!hideTopbar && <Topbar />}

      <div className="main-layout">
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard-sales"
            element={
              <ProtectedRoute allowedRoles={["sales"]}>
                <DashboardSales />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-rbk"
            element={
              <ProtectedRoute allowedRoles={["rbk"]}>
                <DashboardRBK />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-leader"
            element={
              <ProtectedRoute allowedRoles={["pemimpin"]}>
                <DashboardLeader />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leader/detail/:id"
            element={
              <ProtectedRoute allowedRoles={["pemimpin"]}>
                <LeaderDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-adc"
            element={
              <ProtectedRoute allowedRoles={["adc"]}>
                <DashboardADC />
              </ProtectedRoute>
            }
          />

          <Route
            path="/adc/detail/:id"
            element={
              <ProtectedRoute allowedRoles={["adc"]}>
                <ADCDetail />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;