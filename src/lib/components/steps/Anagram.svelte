<svelte:options runes={false} />
<script>
  import { submitQuiz } from '$lib/stores/game.js';
  export let step;

  const word = step.answer.toUpperCase();

  function shuffle(arr) {
    let a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // s'assure que c'est bien mélangé
    if (a.join('') === word) return shuffle(arr);
    return a;
  }

  let letters = shuffle(word.split('').map((l, i) => ({ id: i, char: l, used: false })));
  let placed = [];
  let solved = false;
  let error = false;

  function pick(letter) {
    if (letter.used) return;
    letters = letters.map(l => l.id === letter.id ? { ...l, used: true } : l);
    placed = [...placed, letter];
    error = false;
  }

  function remove(i) {
    const letter = placed[i];
    letters = letters.map(l => l.id === letter.id ? { ...l, used: false } : l);
    placed = placed.filter((_, idx) => idx !== i);
    error = false;
  }

  function clear() {
    letters = letters.map(l => ({ ...l, used: false }));
    placed = [];
    error = false;
  }

  function submit() {
    const attempt = placed.map(l => l.char).join('');
    if (attempt === word) {
      solved = true;
      setTimeout(() => submitQuiz(attempt, { answer: [word] }), 1200);
    } else {
      error = true;
      setTimeout(() => {
        error = false;
        clear();
      }, 800);
    }
  }
</script>

{#if step.aide}
  <p class="aide">💡 {step.aide}</p>
{/if}

<div class="placed" class:solved class:error>
  {#if placed.length === 0}
    <span class="placeholder">_ _ _</span>
  {:else}
    {#each placed as letter, i}
      <button class="placed-letter" on:click={() => remove(i)}>
        {letter.char}
      </button>
    {/each}
  {/if}
</div>

<div class="letters">
  {#each letters as letter}
    <button
      class="letter"
      class:used={letter.used}
      on:click={() => pick(letter)}
      disabled={letter.used}
    >
      {letter.char}
    </button>
  {/each}
</div>

<div class="actions">
  <button class="clear-btn" on:click={clear}>↩ Effacer</button>
  <button class="valider" on:click={submit} disabled={placed.length !== word.length}>
    Valider
  </button>
</div>

<style>
  .aide {
    font-style: italic;
    font-size: 0.95rem;
    color: var(--accent);
    text-align: center;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(var(--accent-rgb), 0.07);
    border: 1px dashed rgba(var(--accent-rgb), 0.38);
    margin: 12px 0;
  }

  .placed {
    min-height: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin: 20px 0 12px;
    padding: 12px;
    border-radius: 14px;
    border: 2px dashed rgba(var(--accent-rgb), 0.3);
    background: rgba(var(--accent-rgb), 0.04);
    transition: all 0.2s;
  }

  .placed.solved {
    border-color: var(--success);
    background: rgba(90, 158, 106, 0.08);
  }

  .placed.error {
    border-color: var(--error);
    background: rgba(200, 60, 60, 0.08);
    animation: shake 0.4s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .placeholder {
    color: rgba(var(--accent-rgb), 0.3);
    font-family: var(--font-title);
    font-size: 1.2rem;
    letter-spacing: 0.3em;
    align-self: center;
  }

  .placed-letter {
    width: 44px;
    height: 52px;
    font-family: var(--font-title);
    font-size: 1.3rem;
    color: var(--accent);
    background: var(--card-bg);
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placed-letter:hover {
    background: rgba(var(--accent-rgb), 0.1);
    transform: translateY(-2px);
  }

  .letters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin: 8px 0 16px;
  }

  .letter {
    width: 44px;
    height: 52px;
    font-family: var(--font-title);
    font-size: 1.3rem;
    color: var(--ink);
    background: rgba(247, 252, 247, 0.85);
    border: 1px solid var(--border);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.18);
  }

  .letter.used {
    opacity: 0.2;
    cursor: default;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 4px;
  }

  .clear-btn {
    padding: 12px 16px;
    border: 1px dashed var(--border);
    border-radius: 12px;
    background: transparent;
    color: var(--muted);
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.85rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .clear-btn:hover { opacity: 1; }

  .valider {
    flex: 1;
    padding: 14px;
    border: 1px solid rgba(var(--accent-rgb), 0.38);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.12), rgba(var(--accent-rgb), 0.06));
    color: var(--accent);
    font-family: var(--font-title);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: all 0.3s;
  }

  .valider:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .valider:not(:disabled):hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.22);
    transform: translateY(-1px);
  }
</style>