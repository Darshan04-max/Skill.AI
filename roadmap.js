document.addEventListener("DOMContentLoaded", function () {

    // 🔐 Auth Check
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // 🔍 Get Skill ID
    const params = new URLSearchParams(window.location.search);
    const skillId = parseInt(params.get("id"));

    const selectedSkill = skills.find(skill => skill.id === skillId);

    if (!selectedSkill) {
        document.body.innerHTML = "<h2>Skill Not Found</h2>";
        return;
    }

    // 🏷 Set Skill Info
    document.getElementById("skillTitle").innerText = selectedSkill.name;
    document.getElementById("skillDescription").innerText = selectedSkill.description;

    const roadmapContent = document.getElementById("roadmapContent");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const aiSuggestionText = document.getElementById("aiSuggestionText");
    const projectContainer = document.getElementById("projectContainer");

    // Clear previous content
    roadmapContent.innerHTML = "";
    projectContainer.innerHTML = "";

    // 🔹 Render Roadmap
    for (let level in selectedSkill.levels) {

        const levelDiv = document.createElement("div");
        levelDiv.classList.add("roadmap-level");

        const heading = document.createElement("h4");
        heading.innerText = level.toUpperCase();
        levelDiv.appendChild(heading);

        const ul = document.createElement("ul");

        selectedSkill.levels[level].forEach((topic, index) => {

            const key = `${currentUser}-${skillId}-${level}-${index}`;
            const isChecked = localStorage.getItem(key) === "true";

            const li = document.createElement("li");

            li.innerHTML = `
                <label>
                    <input type="checkbox" ${isChecked ? "checked" : ""}>
                    ${topic}
                </label>
            `;

            const checkbox = li.querySelector("input");
            const label = li.querySelector("label");

            // ✅ Apply strike-through if already completed
            if (isChecked) {
                label.style.textDecoration = "line-through";
                label.style.opacity = "0.6";
            }

            checkbox.addEventListener("change", function () {

                localStorage.setItem(key, checkbox.checked);

                if (checkbox.checked) {
                    label.style.textDecoration = "line-through";
                    label.style.opacity = "0.6";
                } else {
                    label.style.textDecoration = "none";
                    label.style.opacity = "1";
                }

                updateProgress();
            });

            ul.appendChild(li);
        });

        levelDiv.appendChild(ul);
        roadmapContent.appendChild(levelDiv);
    }

    // 🔹 Render Projects
    selectedSkill.projects.forEach(project => {
        const li = document.createElement("li");
        li.classList.add("project-item");
        li.innerText = project;
        projectContainer.appendChild(li);
    });

    // 🚀 Live Progress Update
    function updateProgress() {

        const checkboxes = document.querySelectorAll("#roadmapContent input[type='checkbox']");
        const total = checkboxes.length;

        let completed = 0;
        checkboxes.forEach(box => {
            if (box.checked) completed++;
        });

        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        progressFill.style.width = percent + "%";
        progressText.innerText = percent + "% Completed";

        // 🤖 AI Suggestion Logic
        if (percent === 0) {
            aiSuggestionText.innerText = "Start with beginner topics to build foundation.";
        }
        else if (percent < 50) {
            aiSuggestionText.innerText = "Good start! Keep pushing through intermediate level.";
        }
        else if (percent < 100) {
            aiSuggestionText.innerText = "Almost there! Time to master advanced topics.";
        }
        else {
            aiSuggestionText.innerText = "🚀 Amazing! You've completed this skill.";
        }
    }

    updateProgress();

});