import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const role = sessionStorage.getItem("role");

    if (!isLoggedIn) return <Navigate to="/" replace />;

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
