import "./Dashboard.css";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { roadmapData } from "../data/roadmapData";


function Dashboard() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: "1", sender: "assistant", text: "👋 Hi Darshan! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulated assistant reply
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: "Thanks — I'll help with that. Could you share more details?",
      };
      setMessages((prev) => [...prev, reply]);
    }, 700);
  };

  const recentActivities =
    JSON.parse(localStorage.getItem("recentActivities")) || [];

  const [dailyGoals, setDailyGoals] = useState(() => {
    const saved = localStorage.getItem("dailyGoals");

    return saved
      ? JSON.parse(saved)
      : [true, false, false, false];
  });
const toggleGoal = (index) => {
  const updatedGoals = dailyGoals.map((goal, i) =>
    i === index ? !goal : goal
  );

  setDailyGoals(updatedGoals);

  localStorage.setItem(
    "dailyGoals",
    JSON.stringify(updatedGoals)
  );
};
  const savedLessons =
  JSON.parse(localStorage.getItem("completedLessons")) || {};

const totalLessons = roadmapData.reduce(
  (total, roadmap) => total + roadmap.skills.length,
  0
);

const completedCount = Object.values(savedLessons).filter(
  (value) => value === true
).length;

const overallProgress = Math.round(
  (completedCount / totalLessons) * 100
);

const xpPerLesson = 100;

const totalXP = completedCount * xpPerLesson;

const currentLevel = Math.floor(totalXP / 500) + 1;

const xpInCurrentLevel = totalXP % 500;

const xpToNextLevel = 500 - xpInCurrentLevel;

const xpProgress = (xpInCurrentLevel / 500) * 100;

const frontendRoadmap = roadmapData.find(
  (roadmap) => roadmap.id === 1
);

const frontendCompleted = frontendRoadmap.skills.filter(
  (_, index) => savedLessons[`1-${index}`]
).length;

const frontendProgress = Math.round(
  (frontendCompleted / frontendRoadmap.skills.length) * 100
);
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">
  

       {/* Topbar */}
        <div className="topbar">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>



          <div className="topbar-right">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">💬</button>

            <div className="profile">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
              />
              <span>Darshan</span>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div>
            <h1>Good Evening, Darshan 👋</h1>
            <p>Keep learning. You're making great progress today.</p>
          </div>

          <div className="streak-card">
            <h2>🔥 7</h2>
            <span>Day Streak</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>📚 Courses</h3>
            <h1>24</h1>
            <p>Available Courses</p>
          </div>

          <div className="stat-card">
            <h3>🚀 Projects</h3>
            <h1>12</h1>
            <p>Hands-on Projects</p>
          </div>

          <div className="stat-card">
            <h3>🧠 AI Score</h3>
            <h1>92%</h1>
            <p>Learning Score</p>
          </div>
<div className="stat-card progress-card">
  <h3>📈 Progress</h3>

  <div className="progress-circle">
   <div className="progress-inner">
  <h2>{overallProgress}%</h2>
</div>
  </div>

  <p>Completed</p>
</div>

        </div>
        {/* Weekly Progress + Daily Goals */}

<div className="dashboard-row">

  <div className="chart-card">

    <h2>📊 Weekly Progress</h2>

    <div className="fake-chart">

      <div className="chart-item">
        <div className="bar" style={{ height: "50%" }}></div>
        <span>Mon</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "80%" }}></div>
        <span>Tue</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "60%" }}></div>
        <span>Wed</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "90%" }}></div>
        <span>Thu</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "70%" }}></div>
        <span>Fri</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "95%" }}></div>
        <span>Sat</span>
      </div>

      <div className="chart-item">
        <div className="bar" style={{ height: "85%" }}></div>
        <span>Sun</span>
      </div>

    </div>

  </div>

  <div className="goals-card">

    <h2>🎯 Daily Goals</h2>

