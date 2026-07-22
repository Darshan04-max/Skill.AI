import "./Login.css";
import loginImg from "../assets/login.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Login() {
  return (
    <div className="premium-login">

      <div className="login-form">

       <h2 className="login-logo">
          Skill<span>AI</span>
        </h2>

        <h1>
          Welcome to <span>SkillAI</span>
        </h1>

        <p>
          Learn. Build. Grow with SkillAI.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Enter your password"
        />

      <div className="login-options">
  <label className="remember">
    <input type="checkbox" />
    Remember me
  </label>

  <a href="#">Forgot Password?</a>
</div>

        <button className="login-btn">
          Login
        </button>

        <div className="divider">
          or continue with
        </div>

        <div className="social-buttons">
          <button>
            <FcGoogle size={22} />
            Google
          </button>

          <button>
            <FaGithub size={22} />
            GitHub
          </button>
        </div>

      </div>

      <div className="login-image-section">

        <div className="feature-card card1">
          🚀 Track Progress
        </div>

        <div className="feature-card card2">
          📚 Learn Skills
        </div>

        <div className="feature-card card3">
          💻 Build Projects
        </div>

        <img
          src={loginImg}
          alt="SkillAI"
          className="login-image"
        />

      </div>

    </div>
  );
}

export default Login;