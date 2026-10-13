        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="courses-empty" role="status">
          <h2>🔎 No courses found</h2>
          <p>Try another course name or instructor.</p>
          <button onClick={() => setSearchQuery("")}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
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

                <div
                  className="progress"
                  role="progressbar"
                  aria-label={`${course.title} progress`}
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
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
      )}
    </div>
  );
}

export default Courses;
