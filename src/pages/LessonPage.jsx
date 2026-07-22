import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roadmapData } from "../data/roadmapData";
import "./LessonPage.css";

function LessonPage() {
  const { id, skillIndex } = useParams();
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] = useState(() => {
  const saved = localStorage.getItem("completedLessons");
  return saved ? JSON.parse(saved) : {};
});

  const roadmap = roadmapData.find(
    (item) => item.id === Number(id)
  );

  const currentSkillIndex = Number(skillIndex);
  const skill = roadmap?.skills[currentSkillIndex];

  const lessonKey = `${id}-${skillIndex}`;

const isCompleted =
  completedLessons[lessonKey] === true;
const handleComplete = () => {
  const updatedLessons = {
    ...completedLessons,
    [lessonKey]: true,
  };

  setCompletedLessons(updatedLessons);

  localStorage.setItem(
    "completedLessons",
    JSON.stringify(updatedLessons)
  );

  // Recent Activity
  const savedActivities =
    JSON.parse(localStorage.getItem("recentActivities")) || [];

  const newActivity = {
    id: Date.now(),
    icon: "✅",
    title: `Completed ${skill} Lesson`,
    time: new Date().toLocaleString(),
  };

  const updatedActivities = [
    newActivity,
    ...savedActivities,
  ].slice(0, 5);

  localStorage.setItem(
    "recentActivities",
    JSON.stringify(updatedActivities)
  );
};
  if (!roadmap || !skill) {
    return (
      <div className="lesson-not-found">
        <h1>Lesson Not Found 😕</h1>

        <button onClick={() => navigate("/roadmaps")}>
          ← Back to Roadmaps
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-page">

      <button
        className="lesson-back-btn"
        onClick={() => navigate(`/roadmaps/${id}`)}
      >
        ← Back to {roadmap.title}
      </button>

      <div className="lesson-header">
        <span>
          Lesson {currentSkillIndex + 1} of {roadmap.skills.length}
        </span>

        <h1>
          {roadmap.icon} {skill}
        </h1>

        <p>
          Learn the core concepts of {skill} and complete this
          step in your {roadmap.title} roadmap.
        </p>
      </div>

      <div className="lesson-content">

        <h2>📚 What You'll Learn</h2>

        <p>
          In this lesson, you'll understand the fundamentals of
          {skill}, how it works, and where it is used in real-world
          projects.
        </p>

        <div className="lesson-task">
          <h3>🎯 Practice Task</h3>

          <p>
            Build a small practical project using {skill} and test
            what you learned.
          </p>
        </div>

      </div>

      <div className="lesson-actions">

        <button
          disabled={currentSkillIndex === 0}
          onClick={() =>
            navigate(
              `/roadmaps/${id}/lesson/${currentSkillIndex - 1}`
            )
          }
        >
          ← Previous
        </button>

      <button
  className="complete-btn"
  onClick={handleComplete}
  disabled={isCompleted}
>
  {isCompleted ? "🎉 Completed" : "✅ Mark Complete"}
</button>

        <button
          disabled={
            currentSkillIndex === roadmap.skills.length - 1
          }
          onClick={() =>
            navigate(
              `/roadmaps/${id}/lesson/${currentSkillIndex + 1}`
            )
          }
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default LessonPage;