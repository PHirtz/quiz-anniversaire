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
    │   └── steps.js               ← ✏️  TON CONTENU : questions, puzzles, memory
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
└── images/                        ← Place tes photos ici (photo1.jpg, photo2.jpg…)

reset.json                         ← Fichier de reset (héberge-le sur GitHub Pages)
```

## Pour personnaliser

### 1. Les questions → `src/lib/data/steps.js`
Modifie le tableau `steps` avec tes questions, réponses, et images.

### 2. Le thème → `src/app.css`
Change les variables CSS dans `:root` (couleurs, polices).
Les émojis des pétales sont dans `+page.svelte`.

### 3. Le reset distant → `src/lib/data/steps.js`
Change `RESET_URL` vers ton fichier `reset.json` hébergé.
Pour déclencher un reset, incrémente `version` dans ce fichier.

## Installation & lancement

```bash
npm install
npm run dev        # développement
npm run build      # production → dossier build/
npm run preview    # prévisualiser le build
```

## Déploiement GitHub Pages

```bash
npm run build
# Copie le contenu de build/ dans ta branche gh-pages
```

Si ton repo est dans un sous-dossier, décommente dans `svelte.config.js` :
```js
paths: { base: '/nom-du-repo' }
```
