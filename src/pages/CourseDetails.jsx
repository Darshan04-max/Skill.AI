import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseDetails.css";

const courses = [
  {
    id: 1,
    title: "React Mastery",
    instructor: "John Doe",
    duration: "12 Hours",
    lessons: 24,
    rating: 4.9,
    progress: 60,
    xp: 240,
    description:
      "Master React from beginner to advanced by building real-world projects.",
  },
  {
    id: 2,
    title: "JavaScript Pro",
    instructor: "Sarah Lee",
    duration: "10 Hours",
    lessons: 18,
    rating: 4.8,
    progress: 45,
    xp: 180,
    description:
      "Learn modern JavaScript with ES6+, DOM, APIs and advanced concepts.",
  },
  {
    id: 3,
    title: "Node.js Bootcamp",
    instructor: "Alex Brown",
    duration: "15 Hours",
    lessons: 30,
    rating: 4.7,
    progress: 30,
    xp: 120,
    description:
      "Build backend applications using Node.js and Express.",
  },
  {
    id: 4,
    title: "MongoDB Essentials",
    instructor: "Emma Wilson",
    duration: "8 Hours",
    lessons: 16,
    rating: 4.8,
    progress: 20,
    xp: 80,
    description:
      "Learn MongoDB database design and CRUD operations.",
  },
];
function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (item) => item.id === Number(id)
  );

  // Safe default values, initialized from localStorage when possible
  const [progress, setProgress] = useState(() => {
    try {
      if (!course) return 0;
      const saved = JSON.parse(localStorage.getItem(`course-${course.id}`));
      return saved ? saved.progress : course.progress || 0;
    } catch {
      return course ? course.progress || 0 : 0;
    }
  });
  const [xp, setXP] = useState(() => {
    try {
      if (!course) return 0;
      const saved = JSON.parse(localStorage.getItem(`course-${course.id}`));
      return saved ? saved.xp : course.xp || 0;
    } catch {
      return course ? course.xp || 0 : 0;
    }
  });
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      if (!course) return [];
      const saved = JSON.parse(localStorage.getItem(`course-${course.id}`));
      return saved ? saved.completedLessons || [] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {

  if (!course) return;

  localStorage.setItem(
    `course-${course.id}`,
    JSON.stringify({
      progress,
      xp,
      completedLessons,
    })
  );

}, [progress, xp, completedLessons, course]);

  if (!course) {
    return <h1>Course Not Found</h1>;
  }

  const completeLesson = (lessonNo) => {

    if (completedLessons.includes(lessonNo)) return;

    const updatedLessons = [...completedLessons, lessonNo];
    setCompletedLessons(updatedLessons);

    const newProgress = Math.min(
      100,
      progress + Math.ceil(100 / course.lessons)
    );

    setProgress(newProgress);
    setXP((prevXP) => prevXP + 10);
  };

  return (
    <div className="course-details">

      {/* Top Bar */}

      <div className="top-bar">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <button className="save-btn">
          ❤️ Save Course
        </button>

      </div>

      {/* Hero */}

      <div className="course-hero">

        <h1>{course.title}</h1>

        <p>{course.description}</p>

        <div className="course-meta">
          <span>⭐ {course.rating}</span>
          <span>👨‍🏫 {course.instructor}</span>
          <span>📚 {course.lessons} Lessons</span>
          <span>⏱ {course.duration}</span>
        </div>

      </div>

      {/* Layout */}

      <div className="course-layout">

        {/* Left */}

        <div className="course-left">

          <div className="video-box">

            <h2>🎥 Course Preview</h2>

            <div className="course-video">

              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/bMknfKXIFA8"
                title="React Course"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>

          </div>

          <h2 className="section-title">
            📚 Course Lessons
          </h2>

          <div className="lesson-list">

            <div className="lesson-card">
              <div>
                <h3>📘 Lesson 1</h3>
                <p>Introduction</p>
              </div>

              <button onClick={() => completeLesson(1)}>
  {completedLessons.includes(1)
    ? "✅ Completed"
    : "▶ Start"}
</button>
            </div>

            <div className="lesson-card">
              <div>
                <h3>📘 Lesson 2</h3>
                <p>Components & Props</p>
              </div>

             <button onClick={() => completeLesson(2)}>
  {completedLessons.includes(2)
    ? "✅ Completed"
    : "▶ Start"}
</button>
            </div>

            <div className="lesson-card">
              <div>
                <h3>📘 Lesson 3</h3>
                <p>State & Hooks</p>
              </div>

              <button onClick={() => completeLesson(3)}>
  {completedLessons.includes(3)
    ? "✅ Completed"
    : "▶ Start"}
</button>
            </div>

            <div className="lesson-card">
              <div>
                <h3>📘 Lesson 4</h3>
                <p>React Project</p>
              </div>

              <button onClick={() => completeLesson(4)}>
  {completedLessons.includes(4)
    ? "✅ Completed"
    : "▶ Start"}
</button>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="course-right">

          <div className="progress-card">

            <h2>📊 Progress</h2>

            <div className="progress-bar">

              <div
                className="progress-fill"
               style={{ width: `${progress}%` }}
              ></div>

            </div>

           <p>{Math.round(progress)}% Completed</p>

            <hr />

            <h3>⭐ XP Earned</h3>

            <h1>{xp} XP</h1>

            <hr />

            <h3>🏆 Certificate</h3>

            <p className="locked">
  {progress >= 100
    ? "🏆 Certificate Unlocked"
    : "🔒 Locked"}
</p>
            <hr />

            <h3>📚 Lessons</h3>

            <p>{course.lessons}</p>

           <button className="continue-btn">
  {progress >= 100
    ? "🎉 Course Completed"
    : "Continue Learning →"}
</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CourseDetails;