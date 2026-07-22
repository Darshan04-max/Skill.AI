import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <h2>SkillAI</h2>

      <p>Learn. Build. Get Hired.</p>

      <div className="footer-links">

        <div>
          <h4>Quick Links</h4>

          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
        </div>

        <div>
          <h4>Resources</h4>

          <a href="#">FAQ</a>
          <a href="#">Support</a>
          <a href="#">Privacy</a>
        </div>

        <div>
          <h4>Follow</h4>

          <div className="socials">
            <FaGithub />
            <FaLinkedin />
            <FaInstagram />
          </div>

        </div>

      </div>

      <hr />

    <p className="footer-bottom">
       © 2026 SkillAI • Made with ❤️ by Darshan
           </p> 
    </footer>
  );
}

export default Footer;