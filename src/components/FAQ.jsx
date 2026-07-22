import "./FAQ.css";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "Is SkillAI completely free?",
    answer:
      "Yes! You can start learning for free. Premium features will unlock advanced AI tools.",
  },
  {
    question: "Does SkillAI create AI roadmaps?",
    answer:
      "Yes. SkillAI generates personalized learning roadmaps based on your goals.",
  },
  {
    question: "Can I prepare for interviews?",
    answer:
      "Absolutely! SkillAI provides AI mock interviews and interview preparation.",
  },
  {
    question: "Will I get certificates?",
    answer:
      "Yes. Certificates will be available after completing learning paths.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes. Your dashboard will show XP, streaks, completed skills and roadmap progress.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq" id="faq">

      <h2>Frequently Asked Questions</h2>

      <p className="faq-subtitle">
        Everything you need to know about SkillAI.
      </p>

      {faqData.map((item, index) => (
        <div
          className="faq-item"
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            <h3>{item.question}</h3>

            {active === index ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {active === index && (
            <p className="faq-answer">
              {item.answer}
            </p>
          )}
        </div>
      ))}

    </section>
  );
}

export default FAQ;