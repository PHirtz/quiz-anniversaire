// 🎂 Données du jeu — modifie ici tes questions, puzzles et memory

export const MEMORY_EMOJIS = {
  1: "🎂", 2: "🎈", 3: "🎁", 4: "🎉",
  5: "🥳", 6: "🍰", 7: "🎊", 8: "🕯️"
};

/** @type {import('./types').Step[]} */
export const steps = [
  {
    type: "quiz",
    title: "Question 1",
    description: "Quelle est la couleur préférée de [Prénom] ?",
    aide: "",
    answer: ["bleu", "bleue"]
  },
  {
    type: "puzzle",
    title: "Puzzle 1",
    description: "Reconstituez l'image !",
    image: "images/photo1.jpg",
    size: 3
  },
  {
    type: "quiz",
    title: "Question 2",
    description: "Quel est le plat favori de [Prénom] ?",
    aide: "Demandez à sa mère !",
    answer: ["pizza", "pâtes"]
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
    description: "En quelle année est né(e) [Prénom] ?",
    aide: "",
    answer: ["1990"] // à adapter
  },
  {
    type: "puzzle",
    title: "Puzzle 2",
    description: "Reconstituez l'image !",
    image: "images/photo2.jpg",
    size: 3
  },
  {
    type: "memory",
    title: "Memory 2",
    description: "Retrouvez toutes les paires !",
    pairs: [5, 5, 6, 6, 7, 7, 8, 8]
  },
  {
    type: "quiz",
    title: "Question 4",
    description: "Quelle est la série préférée de [Prénom] ?",
    aide: "",
    answer: ["friends", "friend"]
  },
];

export const QUIZ_TOTAL = steps.filter(s => s.type === "quiz").length;

// URL du reset.json (GitHub Pages ou autre hébergement)
export const RESET_URL = "https://TON_USERNAME.github.io/TON_REPO/reset.json";
