import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        🛡️ <span>CityShield</span>
      </div>

      {/* CENTER LINKS (login ke baad only) */}
      {user && (
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/alerts">
            Alerts
          </NavLink>

          <NavLink to="/street-light">
            Street Light
          </NavLink>

          <NavLink to="/waste-collection">
            Waste Collection
          </NavLink>

          <NavLink to="/housing-complaints">
            Housing Complaints
          </NavLink>

          {/* ✅ NEW GENERIC ISSUE LINK */}
          <NavLink to="/general-issues">
            Other Issues
          </NavLink>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {!user ? (
          <>
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
            <NavLink to="/signup" className="signup-btn">
              Sign Up
            </NavLink>
          </>
        ) : (
          <button className="signup-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
