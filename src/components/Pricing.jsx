import "./Pricing.css";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    title: "Free",
    price: "₹0",
    features: [
      "AI Roadmaps",
      "Basic Skills",
      "Community Access",
    ],
    button: "Get Started",
    active: false,
  },
  {
    title: "Pro",
    price: "₹299",
    features: [
      "Everything in Free",
      "Resume Analyzer",
      "Projects",
      "Mock Interview",
    ],
    button: "Go Pro",
    active: true,
  },
  {
    title: "Premium",
    price: "₹599",
    features: [
      "Everything in Pro",
      "AI Career Coach",
      "Unlimited AI",
      "Priority Support",
    ],
    button: "Go Premium",
    active: false,
  },
];

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <h2>Choose Your Plan</h2>

      <p className="pricing-subtitle">
        Learn smarter with AI-powered features.
      </p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${
              plan.active ? "popular" : ""
            }`}
          >
            {plan.active && (
              <span className="badge">
                Most Popular
              </span>
            )}

            <h3>{plan.title}</h3>

            <h1>{plan.price}</h1>

            <ul>
              {plan.features.map((item, i) => (
                <li key={i}>
                  <FaCheck />
                  {item}
                </li>
              ))}
            </ul>

            <button>{plan.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;