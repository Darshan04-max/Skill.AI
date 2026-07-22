import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaRobot,
  FaBook,
  FaFileAlt,
  FaUserGraduate,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h2 className="sidebar-logo">
        Skill<span>AI</span>
      </h2>

      <ul className="sidebar-menu">

        <NavLink to="/dashboard" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaHome />
              <span>Dashboard</span>
            </li>
          )}
        </NavLink>

        <NavLink to="/roadmaps" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaRobot />
              <span>AI Roadmap</span>
            </li>
          )}
        </NavLink>

        <NavLink to="/courses" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaBook />
              <span>Courses</span>
            </li>
          )}
        </NavLink>

        <NavLink to="/resume" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaFileAlt />
              <span>Resume</span>
            </li>
          )}
        </NavLink>

        <NavLink to="/interview" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaUserGraduate />
              <span>Interview</span>
            </li>
          )}
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          {({ isActive }) => (
            <li className={isActive ? "active" : ""}>
              <FaCog />
              <span>Settings</span>
            </li>
          )}
        </NavLink>

      </ul>

    </aside>
  );
}

export default Sidebar;