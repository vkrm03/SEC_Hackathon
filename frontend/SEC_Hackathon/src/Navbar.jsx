import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../src/assets/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">ExpenseEase</div>

      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
            <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>
              Chatbot
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
              Register
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
