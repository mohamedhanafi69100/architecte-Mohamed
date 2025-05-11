// 🔷 PARTIE 1 : GESTION DES PROJETS
const gallery = document.querySelector(".gallery");

// 2️⃣ Tableau pour stocker les projets
let worksList = [];

// 3️⃣ Récupérer les projets depuis l'API
const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksList = data;
      generateWorksList();
    });
};

// 4️⃣ Afficher tous les projets
const generateWorksList = () => {
  gallery.innerHTML = "";
  worksList.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
};

// 5️⃣ Afficher uniquement les projets filtrés
const generateFilteredWorksList = (filteredList) => {
  gallery.innerHTML = "";
  filteredList.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
};

// ✅ Appel final de la partie "projets"
getWorks(); // Charger et afficher les projets

// 🔷 PARTIE 2 : GESTION DES CATÉGORIES
let categoriesList = [];

const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categoriesList = data;
      generateFiltersButtons(categoriesList);
    });
};

const generateFiltersButtons = (categories) => {
  const filtersContainer = document.querySelector(".filters");

  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.className = "buttons filter-button filter-button-active";
  filtersContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.className = "buttons filter-button";
    filtersContainer.appendChild(button);

    button.addEventListener("click", (event) => {
      const filteredWorks = worksList.filter(
        (work) => work.categoryId === category.id
      );
      generateFilteredWorksList(filteredWorks);
      setActiveButton(event.target);
    });
  });

  const setActiveButton = (clickedButton) => {
    const allButtons = filtersContainer.querySelectorAll("button");
    allButtons.forEach((btn) => btn.classList.remove("filter-button-active"));
    clickedButton.classList.add("filter-button-active");
  };

  allButton.addEventListener("click", (event) => {
    generateWorksList();
    setActiveButton(event.target);
  });
};

getCategories(); // Charger les catégories et afficher les filtres

// 🔐 GESTION DE L'AUTHENTIFICATION
const token = localStorage.getItem("token");

if (token) {
  const authButton = document.querySelector(".authButton");
  authButton.innerText = "";

  const logoutButton = document.createElement("a");
  logoutButton.innerText = "logout";
  logoutButton.href = "#";

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });

  authButton.appendChild(logoutButton);
}

// 🧰 Barre noire "Mode édition"
const generateTopBar = () => {
  const header = document.querySelector("header");
  const topBar = document.createElement("div");
  topBar.className = "topBar";

  const topBarIcon = document.createElement("img");
  topBarIcon.src = "./assets/icons/edit-white.svg";

  const topBarText = document.createElement("span");
  topBarText.innerText = "Mode édition";

  topBar.appendChild(topBarIcon);
  topBar.appendChild(topBarText);
  header.prepend(topBar);
};

/**** Définition de la fonction generateEditButton** */
const generateEditButton = () => {
  const editContainer = document.querySelector(".edit-projects");
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerText = "modifier";
  const editIconButton = document.createElement("img");
  editIconButton.src = "./assets/icons/Group.svg";
  editButton.prepend(editIconButton);

  editButton.addEventListener("click", generateModale);
  editContainer.appendChild(editButton);
};

const generateModale = () => {
  // 1️⃣ Sélectionne le conteneur vide prévu dans le HTML pour afficher la modale
  const modaleContainer = document.querySelector(".modale-container");

  // 2️⃣ Crée le fond noir semi-transparent (overlay)
  const modale = document.createElement("div");
  modale.className = "modale";

  // 3️⃣ Crée le bloc blanc central (contenu de la modale)
  const modaleContent = document.createElement("div");
  modaleContent.className = "modale-content";

  // 4️⃣ Crée le titre de la modale
  const h2 = document.createElement("h2");
  h2.innerText = "Galerie photo";
  h2.className = "modale-title";

  // 5️⃣ Crée le bouton pour fermer la modale (la croix X)
  const closeModaleIcon = document.createElement("img");
  closeModaleIcon.src = "./assets/icons/close-icon.svg";
  closeModaleIcon.className = "close-modale-icon";

  // 6️⃣ Crée le conteneur qui affichera toutes les miniatures
  const modaleWorksContainer = document.createElement("div");
  modaleWorksContainer.className = "modale-works-container";

  // 🧱 Injecte le conteneur de miniatures dans le contenu de la modale
  modaleContent.appendChild(modaleWorksContainer);

  // 7️⃣ Boucle sur chaque projet pour créer sa miniature
  worksList.forEach((work) => {
    const workDiv = document.createElement("div");
    workDiv.className = "work-image-container";

    const workImage = document.createElement("img");
    workImage.src = work.imageUrl;
    workImage.alt = work.title;

    workDiv.appendChild(workImage);
    modaleWorksContainer.appendChild(workDiv);
  });

  // 8️⃣ Crée le bouton vert "Ajouter une photo"
  const addPictureButton = document.createElement("button");
  addPictureButton.innerText = "Ajouter une photo";
  addPictureButton.className = "modale-green-button";

  // 9️⃣ Ajoute l’événement clic sur l’icône de fermeture
  closeModaleIcon.addEventListener("click", () => {
    modaleContainer.innerHTML = ""; // vide le contenu
    document.body.classList.remove("no-scroll"); // réactive le scroll
  });

  // ✅ Injecte les éléments dans le bon ordre
  modaleContent.appendChild(h2); // 1️⃣ Titre
  modaleContent.appendChild(closeModaleIcon); // 2️⃣ Croix de fermeture
  modaleContent.appendChild(modaleWorksContainer); // 3️⃣ Miniatures
  modaleContent.appendChild(addPictureButton); // 4️⃣ Bouton vert

  modale.appendChild(modaleContent); // Ajoute à la modale
  modaleContainer.appendChild(modale); // Ajoute à la page

  // 1️⃣1️⃣ Désactive le scroll en arrière-plan
  document.body.classList.add("no-scroll");
};

// ✅✅✅ ✅ AJOUTER CETTE CONDITION TOUT EN BAS :
if (token) {
  generateTopBar(); // Affiche la barre noire si connecté
  generateEditButton(); // Affiche le bouton “modifier” si connecté
}
