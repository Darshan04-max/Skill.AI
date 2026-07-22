import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetails from "./pages/RoadmapDetails";
import LessonPage from "./pages/LessonPage";
import CourseDetails from "./pages/CourseDetails";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:id"element={<RoadmapDetails />}/>
        <Route path="/roadmaps/:id/lesson/:skillIndex" element={<LessonPage />}/>
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </div>
  );
}

export default App;