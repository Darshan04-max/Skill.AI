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
