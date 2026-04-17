<svelte:options runes={false} />
<script>
  import { onMount } from 'svelte';
  import { score, teamName, totalTime, adminReset, fetchScores } from '$lib/stores/game.js';
  import { QUIZ_TOTAL } from '$lib/data/steps.js';

  let showModal = false;
  let leaderboard = [];
  let loading = false;

  onMount(() => launchConfetti());

  async function openLeaderboard() {
    showModal = true;
    loading = true;
    leaderboard = await fetchScores();
    loading = false;
  }

  function formatTime(seconds) {
    if (!seconds) return '--:--';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function getMedal(i) {
    return ['🥇','🥈','🥉'][i] ?? `${i + 1}.`;
  }

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
        z-index:10;
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
  <p class="subtitle">Tu as terminé le jeu !</p>

  <p class="score-final">Score : <strong>{$score} / {QUIZ_TOTAL}</strong></p>

  {#if $totalTime !== null}
    <p class="time-final">⏱ Temps : <strong>{formatTime($totalTime)}</strong></p>
  {/if}

  {#if $score === QUIZ_TOTAL}
    <p class="mention">🏆 Score parfait, chapeau !</p>
  {:else if $score >= QUIZ_TOTAL * 0.75}
    <p class="mention">🌟 Très beau score !</p>
  {:else if $score >= QUIZ_TOTAL * 0.5}
    <p class="mention">👍 Pas mal du tout !</p>
  {:else}
    <p class="mention">🐨 L'important c'est d'avoir joué !</p>
  {/if}

  <img
    src="https://i.makeagif.com/media/3-17-2024/TwpVZL.gif"
    alt="Les Inconnus - J'ai gagné !"
    class="gif-victory"
  />

  <button class="btn-leaderboard" on:click={openLeaderboard}>
    🏆 Voir le classement
  </button>

  <p class="no-replay">🔒 Ton score est enregistré !</p>
  <button class="admin-btn" on:click={adminReset}>⚙</button>
</div>

{#if showModal}
  <dialog open on:click|self={() => showModal = false}>
    <div class="modal">
      <h3>🏆 Classement</h3>

      {#if loading}
        <p class="loading">Chargement...</p>
      {:else if leaderboard.length === 0}
        <p class="empty">Aucun score pour l'instant !</p>
      {:else}
        <ul class="leaderboard">
          {#each leaderboard as entry, i}
            <li class:me={entry.name === $teamName}>
              <span class="medal">{getMedal(i)}</span>
              <span class="player-name">{entry.name}</span>
              <span class="player-score">{entry.score}/{QUIZ_TOTAL}</span>
              <span class="player-time">⏱ {formatTime(entry.time)}</span>
            </li>
          {/each}
        </ul>
      {/if}

      <button class="btn-close" on:click={() => showModal = false}>Fermer ✕</button>
    </div>
  </dialog>
{/if}

<style>
  .victory { text-align: center; padding: 12px 0; }

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

  h2 { font-family: var(--font-title); font-size: 1.5rem; color: var(--accent); letter-spacing: 0.1em; margin-bottom: 8px; }
  .subtitle { color: var(--ink-dim); font-style: italic; margin-bottom: 6px; }
  .score-final { font-size: 1.15rem; color: var(--accent); margin: 14px 0 6px; }
  .time-final { font-size: 1rem; color: var(--ink-dim); font-style: italic; margin: 4px 0 10px; }
  .mention { font-size: 0.95rem; font-style: italic; color: var(--ink-dim); margin: 4px 0 10px; }

  .gif-victory {
    width: 220px;
    height: auto;
    margin: 16px auto;
    display: block;
    border-radius: 12px;
  }

  .btn-leaderboard {
    width: 60%;
    margin-top: 8px;
    padding: 13px;
    border: 1px solid rgba(var(--accent-rgb), 0.38);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.12), rgba(var(--accent-rgb), 0.06));
    color: var(--accent);
    font-family: var(--font-title);
    font-size: 0.70rem;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-leaderboard:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.22);
    transform: translateY(-1px);
  }

  .no-replay { font-size: 0.85rem; color: var(--muted); font-style: italic; margin-top: 16px; opacity: 0.6; }

  .admin-btn {
    opacity: 0.15;
    font-size: 0.7rem;
    border: none;
    background: transparent;
    cursor: pointer;
    margin-top: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .admin-btn:hover { opacity: 0.5; }

  /* ── Modal ── */
  dialog {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background: rgba(0,0,0,0.45);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: none;
    cursor: default;
  }

  dialog::backdrop {
    background: transparent;
  }

  .modal {
    background: var(--card-bg);
    border: 1px solid rgba(var(--accent-rgb), 0.22);
    border-radius: 20px;
    padding: 28px 24px;
    width: calc(100% - 32px);
    max-width: 520px;
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    cursor: auto;
  }

  h3 {
    font-family: var(--font-title);
    font-size: 1.2rem;
    color: var(--accent);
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
  }

  .loading, .empty {
    text-align: center;
    color: var(--ink-dim);
    font-style: italic;
    padding: 20px 0;
  }

  .leaderboard {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .leaderboard li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(var(--accent-rgb), 0.04);
    border: 1px solid var(--border);
    font-size: 0.9rem;
  }

  .leaderboard li.me {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: var(--accent);
    font-weight: 600;
  }

  .medal { font-size: 1.1rem; min-width: 28px; }
  .player-name { flex: 1; color: var(--ink); }
  .player-score { color: var(--accent); font-weight: 600; }
  .player-time { color: var(--ink-dim); font-size: 0.8rem; }

  .btn-close {
    width: 100%;
    padding: 11px;
    border: 1px dashed var(--border);
    border-radius: 12px;
    background: transparent;
    color: var(--muted);
    font-size: 0.85rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .btn-close:hover { opacity: 1; }

  :global(.confetti-petal) { animation: confettiFall linear forwards; }
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