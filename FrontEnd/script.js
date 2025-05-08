// 🔷 PARTIE 1 : GESTION DES PROJETS

// 1️⃣ Cibler la galerie
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

// 6️⃣ Tableau pour stocker les catégories
let categoriesList = [];

// 7️⃣ Récupérer les catégories depuis l'API
const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categoriesList = data;
      generateFiltersButtons(categoriesList);
    });
};

// 8️⃣ Créer dynamiquement les boutons de filtre
const generateFiltersButtons = (categories) => {
  const filtersContainer = document.querySelector(".filters");

  // 1. Créer le bouton "Tous"
  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.className = "buttons filter-button filter-button-active";
  filtersContainer.appendChild(allButton);

  // 2. Créer les autres boutons
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.className = "buttons filter-button";
    filtersContainer.appendChild(button);

    // 3. Au clic : filtrer les projets + activer le bouton
    button.addEventListener("click", (event) => {
      const filteredWorks = worksList.filter(
        (work) => work.categoryId === category.id
      );
      generateFilteredWorksList(filteredWorks);
      setActiveButton(event.target);
    });
  });

  // 4. Fonction pour gérer le bouton actif
  const setActiveButton = (clickedButton) => {
    const allButtons = filtersContainer.querySelectorAll("button");
    allButtons.forEach((btn) => btn.classList.remove("filter-button-active"));
    clickedButton.classList.add("filter-button-active");
  };

  // 5. Bouton "Tous" : afficher tout
  allButton.addEventListener("click", (event) => {
    generateWorksList();
    setActiveButton(event.target);
  });
};

// ✅ Appel final de la partie "catégories"
getCategories(); // Charger les catégories et afficher les filtres
