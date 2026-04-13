<svelte:options runes={false} />
<script>
  import { onMount } from 'svelte';
  import { score, teamName, resetGame } from '$lib/stores/game.js';
  import { QUIZ_TOTAL } from '$lib/data/steps.js';

  onMount(() => launchConfetti());

  function launchConfetti() {
    const symbols = ["🎂","🎈","🎁","🎉","🥳","🍰","🎊","✨","🌟","🎶","🫶","💫","🐨"];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement("span");
      p.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      p.classList.add('confetti-petal');
      p.style.cssText = `
        position:fixed;
        top:-2rem;
        left:${Math.random() * 100}vw;
        font-size:${1 + Math.random() * 1.5}rem;
        z-index:999;
        pointer-events:none;
        animation: confettiFall ${3 + Math.random() * 5}s ${Math.random() * 3}s linear forwards;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 8000);
    }
  }
</script>

<div class="victory">
  <span class="cake">🎂</span>
  <h2>Bravo {$teamName} !</h2>
  <p class="subtitle">Vous avez relevé tous les défis !</p>
  <p class="score-final">Score : <strong>{$score} / {QUIZ_TOTAL}</strong></p>

  {#if $score === QUIZ_TOTAL}
    <p class="mention">🏆 Score parfait, chapeau !</p>
  {:else if $score >= QUIZ_TOTAL * 0.75}
    <p class="mention">🌟 Très beau score !</p>
  {:else if $score >= QUIZ_TOTAL * 0.5}
    <p class="mention">👍 Pas mal du tout !</p>
  {:else}
    <p class="mention">🐨 L'important c'est d'avoir joué !</p>
  {/if}

  <p class="emojis">🎂 🎈 🎉 🐨</p>
  <button on:click={resetGame}>↩ Rejouer</button>
</div>

<style>
  .victory {
    text-align: center;
    padding: 12px 0;
  }

  .cake {
    display: block;
    font-size: 3.5rem;
    margin-bottom: 12px;
    animation: bounce 1s ease infinite alternate;
  }

  @keyframes bounce {
    from { transform: translateY(0) rotate(-5deg); }
    to   { transform: translateY(-10px) rotate(5deg); }
  }

  h2 {
    font-family: var(--font-title);
    font-size: 1.5rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--ink-dim);
    font-style: italic;
    margin-bottom: 6px;
  }

  .score-final {
    font-size: 1.15rem;
    color: var(--accent);
    margin: 14px 0 6px;
  }

  .mention {
    font-size: 0.95rem;
    font-style: italic;
    color: var(--ink-dim);
    margin: 4px 0 10px;
  }

  .emojis {
    font-size: 1.8rem;
    letter-spacing: 0.3em;
    margin: 16px 0;
  }

  button {
    margin-top: 16px;
    padding: 12px 28px;
    border: 1px solid rgba(var(--accent-rgb), 0.38);
    border-radius: 12px;
    background: transparent;
    color: var(--accent);
    font-family: var(--font-title);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  button:hover { opacity: 1; }

:global(.confetti-petal) {
    animation: confettiFall linear forwards;
  }
</style>

<svelte:head>
  <style>
    @keyframes confettiFall {
      0%   { opacity: 0; transform: translateY(-30px) rotate(0deg); }
      10%  { opacity: 0.9; }
      90%  { opacity: 0.3; }
      100% { opacity: 0; transform: translateY(110vh) rotate(540deg) translateX(40px); }
    }
  </style>
</svelte:head>