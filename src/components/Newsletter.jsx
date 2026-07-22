import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <h2>Stay Updated 🚀</h2>

      <p>
        Receive AI learning tips, roadmap updates and new features.
      </p>

      <div className="newsletter-box">
        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>
          Subscribe
        </button>
      </div>

    </section>
  );
}

export default Newsletter;