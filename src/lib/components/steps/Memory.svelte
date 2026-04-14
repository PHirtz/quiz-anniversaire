<script>
  import { nextStep, addPoint } from '$lib/stores/game.js';
  import { MEMORY_EMOJIS } from '$lib/data/steps.js';
  export let step;

  let cards = step.pairs.slice().sort(() => Math.random() - 0.5);
  let first  = null;
  let second = null;
  let busy   = false;
  let states = cards.map(() => ({ flipped: false, matched: false }));

  function flip(i) {
    if (busy || states[i].matched || i === first) return;
    states[i].flipped = true;
    states = [...states];
    if (first === null) {
      first = i;
    } else {
      second = i;
      if (cards[first] === cards[second]) {
        states[first].matched  = true;
        states[second].matched = true;
        states = [...states];
        first = second = null;
        if (states.every(s => s.matched)) {
          addPoint(); 
          setTimeout(nextStep, 1800);
        }
      } else {
        busy = true;
        const f = first, s = second;
        setTimeout(() => {
          states[f].flipped = false;
          states[s].flipped = false;
          states = [...states];
          first = second = null;
          busy = false;
        }, 700);
      }
    }
  }
</script>

<div class="grid" style="--cols: 4">
  {#each cards as val, i}
    <button
      class="cell"
      class:flipped={states[i].flipped}
      class:matched={states[i].matched}
      on:click={() => flip(i)}
      aria-label="Carte {i + 1}"
    >
      {#if states[i].flipped || states[i].matched}
        {MEMORY_EMOJIS[val] ?? val}
      {/if}
    </button>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: 8px;
    margin-top: 16px;
  }

  .cell {
    aspect-ratio: 1;
    background: rgba(247, 252, 247, 0.75);
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    cursor: pointer;
    transition: all 0.25s;
    user-select: none;
    padding: 0;
    font-family: inherit;
    color: inherit;
    width: 100%;
  }
  .cell:hover:not(.matched) {
    border-color: var(--accent);
    transform: scale(1.04);
    box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.18);
  }
  .cell.flipped {
    background: rgba(220, 240, 225, 0.9);
    border-color: rgba(var(--accent-rgb), 0.5);
  }
  .cell.matched {
    background: rgba(90, 158, 106, 0.12);
    border-color: var(--success);
    cursor: default;
    animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes pop {
    0%   { transform: scale(1); }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
</style>
