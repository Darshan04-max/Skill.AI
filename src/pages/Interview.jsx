import "./Interview.css";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

const technologies = [
  { id: 1, name: "React", icon: "⚛️" },
  { id: 2, name: "JavaScript", icon: "🟨" },
  { id: 3, name: "HTML", icon: "🌐" },
  { id: 4, name: "CSS", icon: "🎨" },
  { id: 5, name: "Node.js", icon: "🟢" },
  { id: 6, name: "Python", icon: "🐍" },
];

const levels = [
  { id: 1, name: "Beginner", icon: "🟢" },
  { id: 2, name: "Intermediate", icon: "🟡" },
  { id: 3, name: "Advanced", icon: "🔴" },
];

const questionBank = [
  { id: 1, tech: "React", difficulty: "Beginner", topic: "Components", question: "What is the main purpose of React components?", options: ["Manage databases", "Build reusable UI pieces", "Style pages", "Handle server responses"], answer: "Build reusable UI pieces" },
  { id: 2, tech: "React", difficulty: "Beginner", topic: "JSX", question: "What does JSX allow you to write in React?", options: ["SQL queries", "HTML-like syntax inside JavaScript", "Binary data", "CSS rules"], answer: "HTML-like syntax inside JavaScript" },
  { id: 3, tech: "React", difficulty: "Intermediate", topic: "Hooks", question: "Which hook is used to manage component state?", options: ["useEffect", "useRef", "useMemo", "useState"], answer: "useState" },
  { id: 4, tech: "React", difficulty: "Advanced", topic: "Performance", question: "Why would you use React.memo?", options: ["To add styling", "To cache expensive renders", "To create routes", "To fetch APIs"], answer: "To cache expensive renders" },
  { id: 5, tech: "JavaScript", difficulty: "Beginner", topic: "Variables", question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "function", "class"], answer: "let" },
  { id: 6, tech: "JavaScript", difficulty: "Beginner", topic: "Functions", question: "Which function type is created with the arrow syntax?", options: ["Arrow function", "Async loop", "Switch statement", "Object literal"], answer: "Arrow function" },
  { id: 7, tech: "JavaScript", difficulty: "Intermediate", topic: "Async", question: "What does Promise.resolve() return?", options: ["A string", "A promise object", "A DOM node", "A CSS class"], answer: "A promise object" },
  { id: 8, tech: "JavaScript", difficulty: "Advanced", topic: "Closures", question: "What is a closure in JavaScript?", options: ["A function that remembers its lexical scope", "A DOM event", "A CSS animation", "A package manager"], answer: "A function that remembers its lexical scope" },
  { id: 9, tech: "HTML", difficulty: "Beginner", topic: "Semantics", question: "Which tag is used to create a paragraph?", options: ["<div>", "<span>", "<p>", "<img>"], answer: "<p>" },
  { id: 10, tech: "HTML", difficulty: "Intermediate", topic: "Forms", question: "Which attribute makes an input field required?", options: ["required", "type", "name", "value"], answer: "required" },
  { id: 11, tech: "HTML", difficulty: "Advanced", topic: "Accessibility", question: "Why is semantic HTML important?", options: ["It improves accessibility and structure", "It speeds up CSS", "It removes JavaScript", "It shortens URLs"], answer: "It improves accessibility and structure" },
  { id: 12, tech: "CSS", difficulty: "Beginner", topic: "Selectors", question: "Which selector targets an element by its class?", options: ["#id", ".class", "element", "@media"], answer: ".class" },
  { id: 13, tech: "CSS", difficulty: "Intermediate", topic: "Layout", question: "Which CSS property creates flexible layouts?", options: ["display: flex", "color: red", "font-size: 12px", "margin: 0"], answer: "display: flex" },
  { id: 14, tech: "CSS", difficulty: "Advanced", topic: "Responsive Design", question: "Which rule is commonly used for responsive design?", options: ["@import", "@keyframes", "@media", "@font-face"], answer: "@media" },
  { id: 15, tech: "Node.js", difficulty: "Beginner", topic: "Modules", question: "Which core module is used to create a server in Node.js?", options: ["http", "fs", "path", "os"], answer: "http" },
  { id: 16, tech: "Node.js", difficulty: "Intermediate", topic: "Streams", question: "What is a stream in Node.js used for?", options: ["To manage databases", "To handle data in chunks", "To style elements", "To create components"], answer: "To handle data in chunks" },
  { id: 17, tech: "Python", difficulty: "Beginner", topic: "Syntax", question: "Which character is used for indentation in Python?", options: [";", "{ }", "( )", "4 spaces"], answer: "4 spaces" },
  { id: 18, tech: "Python", difficulty: "Intermediate", topic: "Data Structures", question: "Which Python structure stores key-value pairs?", options: ["List", "Tuple", "Dictionary", "Set"], answer: "Dictionary" },
  { id: 19, tech: "Python", difficulty: "Advanced", topic: "Error Handling", question: "Which keyword is used to catch exceptions in Python?", options: ["try", "catch", "throw", "finally"], answer: "try" },
];