<ul>
  <li
    className={dailyGoals[0] ? "goal-completed" : ""}
    onClick={() => toggleGoal(0)}
  >
    {dailyGoals[0] ? "✅" : "⬜"} Learn React Hooks
  </li>

  <li
    className={dailyGoals[1] ? "goal-completed" : ""}
    onClick={() => toggleGoal(1)}
  >
    {dailyGoals[1] ? "✅" : "⬜"} Build Dashboard UI
  </li>

  <li
    className={dailyGoals[2] ? "goal-completed" : ""}
    onClick={() => toggleGoal(2)}
  >
    {dailyGoals[2] ? "✅" : "⬜"} Practice 2 JavaScript Questions
  </li>

  <li
    className={dailyGoals[3] ? "goal-completed" : ""}
    onClick={() => toggleGoal(3)}
  >
    {dailyGoals[3] ? "✅" : "⬜"} Push Code to GitHub
  </li>
</ul>

  </div>

</div>

        {/* Continue Learning + AI */}
        <div className="dashboard-row">

          <div className="learning-card">

            <h2>📚 Continue Learning</h2>

            <h3>React.js Master Course</h3>

            <p>Progress : {frontendProgress}%</p>

            <div className="progress-bar">
             <div
  className="progress-fill"
  style={{ width: `${frontendProgress}%` }}
></div>
            </div>

            <button className="resume-btn">
              Resume Course →
            </button>

          </div>

          <div className="ai-card">

            <h2>🤖 AI Assistant</h2>

            <p>Today's Recommendation</p>

            <ul>
              <li>✔ Complete React Hooks</li>
              <li>✔ Practice 2 JavaScript Questions</li>
              <li>✔ Update Resume</li>
              <li>✔ Apply for 3 Jobs</li>
            </ul>

            <button className="ai-btn">
              Ask AI
            </button>

          </div>

        </div>

  <div className="achievement-section">

  <div className="achievement-card">
    <h2>🏆 React Explorer</h2>
    <p>Completed 10 React lessons</p>
  </div>

  <div className="achievement-card">
    <h2>🔥 7 Day Streak</h2>
    <p>You're learning consistently!</p>
  </div>

  <div className="achievement-card">
    <h2>🚀 Project Builder</h2>
    <p>Built 12 practice projects</p>
  </div>

</div>
{/* XP Card */}

<div className="xp-card">

  <div className="xp-left">

    <h2>⭐ Level {currentLevel} Developer</h2>

    <p>{totalXP} XP Earned</p>

    <div className="xp-bar">
      <div
        className="xp-fill"
        style={{ width: `${xpProgress}%` }}
      ></div>
    </div>

    <span>
      {xpToNextLevel} XP to reach Level {currentLevel + 1}
    </span>

  </div>

  <div className="xp-right">
    🏆
  </div>

</div>
{/* Recent Activity */}

<div className="activity-card">

  <h2>📅 Recent Activity</h2>

 {recentActivities.length === 0 ? (
  <p>No recent activity yet.</p>
) : (
  recentActivities.map((activity) => (
    <div className="activity-item" key={activity.id}>
      <span className="activity-icon">
        {activity.icon}
      </span>

      <div>
        <h4>{activity.title}</h4>
        <p>{activity.time}</p>
      </div>
    </div>
  ))
)}

  <div className="activity-item">
    <span className="activity-icon">📂</span>
    <div>
      <h4>Uploaded Resume</h4>
      <p>Yesterday</p>
    </div>
  </div>

  <div className="activity-item">
    <span className="activity-icon">🤖</span>
    <div>
      <h4>Asked AI Career Advisor</h4>
      <p>Yesterday</p>
    </div>
  </div>

  <div className="activity-item">
    <span className="activity-icon">🚀</span>
    <div>
      <h4>Completed Dashboard UI</h4>
      <p>2 Days Ago</p>
    </div>
  </div>

</div>
        </div>
          
{/* Floating AI Button */}
<div
  className="floating-ai"
  onClick={() => setShowChat(!showChat)}
>
  🤖
</div>

{/* Chat Popup */}
{showChat && (
  <div className="chat-popup">

    <div className="chat-header">
      🤖 SkillAI Assistant
    </div>

    <div className="chat-body">
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.sender}`}>
          <div className="message-text">{m.text}</div>
        </div>
      ))}
    </div>

    <div className="chat-input">
      <input
        type="text"
        placeholder="Ask anything..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend(e);
          }
        }}
      />
      <button type="button" onClick={handleSend}>Send</button>
    </div>

  </div>
)}

      </div>
  
  );
}

export default Dashboard;