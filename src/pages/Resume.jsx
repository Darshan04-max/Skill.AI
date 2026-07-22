import "./Resume.css";
import { useEffect, useRef, useState } from "react";

function Resume() {

    const [fileName, setFileName] = useState("No Resume Uploaded");
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("Modern");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [atsScore, setAtsScore] = useState(82);
    const [toast, setToast] = useState("");
    const fileInputRef = useRef(null);

useEffect(() => {
  if (!toast) return;

  const timer = setTimeout(() => {
    setToast("");
  }, 3000);

  return () => clearTimeout(timer);
}, [toast]);

const handleFileChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    setFileName("No Resume Uploaded");
    setResumeUploaded(false);
    setResumeFile(null);
    setToast("⚠️ No file selected.");
    return;
  }

  setFileName(file.name);
  setResumeFile(file);
  setResumeUploaded(true);
  setToast("✅ Resume uploaded successfully!");
};

const analyzeResume = () => {
  if (!resumeUploaded) {
    alert("Please upload a resume first.");
    return;
  }

  setIsAnalyzing(true);

  setTimeout(() => {
    setAtsScore(91);
    setIsAnalyzing(false);
  }, 2000);
};

const downloadResume = () => {
  if (!resumeUploaded || !resumeFile) {
    alert("Please upload a resume first.");
    return;
  }

  const url = URL.createObjectURL(resumeFile);
  const link = document.createElement("a");

  link.href = url;
  link.download = resumeFile.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const handlePreview = () => {
  if (!resumeUploaded || !resumeFile) {
    alert("Please upload a resume first.");
    return;
  }

  const url = URL.createObjectURL(resumeFile);
  window.open(url, "_blank");
  URL.revokeObjectURL(url);
};

const removeResume = () => {
  setFileName("No Resume Uploaded");
  setResumeUploaded(false);
  setResumeFile(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const openFilePicker = () => {
  fileInputRef.current.click();
};

  return (
    
 <div className="resume-page">

  {toast && (
    <div className="toast">
      {toast}
    </div>
  )}

  <div className="resume-hero">

    <div>

      <h1>
        📄 Resume <span>Builder</span>
      </h1>

      <p>
        Build an ATS-friendly resume and get ready for your dream job.
      </p>

    </div>

    <div className="resume-badge">

      <h2>🏆 Pro Resume</h2>

      <span>95% Complete</span>

    </div>

  </div>

  {/* Upload Box */}
<div className="upload-box">

  <div className="upload-icon">
    ☁️
  </div>

  <h2>Upload Your Resume</h2>

  <p>
    Drag & Drop your Resume here
  </p>

  <span className="upload-info">
    PDF • DOC • DOCX • Max 5 MB
  </span>

  <input
    type="file"
    accept=".pdf,.doc,.docx"
    ref={fileInputRef}
    onChange={handleFileChange}
    hidden
  />

  <button onClick={openFilePicker}>
    📂 Choose File
  </button>

  <h3 className="file-name">
    {fileName}
  </h3>

</div>
      {/* Resume Preview */}
{resumeUploaded && (

<div className="preview-card">

  <div className="preview-left">

    <div className="preview-icon">
      📄
    </div>
  
    <div>

      <h3>{fileName}</h3>

      <p>Last Updated • Today</p>

    </div>

  </div>

  <div className="preview-actions">

    <button onClick={handlePreview}>👁 Preview</button>

    <button onClick={downloadResume}>⬇ Download</button>

   <button
  className="delete-btn"
  onClick={removeResume}
>
  🗑 Remove
</button>

  </div>

</div>

)}
{/* Missing Skills */}

<div className="missing-skills">

  <h2>📉 Missing Skills</h2>

  <div className="skills-grid">

    <span>TypeScript</span>

    <span>Docker</span>

    <span>MongoDB</span>

    <span>React Native</span>

    <span>AWS</span>

    <span>CI/CD</span>

  </div>

</div>

      {/* Stats */}
    <div className="resume-stats">

<div className="resume-card">

  <div className="circle">

    <div className="circle-inner">

  <h1>{atsScore}%</h1>

    </div>

  </div>

  <h2>📊 ATS Score</h2>

  <p>Good Resume</p>

</div>
 <div className="resume-card">

  <div className="circle">

    <div className="circle-inner">

      <h1>76%</h1>

    </div>

  </div>

  <h2>⭐ Skills Match</h2>

  <p>Job Ready</p>

</div>
<div className="resume-card">

  <div className="circle">

    <div className="circle-inner">

      <h1>A+</h1>

    </div>

  </div>

  <h2>🏆 Resume Score</h2>

  <p>Professional</p>

</div>

</div>

{/* Skills Breakdown */}

<div className="skills-breakdown">

  <h2>📊 Skills Breakdown</h2>

  <div className="skill-progress">

    <div className="skill-item">
      <div className="skill-header">
        <span>⚛️ React</span>
        <span>95%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill react"></div>
      </div>
    </div>

    <div className="skill-item">
      <div className="skill-header">
        <span>🟨 JavaScript</span>
        <span>90%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill js"></div>
      </div>
    </div>

    <div className="skill-item">
      <div className="skill-header">
        <span>🎨 CSS</span>
        <span>92%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill css"></div>
      </div>
    </div>

    <div className="skill-item">
      <div className="skill-header">
        <span>🖥️ Backend</span>
        <span>70%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill backend"></div>
      </div>
    </div>

  </div>

</div>

{/* ATS Checklist */}

<div className="ats-checklist">

  <h2>✅ ATS Checklist</h2>

  <div className="checklist-grid">

    <div className="check-item success">✔ Contact Information</div>

    <div className="check-item success">✔ Skills Section</div>

    <div className="check-item success">✔ Projects Added</div>

    <div className="check-item success">✔ Education</div>

    <div className="check-item warning">⚠ Certifications Missing</div>

    <div className="check-item warning">⚠ Portfolio Website Missing</div>

    <div className="check-item warning">⚠ Experience Section Missing</div>

    <div className="check-item success">✔ ATS Friendly Format</div>

  </div>

</div>

 {/* Resume Analytics */}

<div className="resume-analytics">

  <h2>📊 Resume Analytics</h2>

  <div className="analytics-grid">

    <div className="analytics-card">
      <h3>📝 Total Words</h3>
      <h1>428</h1>
      <p>Ideal: 400–700 words</p>
    </div>

    <div className="analytics-card">
      <h3>📑 Sections</h3>
      <h1>8 / 10</h1>
      <p>Add Certifications & Experience</p>
    </div>

    <div className="analytics-card">
      <h3>🔑 ATS Keywords</h3>
      <h1>34</h1>
      <p>Excellent keyword coverage</p>
    </div>

    <div className="analytics-card">
      <h3>📖 Readability</h3>
      <h1>A+</h1>
      <p>Easy to scan by recruiters</p>
    </div>

  </div>

</div>

      {/* Suggestions */}
     <div className="suggestions">

  <h2>🤖 AI Resume Suggestions</h2>

  <div className="suggestion-grid">

    <div className="suggestion-card">
      <span>📝</span>
      <h3>Professional Summary</h3>
      <p>Add a stronger summary highlighting your React and frontend skills.</p>
    </div>

    <div className="suggestion-card">
      <span>💻</span>
      <h3>Projects</h3>
      <p>Include SkillAI and other real-world projects with GitHub links.</p>
    </div>

    <div className="suggestion-card">
      <span>🔑</span>
      <h3>Keywords</h3>
      <p>Add ATS-friendly keywords like React, JavaScript, Git and REST API.</p>
    </div>

    <div className="suggestion-card">
      <span>🚀</span>
      <h3>Achievements</h3>
      <p>Highlight certifications, hackathons and internship experience.</p>
    </div>

  </div>

</div>
{/* Resume Strength */}

<div className="resume-strength">

  <h2>💪 Resume Strength</h2>

  <div className="strength-grid">

    <div className="strength-card good">

      <h3>🟢 Strong Areas</h3>

      <ul>
        <li>✔ React Development</li>
        <li>✔ JavaScript</li>
        <li>✔ HTML & CSS</li>
        <li>✔ Responsive Design</li>
        <li>✔ Git & GitHub</li>
      </ul>

    </div>

    <div className="strength-card improve">

      <h3>🟡 Needs Improvement</h3>

      <ul>
        <li>➕ TypeScript</li>
        <li>➕ Docker</li>
        <li>➕ AWS</li>
        <li>➕ Unit Testing</li>
        <li>➕ CI/CD</li>
      </ul>

    </div>

  </div>

</div>
  {/* Resume Templates */}
{/* Resume Templates */}

<div className="resume-templates">

  <h2>🎨 Resume Templates</h2>

  <div className="template-grid">

    {/* Modern */}

    <div className="template-card">

      <div className="template-preview">

        <div className="mini-header"></div>

        <div className="mini-line long"></div>

        <div className="mini-line"></div>

        <div className="mini-line"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

      </div>

      <h3>Modern</h3>

      <button
        className={selectedTemplate === "Modern" ? "selected-btn" : ""}
        onClick={() => setSelectedTemplate("Modern")}
      >
        {selectedTemplate === "Modern"
          ? "✔ Selected"
          : "Use Template"}
      </button>

    </div>

    {/* Professional */}

    <div className="template-card">

      <div className="template-preview">

        <div className="mini-header"></div>

        <div className="mini-line long"></div>

        <div className="mini-line"></div>

        <div className="mini-line"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

      </div>

      <h3>Professional</h3>

      <button
        className={selectedTemplate === "Professional" ? "selected-btn" : ""}
        onClick={() => setSelectedTemplate("Professional")}
      >
        {selectedTemplate === "Professional"
          ? "✔ Selected"
          : "Use Template"}
      </button>

    </div>

    {/* Creative */}

    <div className="template-card">

      <div className="template-preview">

        <div className="mini-header"></div>

        <div className="mini-line long"></div>

        <div className="mini-line"></div>

        <div className="mini-line"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

        <div className="mini-section"></div>

      </div>

      <h3>Creative</h3>

      <button
        className={selectedTemplate === "Creative" ? "selected-btn" : ""}
        onClick={() => setSelectedTemplate("Creative")}
      >
        {selectedTemplate === "Creative"
          ? "✔ Selected"
          : "Use Template"}
      </button>

    </div>

  </div>

</div>

 {/* Resume Version History */}

<div className="resume-history">

  <h2>📜 Resume Version History</h2>

  <div className="history-list">

    <div className="history-card">
      <div>
        <h3>Version 3.0</h3>
        <p>Today • ATS Score 91%</p>
      </div>

      <span className="history-badge latest">
        Latest
      </span>
    </div>

    <div className="history-card">
      <div>
        <h3>Version 2.0</h3>
        <p>Yesterday • ATS Score 86%</p>
      </div>

      <button className="history-btn">
        Restore
      </button>
    </div>

    <div className="history-card">
      <div>
        <h3>Version 1.0</h3>
        <p>3 Days Ago • ATS Score 78%</p>
      </div>

      <button className="history-btn">
        Restore
      </button>
    </div>

  </div>

</div>

{/* Resume Tips */}

<div className="resume-tips">

  <h2>💡 Resume Tips</h2>

  <div className="tips-grid">

    <div className="tip-card">
      <span>🎯</span>
      <h3>Keep it Short</h3>
      <p>Try to keep your resume within one page for better readability.</p>
    </div>

    <div className="tip-card">
      <span>📂</span>
      <h3>Add Projects</h3>
      <p>Include real-world projects with GitHub and live demo links.</p>
    </div>

    <div className="tip-card">
      <span>🏆</span>
      <h3>Highlight Achievements</h3>
      <p>Add certifications, hackathons, internships and awards.</p>
    </div>

    <div className="tip-card">
      <span>📞</span>
      <h3>Contact Information</h3>
      <p>Always include your email, LinkedIn and GitHub profile.</p>
    </div>

  </div>

</div>
      {/* Buttons */}
      <div className="resume-buttons">
<button
  className="primary-btn"
  onClick={analyzeResume}
  disabled={isAnalyzing}
>
  {isAnalyzing ? (
    <>
      <span className="spinner"></span>
      Analyzing...
    </>
  ) : (
    "🤖 Analyze Resume"
  )}
</button>

       <button
  className="secondary-btn"
  onClick={downloadResume}
>
  ⬇ Download Resume
</button>
      </div>

    </div>
  );
}

export default Resume;