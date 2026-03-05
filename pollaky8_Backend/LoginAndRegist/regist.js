document
  .getElementById("signupFrom")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("SUBMIT LEFUTOTT");
    const loginBtn = document.querySelector("label.login");
    const username = document.getElementById("SignUpUsername").value.trim();
    const password = document.getElementById("SignUpPassword").value;
    const cpass = document.getElementById("cpass").value
    const error = document.getElementById("error_msg");

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      error.style.color = "green";
      error.style.display = "block";
      error.innerText = "Sikeres regisztráció! Most jelentkezz be!";
      document.getElementById("SignUpUsername").value = "";
      document.getElementById("SignUpPassword").value = "";
    document.getElementById("cpass").value = "";
      console.log("loginBtn:", loginBtn);
      console.log("setTimeout beállítva");
      setTimeout(() => {
        document.getElementById("login").click();
        // triggereled a css animációt
        document.querySelector("form.login").style.marginLeft = "0%";
        document.querySelector(".title-text .login").style.marginLeft = "0%";
      }, 1000);
    } else {
      error.style.color = "red";
      error.style.display = "block";
      error.innerText =
        data.reason === "taken"
          ? "Ez a felhasználónév már foglalt!"
          : "Adatbázis hiba!";
    }
  });
