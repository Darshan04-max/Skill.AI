// 🔹 Check login session
const currentUser = localStorage.getItem("currentUser");

if(!currentUser){
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){

    const name = currentUser.split("@")[0];
    const welcomeEl = document.getElementById("welcomeUser");
    if(welcomeEl){
        welcomeEl.innerText = "Welcome back, " + name;
    }

    const container = document.getElementById("dashboardContent");
    const summaryBox = document.getElementById("dashboardAISummary");

    let overallTotal = 0;
    let overallCompleted = 0;

    let mostActiveSkill = null;
    let highestPercent = 0;

    skills.forEach(skill => {

        let total = 0;
        let completed = 0;

        for(let level in skill.levels){
            skill.levels[level].forEach((topic,index)=>{

                total++;
                overallTotal++;

                const key = `${currentUser}-${skill.id}-${level}-${index}`;

                if(localStorage.getItem(key) === "true"){
                    completed++;
                    overallCompleted++;
                }
            });
        }

        const percent = total === 0 
            ? 0 
            : Math.round((completed / total) * 100);

        const xp = completed * 10;
        const badge = getBadge(percent);

        if(percent > highestPercent){
            highestPercent = percent;
            mostActiveSkill = skill.name;
        }

        const card = document.createElement("div");
        card.classList.add("dashboard-card");

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${percent}% Completed</p>
            <p><strong>XP:</strong> ${xp}</p>
            <p><strong>Badge:</strong> ${badge}</p>
            <div class="dashboard-progress">
                <div class="dashboard-fill" style="width:${percent}%"></div>
            </div>
            <button onclick="openSkill(${skill.id})">Continue</button>
        `;

        container.appendChild(card);
    });

    // 🔹 Overall Progress
    const overallPercent = overallTotal === 0
        ? 0
        : Math.round((overallCompleted / overallTotal) * 100);

    const overallXP = overallCompleted * 10;

    // 🔹 AI Summary
    if(overallPercent === 0){
        summaryBox.innerText =
        "You haven't started any skills yet. Begin your learning journey today.";
    }
    else if(overallPercent === 100){
        summaryBox.innerText =
        `🚀 Outstanding! You've mastered all skills with ${overallXP} XP. Time to build advanced real-world projects.`;
    }
    else{
        summaryBox.innerText =
        `You're making strong progress. Overall mastery: ${overallPercent}%. Total XP: ${overallXP}. Keep improving in ${mostActiveSkill}.`;
    }

});

// 🔹 Badge System
function getBadge(percent){

    if(percent === 100) return "🏆 Master";
    if(percent >= 75) return "🔥 Advanced";
    if(percent >= 50) return "🟢 Skilled";
    if(percent >= 25) return "🟡 Learner";
    return "🔰 Beginner";
}

// 🔹 Open Skill Page
function openSkill(id){
    window.location.href = "roadmap.html?id=" + id;
}
