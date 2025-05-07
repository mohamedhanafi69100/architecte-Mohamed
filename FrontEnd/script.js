const gallery = document.querySelector(".gallery");

let worksList = [];

const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      worksList = data;
      generateWorksList();
    });
};

// 4️⃣ Fonction pour afficher tous les travaux dans la galerie
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

// 5️⃣ Appel de la fonction pour afficher les projets au chargement
getWorks();

// 6️⃣ Déclaration du tableau vide pour les catégories
let categoriesList = [];

// 7️⃣ Fonction pour récupérer les catégories depuis l'API
const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categoriesList = data;
      generateFiltersButtons(categoriesList); // 📌 On passe à l'étape suivante : création des boutons
    });
};

// 8️⃣ Fonction pour créer dynamiquement les boutons de filtre
const generateFiltersButtons = (categories) => {
  const filtersContainer = document.querySelector(".filters");

  // Fonction pour gérer l'état actif des boutons
  const setActiveButton = (clickedButton) => {
    const allButtons = filtersContainer.querySelectorAll("button");
    allButtons.forEach((btn) => btn.classList.remove("filter-button-active"));
    clickedButton.classList.add("filter-button-active");
  };

  // Bouton "Tous"
  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.className = "buttons filter-button filter-button-active"; // actif par défaut
  allButton.addEventListener("click", (event) => {
    generateWorksList(); // 📌 Affiche tous les projets
    setActiveButton(event.target);
  });
  filtersContainer.appendChild(allButton);
  console.log(allButton);

  // Boutons pour chaque catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.className = "buttons filter-button";
    button.addEventListener("click", (event) => {
      const filteredWorks = worksList.filter(
        (work) => work.categoryId === category.id
      );
      generateFilteredWorksList(filteredWorks); // 📌 On filtre ici
      setActiveButton(event.target);
    });
    filtersContainer.appendChild(button);
  });
};

// 9️⃣ Fonction pour afficher les projets filtrés
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

// 🔟 Appel final de la fonction principale
getCategories();
