import { useState } from "react";
import "./Roadmaps.css";
import { roadmapData } from "../data/roadmapData";
import { useNavigate } from "react-router-dom";

function Roadmaps() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const navigate = useNavigate();

const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("favoriteRoadmaps");

  return savedFavorites
    ? JSON.parse(savedFavorites)
    : [];
});
  const [showFavorites, setShowFavorites] = useState(false);

 const toggleFavorite = (id) => {
  let updatedFavorites;

  if (favorites.includes(id)) {
    updatedFavorites = favorites.filter(
      (item) => item !== id
    );
  } else {
    updatedFavorites = [...favorites, id];
  }

  setFavorites(updatedFavorites);

  localStorage.setItem(
    "favoriteRoadmaps",
    JSON.stringify(updatedFavorites)
  );
};
const getRoadmapProgress = (roadmap) => {
  const savedLessons =
    JSON.parse(localStorage.getItem("completedLessons")) || {};

  const completedCount = roadmap.skills.filter(
    (_, index) => savedLessons[`${roadmap.id}-${index}`]
  ).length;

  return Math.round(
    (completedCount / roadmap.skills.length) * 100
  );
};
 const filteredRoadmaps = roadmapData.filter((roadmap) => {

  const matchSearch =
    roadmap.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchCategory =
    category === "All" ||
    roadmap.title === category;

  const matchLevel =
    level === "All" ||
    roadmap.level === level;
    const matchFavorite =
    !showFavorites ||
     favorites.includes(roadmap.id);

 return (
  matchSearch &&
  matchCategory &&
  matchLevel &&
  matchFavorite
);

});
  return (
    <div className="roadmaps-page">

      {/* ================= HERO ================= */}

      <div className="roadmap-hero">

        <div className="hero-left">

          <h1>
            🤖 AI <span>Roadmaps</span>
          </h1>

          <p>
            Choose your learning roadmap and start your
            AI-powered journey with SkillAI.
          </p>

          <div className="hero-stats">

            <div className="hero-stat">
              <h2>5+</h2>
              <span>Roadmaps</span>
            </div>

            <div className="hero-stat">
              <h2>50+</h2>
              <span>Skills</span>
            </div>

            <div className="hero-stat">
              <h2>100+</h2>
              <span>Resources</span>
            </div>

            <div className="hero-stat">
              <h2>AI</h2>
              <span>Powered</span>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI Robot"
          />

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="roadmap-filters">

        <input
          type="text"
          placeholder="🔍 Search Roadmaps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="AI / ML Engineer">AI / ML Engineer</option>
          <option value="UI / UX Designer">UI / UX Designer</option>
        </select>

     <select
  value={level}
  onChange={(e) => setLevel(e.target.value)}
>
  <option value="All">All Levels</option>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Advanced">Advanced</option>
</select>

       <button
  className="my-roadmaps"
  onClick={() => setShowFavorites(!showFavorites)}
>
  {showFavorites ? "📚 All Roadmaps" : "❤️ My Roadmaps"}
</button>
 </div>

      {/* ================= ROADMAP CARDS ================= */}

      <div className="roadmap-grid">

        {filteredRoadmaps.map((roadmap) => (

          <div
            key={roadmap.id}
            className={`roadmap-card ${roadmap.color}`}
          >
              <div
               className="favorite-btn"
                  onClick={() => toggleFavorite(roadmap.id)}
                           >
                      {favorites.includes(roadmap.id) ? "❤️" : "🤍"}
                      </div>


            <div className="roadmap-icon">
              {roadmap.icon}
            </div>

            <h2>{roadmap.title}</h2>

            <p>{roadmap.description}</p>

            <div className="roadmap-tags">
              <span>{roadmap.level}</span>
              <span>{roadmap.duration}</span>
            </div>
                <div className="roadmap-progress">
  <div className="progress-info">
    <span>Progress</span>
    <span>{getRoadmapProgress(roadmap)}%</span>
  </div>

  <div className="roadmap-progress-bar">
    <div
      className="roadmap-progress-fill"
     style={{ width: `${getRoadmapProgress(roadmap)}%` }}
    ></div>
  </div>
</div>
            <h4>Skills You'll Learn</h4>

            <div className="skills-list">

              {roadmap.skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}

            </div>

          <button
  onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
>
  View Roadmap →
</button>

          </div>

        ))}

      </div>

      {/* ================= AI RECOMMENDATION ================= */}

      <div className="ai-recommendation">

        <div className="ai-left">

          <span className="ai-badge">
            🤖 AI Powered
          </span>

          <h2>
            Not sure which roadmap is right for you?
          </h2>

          <p>
            Let SkillAI analyze your interests and recommend
            the perfect roadmap based on your goals.
          </p>

          <button className="ai-roadmap-btn">
            🚀 Find My Roadmap
          </button>

        </div>

        <div className="ai-right">

          <div className="ai-circle">
            🤖
          </div>

        </div>

      </div>

    </div>
  );
}

export default Roadmaps;