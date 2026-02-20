document.addEventListener("DOMContentLoaded", function(){

    const grid = document.querySelector(".skills-grid");

    function renderSkills(){

        skills.forEach(skill => {

            const card = document.createElement("div");
            card.classList.add("skill-card");

            card.innerHTML = `
                <div class="icon-circle">
                    <i class="fa-solid fa-code"></i>
                </div>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
                <button onclick="openSkill(${skill.id})">
                    View Roadmap
                </button>
            `;

            grid.appendChild(card);
        });
    }

    renderSkills();

});

function openSkill(id){
    window.location.href = "roadmap.html?id=" + id;
}
function goToDashboard(){
    const currentUser = localStorage.getItem("currentUser");

    if(currentUser){
        window.location.href = "dashboard.html";
    }else{
        window.location.href = "login.html";
    }
}

function goToSkills(){
    document.querySelector(".skills-section")
    .scrollIntoView({ behavior: "smooth" });
}
