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

      <Link to="/login">
        <button className="login-btn">
          Login
        </button>
      </Link>

    </header>
  );
}

export default Navbar;