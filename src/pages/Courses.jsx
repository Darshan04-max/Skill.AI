import "./Courses.css";
import { useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData";



function Courses() {
  const navigate = useNavigate();
  return (
    <div className="courses-page">

      <div className="courses-top">

        <h1>📚 My Courses</h1>

        <input
          type="text"
          placeholder="Search courses..."
        />

      </div>

      <div className="courses-grid">

        {coursesData.map((course)=>(

          <div className="course-card" key={course.id}>

            <img src={course.image} alt={course.title} />

            <div className="course-content">

              <h2>{course.title}</h2>

              <p>👨‍🏫 {course.instructor}</p>

              <div className="course-info">
                <span>⭐ {course.rating}</span>
                <span>⏱ {course.duration}</span>
              </div>

              <p>📖 {course.lessons} Lessons</p>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>

              </div>

              <span>{course.progress}% Complete</span>

              <button
  onClick={() => navigate(`/courses/${course.id}`)}
>
  Continue Learning →
</button>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Courses;