function Interview() {
  const [selectedTech, setSelectedTech] = useState("React");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [screen, setScreen] = useState("setup");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [dashboardSummary, setDashboardSummary] = useState(() => {
    if (typeof window === "undefined") return { xp: 0, levelProgress: 0, streak: 0, recentActivity: [] };

    try {
      return JSON.parse(window.localStorage.getItem("skillaiDashboard") || "{\"xp\":0,\"levelProgress\":0,\"streak\":0,\"recentActivity\":[]}");
    } catch {
      return { xp: 0, levelProgress: 0, streak: 0, recentActivity: [] };
    }
  });
  const audioContextRef = useRef(null);

  const difficultyLevels = useMemo(() => {
    if (difficulty === "Intermediate") return ["Beginner", "Intermediate"];
    if (difficulty === "Advanced") return ["Beginner", "Intermediate", "Advanced"];
    return ["Beginner"];
  }, [difficulty]);

  const questions = useMemo(() => {
    const filtered = questionBank.filter((item) => item.tech === selectedTech && difficultyLevels.includes(item.difficulty));
    return filtered.slice(0, 10);
  }, [difficultyLevels, selectedTech]);

  const currentQuestionData = questions[currentQuestion] || null;

  const playSound = useCallback((type) => {
    if (!audioEnabled) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;
    if (context.state === "suspended") {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    let frequency = 520;
    if (type === "correct") frequency = 660;
    if (type === "wrong") frequency = 240;
    if (type === "finish") frequency = 880;

    oscillator.type = type === "correct" ? "sine" : type === "wrong" ? "triangle" : "square";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gainNode.gain.setValueAtTime(0.05, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  }, [audioEnabled]);

  useEffect(() => {
    if (screen !== "interview") return;

    if (timeLeft <= 0) {
      playSound("finish");
      // defer to avoid synchronous setState inside effect
      setTimeout(() => setScreen("result"), 0);
      return;
    }

    const timer = window.setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [screen, timeLeft, playSound]);

  useEffect(() => {
    if (!currentQuestionData || screen !== "interview") return;
    setTimeout(() => {
      setVisitedQuestions((prev) => (prev[currentQuestionData.id] ? prev : { ...prev, [currentQuestionData.id]: true }));
    }, 0);
  }, [currentQuestionData, screen]);

  useEffect(() => {
    if (!currentQuestionData) return;
    setTimeout(() => setSelectedAnswer(answers[currentQuestionData.id] || ""), 0);
  }, [answers, currentQuestionData]);

  useEffect(() => {
    if (screen !== "interview") return;
    window.history.pushState(null, "", window.location.href);
  }, [screen]);

  // Derived stats used by result calculations — compute early to avoid TDZ errors
  const correctCount = questions.reduce((count, question) => count + (answers[question.id] === question.answer ? 1 : 0), 0);
  const skippedCount = questions.filter((question) => !answers[question.id] && visitedQuestions[question.id]).length;
  const wrongCount = questions.length - correctCount - skippedCount;
  const percentage = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const answeredCount = Object.keys(answers).length;
  const remainingCount = Math.max(0, questions.length - answeredCount);
  const timerClass = timeLeft <= 60 ? "timer-danger blink" : timeLeft <= 120 ? "timer-warning" : "timer-safe";
  const allVisited = questions.length > 0 && questions.every((question) => visitedQuestions[question.id]);
  const performanceLevel = percentage >= 85 ? "Excellent" : percentage >= 65 ? "Good" : "Needs Improvement";

  const topicStats = questions.reduce((acc, question) => {
    if (!acc[question.topic]) acc[question.topic] = { correct: 0, total: 0 };
    acc[question.topic].total += 1;
    if (answers[question.id] === question.answer) acc[question.topic].correct += 1;
    return acc;
  }, {});

  const strongTopics = Object.entries(topicStats).filter(([, data]) => data.correct > 0 && data.correct === data.total).map(([topic]) => topic);
  const weakTopics = Object.entries(topicStats).filter(([, data]) => data.correct < data.total && data.total > 0).map(([topic]) => topic);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (screen === "interview") {
        event.preventDefault();
        event.returnValue = "Leaving interview will lose your progress.";
      }
    };

    const handlePopState = () => {
      if (screen === "interview") {
        const shouldLeave = window.confirm("Leaving interview will lose your progress.");
        if (!shouldLeave) {
          window.history.pushState(null, "", window.location.href);
        } else {
          setScreen("setup");
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== "result") return;

    // compute percentage locally to avoid referencing a variable that may be initialized later
    const localPercentage = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
    const xpGain = Math.round((localPercentage / 100) * 120) + 35;
    const newLevelProgress = Math.min(100, (dashboardSummary.levelProgress || 0) + Math.round((localPercentage / 100) * 20) + 10);
    const newStreak = (dashboardSummary.streak || 0) + 1;
    const recentActivity = [
      `${selectedTech} Interview Completed`,
      ...(dashboardSummary.recentActivity || []).slice(0, 3),
    ];

    const updatedSummary = {
      xp: (dashboardSummary.xp || 0) + xpGain,
      levelProgress: newLevelProgress,
      streak: newStreak,
      recentActivity,
    };

    // defer setState to avoid synchronous updates inside effect
    setTimeout(() => {
      setDashboardSummary(updatedSummary);
      window.localStorage.setItem("skillaiDashboard", JSON.stringify(updatedSummary));
    }, 0);
  }, [screen, dashboardSummary, selectedTech, correctCount, questions.length]);

  const handleStartInterview = () => {
    if (!questions || questions.length === 0) {
      window.alert("No questions available for the selected technology/difficulty. Please choose a different option.");
      return;
    }
    playSound("click");
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setVisitedQuestions({});
    setTimeLeft(15 * 60);
    setScreen("interview");
  };

  const handleRestart = () => {
    playSound("click");
    setSelectedTech("React");
    setDifficulty("Beginner");
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setVisitedQuestions({});
    setTimeLeft(15 * 60);
    setScreen("setup");
  };

  const handleAnswerSelect = (option) => {
    if (!currentQuestionData) return;

    const isCorrect = option === currentQuestionData.answer;
    setSelectedAnswer(option);
    setAnswers((prev) => ({ ...prev, [currentQuestionData.id]: option }));
    playSound(isCorrect ? "correct" : "wrong");
  };

  const handleNext = () => {
    if (!selectedAnswer && !answers[currentQuestionData?.id]) return;

    playSound("click");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen("result");
      playSound("finish");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      playSound("click");
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    playSound("click");
    setCurrentQuestion(index);
  };

  const handleFinishInterview = () => {
    playSound("finish");
    setScreen("result");
  };

  const handleDownloadReport = () => {
    const content = `SkillAI Interview Report\nTechnology: ${selectedTech}\nDifficulty: ${difficulty}\nScore: ${percentage}%\nCorrect: ${correctCount}\nWrong: ${wrongCount}\nSkipped: ${skippedCount}\nTime Taken: ${15 * 60 - timeLeft}s`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedTech}-interview-report.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadCertificate = () => {
    const content = `SkillAI Certificate\n${selectedTech} Interview Completed\nScore: ${percentage}%\nCongratulations!`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedTech}-certificate.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleShareResult = async () => {
    const shareText = `SkillAI Interview completed with ${percentage}% score in ${selectedTech}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "SkillAI Interview Result", text: shareText });
      } catch {
        window.prompt("Copy your result", shareText);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      window.alert("Result copied to clipboard.");
    }
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  

  const aiMessage = useMemo(() => {
    if (screen === "setup") return "Hello Darshan 👋 Welcome to SkillAI Interview. Choose your technology and difficulty to begin.";
    if (screen === "ready") return "The interview is about to begin. Read every question carefully and stay calm.";
    if (screen === "interview") {
      const visitedCount = Object.keys(visitedQuestions).length;
      if (timeLeft <= 60) return "Last minute! Focus and finish strong.";
      if (visitedCount >= Math.max(1, Math.ceil(questions.length / 2))) return "You are halfway through. Keep your pace steady.";
      if (visitedCount >= questions.length - 1) return "Last question ahead. Give it your best shot.";
      return "Read every question carefully. Take your time and answer with confidence.";
    }
    return "Interview completed. Review your results, feedback and next learning path.";
  }, [screen, timeLeft, questions.length, visitedQuestions]);

  const recommendedTechnologies = selectedTech === "React" ? ["Next.js", "TypeScript"] : selectedTech === "Node.js" ? ["Express", "MongoDB"] : selectedTech === "Python" ? ["Django", "FastAPI"] : ["System Design", "APIs"];
  const nextLearningPath = selectedTech === "React" ? "Build a small production-ready app with hooks, routing and state management." : `Practice ${selectedTech} with more projects and real-world debugging exercises.`;
  const motivationMessage = percentage >= 80 ? "Excellent work! You are building strong interview confidence." : percentage >= 60 ? "Good effort. A little more practice will make you unstoppable." : "Keep going. Every practice round sharpens your skills.";

  return (
    <div className="interview-page">
      <div className="interview-hero">
        <div>
          <h1>
            🎤 Interview <span>Preparation</span>
          </h1>
          <p>Practice professional tech interviews, sharpen your confidence, and get ready for your dream role.</p>
        </div>

        <div className="interview-badge">
          <h2>🏆 Mock Interview</h2>
          <span>15-Minute AI Practice Session</span>
        </div>
      </div>

      {screen === "setup" && (
        <>
          <section className="tech-section">
            <h2>💻 Choose Your Technology</h2>
            <p>Select the topic you want to practice.</p>

            <div className="tech-grid">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  className={`tech-card ${selectedTech === tech.name ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTech(tech.name);
                    playSound("click");
                  }}
                  aria-label={`Select ${tech.name}`}
                >
                  <div className="tech-icon">{tech.icon}</div>
                  <h3>{tech.name}</h3>
                </button>
              ))}
            </div>

            <div className="selected-box">
              <span>Selected Technology</span>
              <h3>{selectedTech}</h3>
            </div>
          </section>

          <section className="difficulty-section">
            <h2>🎯 Choose Difficulty</h2>
            <p>Pick the level that matches your current experience.</p>

            <div className="difficulty-grid">
              {levels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  className={`difficulty-card ${difficulty === level.name ? "active" : ""}`}
                  onClick={() => {
                    setDifficulty(level.name);
                    playSound("click");
                  }}
                  aria-label={`Select ${level.name}`}
                >
                  <div className="difficulty-icon">{level.icon}</div>
                  <h3>{level.name}</h3>
                </button>
              ))}
            </div>

            <div className="selected-box">
              <span>Selected Difficulty</span>
              <h3>{difficulty}</h3>
            </div>
          </section>

          <div className="setup-card">
            <h2>🚀 Interview Setup</h2>
            <div className="setup-info">
              <div className="setup-item">
                <span>Technology</span>
                <h3>{selectedTech}</h3>
              </div>
              <div className="setup-item">
                <span>Difficulty</span>
                <h3>{difficulty}</h3>
              </div>
              <div className="setup-item">
                <span>Questions</span>
                <h3>{questions.length} Questions</h3>
              </div>
              <div className="setup-item">
                <span>Estimated Time</span>
                <h3>15 Minutes</h3>
              </div>
            </div>
          </div>

          <button className="start-btn" type="button" onClick={() => setScreen("ready")}>
            🚀 Start Mock Interview
          </button>
        </>
      )}

      {screen === "ready" && (
        <div className="ready-card">
          <h1>🚀 Get Ready!</h1>
          <p>Your interview is about to begin. Stay calm and focus on clear answers.</p>

          <div className="ready-details">
            <p>💻 Technology: <strong>{selectedTech}</strong></p>
            <p>🎯 Difficulty: <strong>{difficulty}</strong></p>
            <p>❓ Questions: <strong>{questions.length}</strong></p>
            <p>⏱ Time: <strong>15 Minutes</strong></p>
          </div>

          <div className="instructions">
            <h3>📋 Instructions</h3>
            <ul>
              <li>Read every question carefully.</li>
              <li>Choose the best answer.</li>
              <li>Timer cannot be paused.</li>
              <li>Submit before time ends.</li>
            </ul>
          </div>

          <button className="start-btn" type="button" onClick={handleStartInterview}>
            ▶ Start Now
          </button>
        </div>
      )}

      {screen === "interview" && currentQuestionData ? (
        <div className="interview-shell">
          <div className="interview-main">
            <div className="interview-box">
              <div className="interview-topbar">
                <div>
                  <h2>Question {currentQuestion + 1} / {questions.length}</h2>
                  <p className={`timer ${timerClass}`}>⏱ {formatTime(timeLeft)}</p>
                </div>
                <div className="top-actions">
                  <button className="mute-btn" type="button" onClick={() => setAudioEnabled((prev) => !prev)} aria-label="Toggle sound">
                    {audioEnabled ? "🔊" : "🔈"}
                  </button>
                  <div className="tag">{selectedTech}</div>
                </div>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
              </div>

              <div className="stats-grid">
                <div className="stat-pill">Answered: {answeredCount}</div>
                <div className="stat-pill">Remaining: {remainingCount}</div>
                <div className="stat-pill">Skipped: {skippedCount}</div>
                <div className="stat-pill">Score: {correctCount}</div>
                <div className="stat-pill">Accuracy: {answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0}%</div>
              </div>

              <h1 className="question-title">{currentQuestionData.question}</h1>

              <div className="options">
                {currentQuestionData.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`option-btn ${selectedAnswer === option ? "selected" : ""}`}
                    onClick={() => handleAnswerSelect(option)}
                    aria-pressed={selectedAnswer === option}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="interview-actions">
                <button className="secondary-btn" type="button" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  ← Previous
                </button>

                <div className="action-group">
                  <button className="secondary-btn" type="button" onClick={handleFinishInterview} disabled={!allVisited}>
                    Finish Interview
                  </button>
                  <button className="start-btn small" type="button" onClick={handleNext} disabled={!selectedAnswer && !answers[currentQuestionData.id]}>
                    {currentQuestion + 1 === questions.length ? "Finish Interview" : "Next Question"}
                  </button>
                </div>
              </div>
            </div>

            <aside className="side-panel">
              <div className="ai-card">
                <div className="ai-message" key={aiMessage}>{aiMessage}</div>
                <div className="ai-header">🤖 Alex AI</div>
              </div>

              <div className="question-palette">
                <h3>Question Palette</h3>
                <div className="palette-grid">
                  {questions.map((question, index) => {
                    const status = answers[question.id] ? "answered" : visitedQuestions[question.id] ? "skipped" : "pending";
                    const isCurrent = index === currentQuestion;
                    return (
                      <button
                        key={question.id}
                        type="button"
                        className={`palette-btn ${isCurrent ? "current" : ""} ${status}`}
                        onClick={() => handleJumpToQuestion(index)}
                        aria-label={`Jump to question ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : screen === "interview" && !currentQuestionData ? (
        <div className="interview-shell">
          <div className="interview-main">
            <div className="interview-box">
              <h2>No questions available</h2>
              <p>Please go back to setup and select a different technology or difficulty.</p>
              <button className="start-btn" type="button" onClick={() => setScreen("setup")}>Back to Setup</button>
            </div>
          </div>
        </div>
      ) : null}

      {screen === "result" && (
        <div className="result-card celebrate">
          {percentage >= 80 && <div className="confetti-layer">{Array.from({ length: 24 }).map((_, index) => <span key={index} className="confetti-piece" />)}</div>}

          <div className="result-ring" style={{ background: `conic-gradient(#38bdf8 ${percentage * 3.6}deg, #1e293b 0deg)` }}>
            <div className="result-ring-inner">
              <h2>{percentage}%</h2>
              <span>Score</span>
            </div>
          </div>

          <div className="result-summary">
            <h2>🎉 Interview Complete</h2>
            <p>You finished your mock interview with a strong performance snapshot.</p>

            <div className="result-stats">
              <div><strong>{correctCount}</strong><span>Correct</span></div>
              <div><strong>{wrongCount}</strong><span>Wrong</span></div>
              <div><strong>{skippedCount}</strong><span>Skipped</span></div>
              <div><strong>{15 * 60 - timeLeft}s</strong><span>Time</span></div>
              <div><strong>{performanceLevel}</strong><span>Level</span></div>
              <div><strong>{Math.round((correctCount / questions.length) * 100)}%</strong><span>Accuracy</span></div>
            </div>

            <div className="performance-chart">
              <div className="chart-row">
                <span>Correct</span>
                <div className="chart-track"><div className="chart-fill correct" style={{ width: `${questions.length ? (correctCount / questions.length) * 100 : 0}%` }} /></div>
                <strong>{correctCount}</strong>
              </div>
              <div className="chart-row">
                <span>Wrong</span>
                <div className="chart-track"><div className="chart-fill wrong" style={{ width: `${questions.length ? (wrongCount / questions.length) * 100 : 0}%` }} /></div>
                <strong>{wrongCount}</strong>
              </div>
              <div className="chart-row">
                <span>Skipped</span>
                <div className="chart-track"><div className="chart-fill skipped" style={{ width: `${questions.length ? (skippedCount / questions.length) * 100 : 0}%` }} /></div>
                <strong>{skippedCount}</strong>
              </div>
            </div>

            <div className="topic-section">
              <h3>✅ Strengths</h3>
              <div className="chip-row">
                {strongTopics.length > 0 ? strongTopics.map((topic) => <span key={topic} className="chip good">{topic}</span>) : <span className="chip">Keep practicing</span>}
              </div>
            </div>

            <div className="topic-section">
              <h3>⚠️ Weak Topics</h3>
              <div className="chip-row">
                {weakTopics.length > 0 ? weakTopics.map((topic) => <span key={topic} className="chip bad">{topic}</span>) : <span className="chip">Great work</span>}
              </div>
            </div>

            <div className="feedback-card">
              <h3>🤖 AI Feedback</h3>
              <p><strong>Strengths:</strong> {strongTopics.length > 0 ? strongTopics.join(", ") : "Consistency and calm approach"}</p>
              <p><strong>Weak Topics:</strong> {weakTopics.length > 0 ? weakTopics.join(", ") : "No major weak spots"}</p>
              <p><strong>Recommended Technologies:</strong> {recommendedTechnologies.join(", ")}</p>
              <p><strong>Next Learning Path:</strong> {nextLearningPath}</p>
              <p><strong>Motivation:</strong> {motivationMessage}</p>
            </div>

            <div className="dashboard-card">
              <h3>📈 Dashboard Updated</h3>
              <p>XP +{Math.round((percentage / 100) * 120) + 35}</p>
              <p>Level Progress {dashboardSummary.levelProgress}%</p>
              <p>Streak {dashboardSummary.streak}</p>
              <p>Recent Activity: {dashboardSummary.recentActivity[0] || `${selectedTech} Interview Completed`}</p>
            </div>

            <div className="result-actions">
              <button className="start-btn" type="button" onClick={handleDownloadReport}>📄 Download Result PDF</button>
              <button className="secondary-btn" type="button" onClick={handleDownloadCertificate}>🏅 Download Certificate</button>
              <button className="secondary-btn" type="button" onClick={handleShareResult}>🔗 Share Result</button>
              <button className="start-btn" type="button" onClick={handleRestart}>🔁 Restart Interview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interview;