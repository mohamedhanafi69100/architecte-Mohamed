// 🔷 PARTIE 1 : GESTION DES PROJETS
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

getWorks();

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

getCategories();

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

// ✏️ Bouton "modifier"
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

// 🖼️ GÉNÉRER LA MODALE
const generateModale = () => {
  const modaleContainer = document.querySelector(".modale-container");
  modaleContainer.innerHTML = "";

  const modale = document.createElement("div");
  modale.className = "modale";

  const modaleContent = document.createElement("div");
  modaleContent.className = "modale-content";

  const h2 = document.createElement("h2");
  h2.innerText = "Galerie photo";
  h2.className = "modale-title";

  const closeModaleIcon = document.createElement("img");
  closeModaleIcon.src = "./assets/icons/close-icon.svg";
  closeModaleIcon.className = "close-modale-icon";

  closeModaleIcon.addEventListener("click", () => {
    modaleContainer.innerHTML = "";
    document.body.classList.remove("no-scroll");
  });

  const modaleWorksContainer = document.createElement("div");
  modaleWorksContainer.className = "modale-works-container";

  worksList.forEach((work) => {
    const workDiv = document.createElement("div");
    workDiv.className = "work-image-container";

    const workImage = document.createElement("img");
    workImage.src = work.imageUrl;
    workImage.alt = work.title;
    workImage.className = "work-image-modale";

    const trashDiv = document.createElement("div");
    trashDiv.className = "trash-container";

    const trash = document.createElement("img");
    trash.src = "./assets/icons/trash-can-solid.svg";
    trash.className = "trash-icon";
    trash.id = work.id;

    trash.addEventListener("click", () => {
      deleteWork(trash.id);
    });

    trashDiv.appendChild(trash);
    workDiv.appendChild(workImage);
    workDiv.appendChild(trashDiv);
    modaleWorksContainer.appendChild(workDiv);
  });

  const addPictureButton = document.createElement("button");
  addPictureButton.innerText = "Ajouter une photo";
  addPictureButton.className = "modale-green-button";
  addPictureButton.addEventListener("click", generateSecondContentModale);

  modaleContent.appendChild(h2);
  modaleContent.appendChild(closeModaleIcon);
  modaleContent.appendChild(modaleWorksContainer);
  modaleContent.appendChild(addPictureButton);

  modale.appendChild(modaleContent);
  modaleContainer.appendChild(modale);

  document.body.classList.add("no-scroll");
};

/**********ici dans cette endroit ***************/

// 🎯 GÉNÉRER LA DEUXIÈME MODALE (ajout photo)
const generateSecondContentModale = () => {
  const modaleContent = document.querySelector(".modale-content");
  modaleContent.innerText = "";

  const arrowLeft = document.createElement("img");
  arrowLeft.src = "./assets/icons/arrow-left.svg";
  arrowLeft.className = "arrow-left";
  arrowLeft.addEventListener("click", generateModale);

  const h2 = document.createElement("h2");
  h2.innerText = "Ajout photo";
  h2.className = "modale-title";

  const closeModaleIcon = document.createElement("img");
  closeModaleIcon.src = "./assets/icons/close-icon.svg";
  closeModaleIcon.className = "close-modale-icon";
  closeModaleIcon.addEventListener("click", () => {
    document.querySelector(".modale-container").innerHTML = "";
    document.body.classList.remove("no-scroll");
  });

  modaleContent.appendChild(arrowLeft);
  modaleContent.appendChild(h2);
  modaleContent.appendChild(closeModaleIcon);

  const form = document.createElement("form");
  form.className = "add-photo-form";
  modaleContent.appendChild(form);

  const imageLabel = document.createElement("label");
  imageLabel.innerText = "Image";
  imageLabel.htmlFor = "image";

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "image";
  imageInput.name = "image";
  imageInput.accept = "image/*";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Titre";

  const categorySelect = document.createElement("select");
  categorySelect.name = "category";

  categoriesList.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    categorySelect.appendChild(option);
  });

  const previewContainer = document.createElement("div");
  previewContainer.className = "image-preview";
  previewContainer.innerHTML = `
    <img src="./assets/icons/img.svg" class="placeholder-icon">
    <p class="upload-text">+ Ajouter photo</p>
    <p class="file-info">jpg, png : 4mo max</p>
  `;

  form.appendChild(previewContainer);
  form.appendChild(imageLabel);
  form.appendChild(imageInput);
  form.appendChild(titleInput);
  form.appendChild(categorySelect);

  const submitButton = document.createElement("button");
  submitButton.innerText = "Valider";
  submitButton.type = "submit";
  submitButton.className = "modale-grey-button";
  form.appendChild(submitButton);

  imageInput.style.display = "none";
  previewContainer.addEventListener("click", () => {
    imageInput.click();
  });

  // ✅ Active dynamiquement le bouton "Valider" si image + titre présents
  submitButton.disabled = true;

  const checkFormCompletion = () => {
    if (imageInput.files.length > 0 && titleInput.value.trim() !== "") {
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "#1D6154";
      submitButton.style.cursor = "pointer";
      submitButton.style.color = "white";
    } else {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#a7a7a7";
      submitButton.style.cursor = "default";
      submitButton.style.color = "white";
    }
  };

  imageInput.addEventListener("change", checkFormCompletion);
  titleInput.addEventListener("input", checkFormCompletion);

  // 📸 Affiche l’image sélectionnée dans la zone de prévisualisation
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewContainer.innerHTML = `<img src="${e.target.result}" class="image-preview-loaded" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // 📨 Soumission du formulaire pour ajouter un projet via l’API
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de l'ajout du projet");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Projet ajouté avec succès :", data);
        getWorks();
        generateModale();
      })
      .catch((error) => {
        alert("Échec de l'envoi du projet. Détail : " + error.message);
      });
  });
};

// ❌ SUPPRIMER UN PROJET
const deleteWork = (id) => {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      worksList = worksList.filter((work) => work.id !== parseInt(id));
      generateModale();
      generateWorksList();
    } else {
      alert("Erreur lors de la suppression");
    }
  });
};

if (token) {
  generateTopBar();
  generateEditButton();
}
