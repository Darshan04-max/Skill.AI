document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("resourceContainer");
    const titleEl = document.getElementById("resourceSkillTitle");

    if (!container || !titleEl) {
        console.error("Required HTML elements missing.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const skillId = parseInt(params.get("id"));

    const selectedSkill = skills.find(skill => skill.id === skillId);

    if (!selectedSkill) {
        document.body.innerHTML = "<h2>Skill Not Found</h2>";
        return;
    }

    titleEl.innerText = selectedSkill.name + " Resources";

    container.innerHTML = "";

    if (!selectedSkill.resources || selectedSkill.resources.length === 0) {
        container.innerHTML = "<p>No resources available for this skill.</p>";
        return;
    }

    selectedSkill.resources.forEach(res => {

        const card = document.createElement("div");
        card.classList.add("resource-card");

        card.innerHTML = `
            <h3>${res.title}</h3>
            <p>${res.description || "Helpful learning resource."}</p>

            <div class="resource-actions">
                <a href="${res.link}" target="_blank" class="btn-primary">
                    Visit
                </a>

                <button class="btn-outline save-btn"
                        data-title="${res.title}">
                    Save
                </button>
            </div>
        `;

        container.appendChild(card);
    });

});
document.addEventListener("click", function(e){

    if(e.target.classList.contains("save-btn")){

        const title = e.target.getAttribute("data-title");

        let saved = JSON.parse(localStorage.getItem("savedResources")) || [];

        if(!saved.includes(title)){
            saved.push(title);
            localStorage.setItem("savedResources", JSON.stringify(saved));
            alert("Saved successfully!");
        }
        else{
            alert("Already saved!");
        }
    }

});