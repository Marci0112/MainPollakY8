document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("LoginUsername").value.trim();
    const password = document.getElementById("LoginPassword").value;
    const loginErrorMsg = document.getElementById("login_error_msg");

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password}),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", data.username); // ← elmentve
      localStorage.setItem("points", data.points); // ← elmentve
      window.location.href = "./index.html";
    } else {
      loginErrorMsg.style.color = "red";
      loginErrorMsg.style.display = "block";
      loginErrorMsg.innerText =
        data.reason === "not_found"
          ? "Hibás felhasználónév vagy jelszó!"
          : "Hibás jelszó!";
    }
  });
