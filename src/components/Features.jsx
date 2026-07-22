import "./Features.css";
import {
  FaRobot,
  FaFileAlt,
  FaLaptopCode,
  FaChartLine,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Roadmaps",
    desc: "Personalized learning paths powered by AI.",
  },
  {
    icon: <FaFileAlt />,
    title: "Resume Analyzer",
    desc: "Improve your resume with AI suggestions.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Coding Practice",
    desc: "Practice real-world coding challenges.",
  },
  {
    icon: <FaChartLine />,
    title: "Progress Tracker",
    desc: "Track your learning journey visually.",
  },
  {
    icon: <FaUserGraduate />,
    title: "Mock Interviews",
    desc: "Prepare with AI interview simulations.",
  },
  {
    icon: <FaBriefcase />,
    title: "Career Guidance",
    desc: "Get job-ready with expert AI advice.",
  },
];

function Features() {
  return (
    <section className="features" id="features">

      <h2>Powerful AI Features</h2>

      <p className="features-subtitle">
        Everything you need to become a professional developer.
      </p>

      <div className="features-grid">

        {features.map((item, index) => (
          <div className="features-card" key={index}>

            <div className="features-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;