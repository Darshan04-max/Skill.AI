<<<<<<< HEAD
// 🔒 Login Protection
const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "login.html";
}

// 🚀 When Page Loads
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("dashboardContent");
    const summaryBox = document.getElementById("dashboardAISummary");
    const authLink = document.getElementById("authLink");
    const welcomeEl = document.getElementById("welcomeUser");

    if (!container) return; // safety check

    // 🔄 Navbar Logout Control
    if (authLink && currentUser) {
        authLink.innerHTML =
            `<a href="#" onclick="logoutUser()">Logout</a>`;
    }

    // 👋 Welcome Message
    if (welcomeEl && currentUser) {
        const name = currentUser.split("@")[0];
        welcomeEl.innerText = "Welcome back, " + name;
    }

    let overallTotal = 0;
    let overallCompleted = 0;

    // 📦 Loop Through Skills
    skills.forEach(skill => {

        let total = 0;
        let completed = 0;

        for (let level in skill.levels) {

            skill.levels[level].forEach((topic, index) => {

                total++;
                overallTotal++;

                const key = `${currentUser}-${skill.id}-${level}-${index}`;

                if (localStorage.getItem(key) === "true") {
                    completed++;
                    overallCompleted++;
                }
            });
        }

        const percent = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        const xp = completed * 10;

        const card = document.createElement("div");
        card.classList.add("dashboard-card");

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${percent}% Completed</p>
            <p><strong>XP:</strong> ${xp}</p>
            <div class="dashboard-progress">
                <div class="dashboard-fill" style="width:${percent}%"></div>
            </div>
            <button onclick="openSkill(${skill.id})">
                Continue
            </button>
        `;

        container.appendChild(card);
    });

    // 📊 Overall Progress
    const overallPercent = overallTotal === 0
        ? 0
        : Math.round((overallCompleted / overallTotal) * 100);

    if (summaryBox) {

        if (overallPercent === 0) {
            summaryBox.innerText =
                "You haven't started any skills yet. Begin today.";
        }
        else if (overallPercent === 100) {
            summaryBox.innerText =
                "🚀 Amazing! You've mastered everything.";
        }
        else {
            summaryBox.innerText =
                `You're making progress. Overall completion: ${overallPercent}%`;
        }
    }

});

// 🔓 Logout Function
function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// 🔗 Open Skill Page
function openSkill(id) {
    window.location.href = "roadmap.html?id=" + id;
}


// 🌗 Theme Toggle
document.addEventListener("DOMContentLoaded", function() {

    const themeToggle = document.getElementById("themeToggle");

    // Agar button exist nahi karta to kuch mat karo
    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerText = "☀ Light Mode";
    }

    // Toggle click
    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.innerText = "☀ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.innerText = "🌙 Dark Mode";
        }

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("dashboardContent");
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcomeUser").innerText =
        "Welcome, " + currentUser;

    container.innerHTML = "";

    skills.forEach(skill => {

        const card = document.createElement("div");
        card.classList.add("dashboard-card");

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>

            <div style="margin-top:10px;">
                <a href="roadmap.html?id=${skill.id}" class="btn-primary">
                    Open Roadmap
                </a>

                <a href="resources.html?id=${skill.id}" class="btn-outline">
                    View Resources
                </a>
            </div>
        `;

        container.appendChild(card);
    });

});
=======
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
>>>>>>> 0ec5f953a21dd5a8a66749ab1b7fe5c0f1d1db61
