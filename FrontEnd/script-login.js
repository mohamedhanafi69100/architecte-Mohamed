const token = localStorage.getItem("token");

if (token) {
  window.location.href = "./index.html";
  console.log("JS chargé");
  // Affiche : "http://localhost:5500/login.html"
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userLogs = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogs),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Réponse de la promesse: " + res.statusText);
      return res.json();
    })
    .then((data) => {
      const token = data.token;
      if (!token) throw new Error("Token manquant dans la réponse");

      localStorage.setItem("token", token);
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Une erreur s'est produite lors de la tentative de connexion.");
    });
});
