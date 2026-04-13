# 🎂 Quiz Anniversaire — SvelteKit

## Structure du projet

```
src/
├── app.css                        ← Variables CSS du thème (couleurs, polices)
├── routes/
│   ├── +layout.svelte             ← Import du CSS global
│   └── +page.svelte               ← Page principale du jeu
└── lib/
    ├── data/
    │   └── steps.js               ← Le CONTENU : questions, puzzles, memory
    ├── stores/
    │   └── game.js                ← État global du jeu (score, progression…)
    ├── utils/
    │   └── normalize.js           ← Comparaison des réponses (accents, casse…)
    └── components/
        ├── Welcome.svelte         ← Écran d'accueil
        ├── GameOver.svelte        ← Écran de fin avec récap
        └── steps/
            ├── Quiz.svelte        ← Composant question/réponse
            ├── Memory.svelte      ← Jeu de memory
            └── Puzzle.svelte      ← Puzzle photo

public/
└── images/                        ← Les photos

reset.json                         ← Fichier de reset (héberge-le sur GitHub Pages)
```