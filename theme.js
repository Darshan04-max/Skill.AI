document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme on page load
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    }

    if (!themeToggle) return;

    updateButton();

    themeToggle.addEventListener("click", function () {

        document.documentElement.classList.toggle("dark-mode");

        if (document.documentElement.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

        updateButton();
    });

    function updateButton() {
        if (document.documentElement.classList.contains("dark-mode")) {
            themeToggle.innerText = "☀ Light Mode";
        } else {
            themeToggle.innerText = "🌙 Dark Mode";
        }
    }

});