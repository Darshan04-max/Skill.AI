import "./Hero.css";
import heroImg from "../assets/hero.png";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <motion.p
          className="hero-tag"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✨ Learn. Build. Grow.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Build Your Future
          <br />
          With <span>SkillAI</span>
        </motion.h1>

        <p className="hero-text">
          AI-powered roadmaps, coding practice,
          resume analyzer, interview preparation
          and career guidance.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started →
          </button>

          <button className="secondary-btn">
            Explore
          </button>
        </div>
      </div>

      <motion.div
        className="hero-right"
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <img src={heroImg} alt="Hero" />

        <div className="floating card-one">
          🤖 AI Roadmaps
        </div>

        <div className="floating card-two">
          💻 Projects
        </div>

        <div className="floating card-three">
          🚀 Career Growth
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;