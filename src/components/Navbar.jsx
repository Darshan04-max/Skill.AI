import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        <FaRobot className="logo-icon" />
        <span>SkillAI</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="nav-buttons">
  <Link to="/dashboard">
    <button className="dashboard-btn">
      Dashboard
    </button>
  </Link>

  <Link to="/login">
    <button className="login-btn">
      Login
    </button>
  </Link>
</div>

    </header>
  );
}

export default Navbar;