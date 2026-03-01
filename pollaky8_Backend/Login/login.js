// Login form submit kezelése
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
      localStorage.setItem("loggedIn", true);
      location.replace("./index.html");
    } else {
      alert("Hibás felhasználónév vagy jelszó!");
    }
  });
