import { useParams, useNavigate } from "react-router-dom";
import { roadmapData } from "../data/roadmapData";
import "./RoadmapDetails.css";

function RoadmapDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const roadmap = roadmapData.find(
    (item) => item.id === Number(id)
  );
  const savedLessons =
  JSON.parse(localStorage.getItem("completedLessons")) || {};

const completedCount = roadmap
  ? roadmap.skills.filter((_, index) =>
      savedLessons[`${roadmap.id}-${index}`]
    ).length
  : 0;

const calculatedProgress = roadmap
  ? Math.round(
      (completedCount / roadmap.skills.length) * 100
    )
  : 0;

  if (!roadmap) {
    return (
      <div className="roadmap-not-found">
        <h1>Roadmap Not Found 😕</h1>
        <button onClick={() => navigate("/roadmaps")}>
          ← Back to Roadmaps
        </button>
      </div>
    );
  }

  return (
    <div className="roadmap-details-page">

      <button
        className="back-roadmaps-btn"
        onClick={() => navigate("/roadmaps")}
      >
        ← Back to Roadmaps
      </button>

      <section className="details-hero">

        <div className="details-icon">
          {roadmap.icon}
        </div>

        <div className="details-hero-content">
          <span className="details-level">
            {roadmap.level}
          </span>

          <h1>{roadmap.title}</h1>

          <p>{roadmap.description}</p>

          <div className="details-meta">
            <span>⏱ {roadmap.duration}</span>
            <span>📚 {roadmap.skills.length} Skills</span>
           <span>📈 {calculatedProgress}% Complete</span>
          </div>
        </div>

      </section>

      <section className="details-progress-card">

        <div className="details-progress-title">
          <h2>Your Progress</h2>
          <span>{calculatedProgress}%</span>
        </div>

        <div className="details-progress-bar">
          <div
            className="details-progress-fill"
            style={{ width: `${calculatedProgress}%` }}
          ></div>
        </div>

      </section>

      <section className="learning-path">

        <div className="section-heading">
          <span>🚀 Learning Path</span>
          <h2>Skills You'll Master</h2>
          <p>
            Complete each step to move forward in your learning journey.
          </p>
        </div>

        <div className="learning-steps">

          {roadmap.skills.map((skill, index) => (

            <div className="learning-step" key={index}>

              <div className="step-number">
                {index + 1}
              </div>

              <div className="step-content">
                <h3>{skill}</h3>
                <p>
                  Learn the core concepts and build practical projects.
                </p>
              </div>

           <button
  className="start-learning-btn"
  onClick={() =>
    navigate(`/roadmaps/${roadmap.id}/lesson/${index}`)
  }
>
  Start Learning →
</button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default RoadmapDetails;