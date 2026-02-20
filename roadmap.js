<<<<<<< HEAD
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
=======
// 🔹 Login check
const currentUser = localStorage.getItem("currentUser");

if(!currentUser){
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){

    const params = new URLSearchParams(window.location.search);
    const skillId = parseInt(params.get("id"));

    const selectedSkill = skills.find(skill => skill.id === skillId);

    if(!selectedSkill) return;

    document.getElementById("skillTitle").innerText = selectedSkill.name;

    const container = document.getElementById("roadmapContent");

    let totalTopics = 0;

    // 🔹 RENDER ROADMAP
    for(let level in selectedSkill.levels){

        const section = document.createElement("div");
        section.classList.add("roadmap-level");

        const heading = document.createElement("h3");
        heading.innerText = level.toUpperCase();
        section.appendChild(heading);

        const ul = document.createElement("ul");

        selectedSkill.levels[level].forEach((topic,index) => {

            totalTopics++;

            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const key = `${currentUser}-${skillId}-${level}-${index}`;

            if(localStorage.getItem(key) === "true"){
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", function(){
                localStorage.setItem(key, checkbox.checked);
                updateProgress();
            });

            li.appendChild(checkbox);
            li.append(" " + topic);

            ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
    }

    function updateProgress(){

        let completedTopics = 0;

        document.querySelectorAll(".roadmap-level input[type='checkbox']").forEach(cb => {
            if(cb.checked) completedTopics++;
        });

        const percent = totalTopics === 0 
            ? 0 
            : Math.round((completedTopics / totalTopics) * 100);

        document.getElementById("progressFill").style.width = percent + "%";
        document.getElementById("progressText").innerText = percent + "% Completed";

        generateAISuggestion();
    }

    function generateAISuggestion(){

        const suggestionBox = document.getElementById("aiSuggestionText");

        let levelStatus = {};
        let overallComplete = true;

        for(let level in selectedSkill.levels){

            let levelComplete = true;

            for(let i = 0; i < selectedSkill.levels[level].length; i++){

                const key = `${currentUser}-${skillId}-${level}-${i}`;

                if(localStorage.getItem(key) !== "true"){
                    levelComplete = false;
                    overallComplete = false;
                    break;
                }
            }

            levelStatus[level] = levelComplete;
        }

        if(overallComplete){
            suggestionBox.innerText =
            `🚀 Incredible! You have mastered ${selectedSkill.name}. Start building advanced real-world projects to strengthen your portfolio.`;
            return;
        }

        if(levelStatus.beginner && !levelStatus.intermediate){
            suggestionBox.innerText =
            `Great job finishing Beginner level! Now move to INTERMEDIATE topics.`;
            return;
        }

        if(levelStatus.intermediate && !levelStatus.advanced){

            const projectList = selectedSkill.projects?.join(", ");

            suggestionBox.innerText =
            `Excellent progress! Try building: ${projectList} before moving to ADVANCED topics.`;

            return;
        }

        for(let level in selectedSkill.levels){
            for(let i = 0; i < selectedSkill.levels[level].length; i++){

                const key = `${currentUser}-${skillId}-${level}-${i}`;

                if(localStorage.getItem(key) !== "true"){
                    suggestionBox.innerText =
                    `Focus next on "${selectedSkill.levels[level][i]}" (${level.toUpperCase()} level).`;
                    return;
                }
            }
        }
    }

    updateProgress();
});
>>>>>>> 0ec5f953a21dd5a8a66749ab1b7fe5c0f1d1db61
