export const NPOINT_ID = '35c1fc19bca0f09571dc';

export const MEMORY_EMOJIS = {
  1: "🎂", 2: "🎈", 3: "🎁", 4: "🎉",
  5: "🥳", 6: "❤️", 7: "🍩", 8: "🐨",
  9: "✨", 10: "🎀", 11: "🦌", 12: "🍰", 13: "🎊", 14: "👸🏾",
};

export const steps = [
  {
    type: "puzzle",
    title: "La naissance d'une déesse",
    description: "Reconstituez l'image !",
    image: "/images/photo0.jpg",
    size: 3
  },
  {
    type: "quiz",
    title: "Question 1",
    description: "Quels sports Aurélie n'a pas pratiqué ?",
    aide: "Pas le droit de demander à la concernée !",
    options: ["Basketball", "Judo", "Athlétisme", "GRS", "Natation", "Lancer de poids"],
    answer: ["Basketball"]
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
    type: "anagram",
    title: "Anagramme 1",
    description: "Reconstituez le mot !",
    aide: "Sa phobie ...️",
    answer: "ARAIGNEES"
  },
  {
    type: "code",
    title: "Question 3",
    description: "Quel est le titre de ce manga ?",
    image: "/images/devinette1.jpg",
    code: "Jeanne et Serge"
  },
  {
    type: "quiz",
    title: "Question 4",
    description: "Quel est le second prénom d'Aurélie ?",
    aide: "",
    options: ["Marie", "Madeleine", "Anne", "Colette"],
    answer: ["Madeleine"]
  },
  {
    type: "memory",
    title: "Memory 2",
    description: "Retrouvez toutes les paires !",
    pairs: [5, 5, 6, 6, 7, 7, 8, 8]
  },
  {
    type: "puzzle",
    title: "L'enfant parfaite",
    description: "Reconstituez l'image !",
    image: "/images/photo1.jpg",
    size: 3
  },
  {
    type: "anagram",
    title: "Anagramme 2",
    description: "Reconstituez le mot !",
    aide: "De qui a-t-elle le plus peur ? 😏",
    answer: "PERSONNE"
  },
  {
    type: "code",
    title: "Question 5",
    description: "Quel est son animal fétiche ?",
    aide: "",
    code: ["KOALA", "koala", "Koala", "KoAlA"]
  },
  {
    type: "quiz",
    title: "Question 6",
    description: "Quel est son plat préféré ?",
    aide: "Personne le fait mieux que Maman, elle attend de longs mois pour en manger !",
    image: "/images/devinette2.jpg",
    options: ["Fumbwa", "Bourguignon", "Dongo Dongo", "Couscous Royal"],
    answer: ["Dongo Dongo"]
  },
  {
    type: "quiz",
    title: "Question 7",
    description: "Quelle est sa plus grande qualité ?",
    aide: "Il y en a beaucoup, mais il n'en faut qu'une !",
    options: ["Gentillesse", "Loyauté", "Intelligence", "Drôle"],
    answer: ["Loyauté"]
  },

  {
    type: "quiz",
    title: "Question 8",
    description: "Et celle qui lui fait du tort ?",
    aide: "Et c'est pour ça aussi qu'on l'aime !",
    options: ["Franchise", "Empathie", "Curiosité", "Gourmandise"],
    answer: ["Franchise"]
  },
  {
    type: "anagram",
    title: "Anagramme 3",
    description: "Reconstituez le mot !",
    aide: "Sa plus grande peur (fun fact : Elle voulait se construire un bunker 😊)",
    answer: "ATTENTATS"
  },
  {
    type: "puzzle",
    title: "Sa moitié, son âme sœur...",
    description: "Reconstituez l'image !",
    image: "/images/photo3.jpg",
    size: 3
  },
  {
    type: "quiz",
    title: "Question 9",
    description: "Quel est son fruit préféré ?",
    aide: "",
    options: ["Fraise", "Mangue", "Fruit de la passion", "Cerise", "Mirabelle", "Framboise"],
    answer: ["Mangue"]
  },
  {
    type: "memory",
    title: "Memory 3",
    description: "Retrouvez toutes les paires !",
    pairs: [9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14]
  },
  {
    type: "anagram",
    title: "Anagramme 4",
    description: "Reconstituez le mot !",
    aide: "C'est la reine du game :",
    answer: "MONOPOLI"
  },
  {
    type: "puzzle",
    title: "L'enfant, la femme, la mère, la sœur, l'amie que tout le monde rêve d'avoir",
    description: "Reconstituez l'image !",
    image: "/images/photo2.jpg",
    size: 3
  },
  {
    type: "message",
    title: "À ma sœur, mon modèle, mon soleil... 💛",
    description: "Je n'ai pas les mots pour te dire à quel point je t'aime, c'est tous les ans pareil, je déborde d'amour pour toi.\n\nLorsque je dois t'écrire je finis toujours en larmes, tu sais ce que je ressens, tu sais que mon cœur cesserait de battre sans toi, tu es une partie de moi...\n\nJe suis si fière de la femme que tu es et te souhaite le meilleur.\n\nJoyeux anniversaire ma sista chérie, je t'aime fort fort FORT ! 🫶"
  }
];

export const QUIZ_TOTAL = steps.filter(s => s.type !== "message").length;
export const RESET_URL = '/reset.json';