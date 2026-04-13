export const MEMORY_EMOJIS = {
  1: "🎂", 2: "🎈", 3: "🎁", 4: "🎉",
  5: "🥳", 6: "🍰", 7: "🎊", 8: "🐨"
};

/** @type {import('./types').Step[]} */
export const steps = [
  {
    type: "quiz",
    title: "Question 1",
    description: "Quels sports Aurélie n'a pas pratiqué ?",
    aide: "Pas le droit de demander à la concernée !",
    options: ["Basketball", "Judo", "Athlétisme", "GRS", "Natation", "Lancer de poids"],
    answer: ["Basketball"]
  },
  {
    type: "puzzle",
    title: "La naissance d'une déesse",
    description: "Reconstituez l'image !",
    image: "/images/photo0.jpg",
    size: 3
  },
  {
    type: "code",
    title: "Question 2",
    description: "Dans quel sport a-t-elle été championne de France enfant ?",
    aide: "Demandez à sa maman si tu ne trouves pas !",
    code: "GRS"
  },
  {
    type: "memory",
    title: "Memory 1",
    description: "Retrouvez toutes les paires !",
    pairs: [1, 1, 2, 2, 3, 3, 4, 4]
  },
  {
    type: "quiz",
    title: "Question 3",
    description: "Quel est le second prénom d'Aurélie ?",
    aide: "",
    options: ["Marie", "Madeleine", "Anne", "Colette"],
    answer: ["Madeleine"]
  },
  {
    type: "puzzle",
    title: "L'enfant parfaite",
    description: "Reconstituez l'image !",
    image: "images/photo1.jpg",
    size: 3
  },
  {
    type: "memory",
    title: "Memory 2",
    description: "Retrouvez toutes les paires !",
    pairs: [5, 5, 6, 6, 7, 7, 8, 8]
  },
  {
    type: "code",
    title: "Question 4",
    description: "Quel est son animal fetiche ?",
    aide: "",
    code: ["KOALA", "koala", "Koala", "KoAlA"]
  },
  {
    type: "quiz",
    title: "Question 5",
    description: "Quelle est sa plus grande qualité ?",
    aide: "Il y en a beaucoup, mais il faut n'en choisir qu'une !",
    options: ["Gentillesse", "Loyauté", "Intelligence", "Drole"],
    answer: ["Loyauté"]
  },
   {
    type: "quiz",
    title: "Question 6",
    description: "Et celle qui lui fait du tord ?",
    aide: "Et c'est pour ça aussi qu'on l'aime !",
    options: ["Franchise","Empathie","Curiosité","Gourmandise"],
    answer: ["Franchise"]
  }, 
  {
    type: "puzzle",
    title: "L'enfant, La femme, la mère, la sœur, l'amie que tout le monde rêve d'avoir",
    description: "Reconstituez l'image !",
    image: "images/photo2.jpg",
    size: 3
  }
];

export const QUIZ_TOTAL = steps.filter(s => s.type === "quiz").length;

// URL du reset.json (GitHub Pages ou autre hébergement)
export const RESET_URL = '/reset.json';