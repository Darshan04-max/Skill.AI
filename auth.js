function loginUser(){

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    if(email === "" || password === ""){
        message.innerText = "Please fill all fields.";
        return;
    }

    // Save user data (mock database)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    // Set active session
    localStorage.setItem("currentUser", email);

    window.location.href = "dashboard.html";
}
