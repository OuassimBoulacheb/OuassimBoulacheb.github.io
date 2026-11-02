// ===== Tes projets : modifie / ajoute ici, le site se met à jour tout seul =====
// cat : "dev" | "design" | "com"  ·  image : chemin dans img/ (optionnel)
// lien : le projet en ligne  ·  code : le dépôt GitHub (les deux sont optionnels)
const PROJETS = [
  { titre:"Films de super-héros (SAE203)", cat:"dev", annee:2026,
    resume:"Site de films en PHP et MySQL, avec catalogue, recherche et espace admin.",
    details:"Un site dynamique sur l'univers Marvel et DC. Les films sont stockés dans une base de données MySQL et affichés par PHP : un catalogue, un formulaire de recherche, et un tableau de bord protégé par mot de passe pour gérer les films.",
    tags:["PHP","MySQL / PDO","HTML/CSS"],
    image:"img/sae203.jpg", alt:"Page d'accueil du site Films de super-héros",
    lien:"https://sae203.mmi25f15.mmi-troyes.fr/index.php",
    code:"https://github.com/OuassimBoulacheb/sae203-films-super-heros" },
  { titre:"Salvador Dalí (SAE204)", cat:"design", annee:2026,
    resume:"Site hommage qui imagine Dalí comme un jeune peintre qui débute.",
    details:"Un site multi-pages sur Dalí, pensé comme un portrait fictif : un artiste de 22 ans qui cherche sa place. Ambiance sombre et dorée, grande typographie, galerie de toiles. Mis en ligne sur le serveur de l'école.",
    tags:["HTML/CSS/JS","Direction artistique","Mise en ligne"],
    image:"img/sae204.jpg", alt:"Page d'accueil du site Salvador Dalí",
    lien:"https://mmi25f15.mmi-troyes.fr/Sae204/" },
  { titre:"Toy Story : cartes de personnages", cat:"dev", annee:2026,
    resume:"Des fiches de personnages générées en JavaScript à partir d'un fichier JSON.",
    details:"Exercice de cours : le script charge un fichier JSON avec fetch, puis construit une carte pour chaque personnage (photo, nom, description) et l'affiche dans la page.",
    tags:["JavaScript","JSON","fetch"],
    image:"img/exo4.jpg", alt:"Cartes de personnages Toy Story",
    lien:"exercices/sequence1/exo4/exo04.html" },
  { titre:"Formulaire de newsletter", cat:"dev", annee:2026,
    resume:"Un formulaire d'inscription dont les données sont validées par PHP.",
    details:"Exercice de cours : un formulaire d'inscription à une newsletter. Le script envoie le prénom et l'email au serveur, qui les vérifie avec PHP (prénom de 3 à 15 lettres, email valide) et renvoie soit les erreurs, affichées sous chaque champ, soit un message de réussite. Comme PHP ne tourne pas sur GitHub Pages, la fiche montre les deux états en capture et renvoie vers le code.",
    tags:["PHP","JavaScript","Validation"],
    image:"img/formulaire.jpg", alt:"Formulaire de newsletter : erreurs de validation à gauche, message de réussite à droite",
    code:"https://github.com/OuassimBoulacheb/formulaire-inscription-php" }
];
