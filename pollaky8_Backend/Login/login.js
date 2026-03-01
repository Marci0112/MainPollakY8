function login(event) {
  console.log(event);
  event.preventDefault();

  const username = event.target.elements[0].value;
  const password = event.target.elements[1].value;

  if (username === "admin" && password == "admin") {
    localStorage.setItem("loggedIn", true);
    location.replace("../../pollaky8_Frontend/login.html");
  }
}
