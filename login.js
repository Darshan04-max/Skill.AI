function loginUser(){

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    if(email === "" || password === ""){
        message.innerText = "Please fill all fields.";
        return;
    }

    localStorage.setItem("currentUser", email);

    window.location.href = "dashboard.html";
}
