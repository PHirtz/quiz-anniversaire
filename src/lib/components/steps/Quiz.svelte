<svelte:options runes={false} />
<script>
  import { base } from '$app/paths';
  import { submitQuiz } from '$lib/stores/game.js';
  export let step;

  let selected = [];

  function toggle(option) {
    const isMultiple = Array.isArray(step.answer) && step.answer.length > 1;
    if (isMultiple) {
      if (selected.includes(option)) {
        selected = selected.filter(o => o !== option);
      } else {
        selected = [...selected, option];
      }
    } else {
      selected = selected.includes(option) ? [] : [option];
    }
  }

  function submit() {
    if (selected.length === 0) return;
    submitQuiz(selected, step);
  }
</script>

{#if step.image}
  <img src="{base}{step.image}" alt="Devinez !" class="question-img" />
{/if}

{#if step.aide}
  <p class="aide">💡 {step.aide}</p>
{/if}

<div class="options">
  {#each step.options as option}
    <button
      class="option"
      class:selected={selected.includes(option)}
      on:click={() => toggle(option)}
    >
      {option}
    </button>
  {/each}
</div>

<button class="valider" on:click={submit} disabled={selected.length === 0}>
  Valider
</button>

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
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
    justify-content: center;
  }
  .option {
    padding: 12px 20px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(247, 252, 247, 0.85);
    color: var(--ink);
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .option:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 14px rgba(var(--accent-rgb), 0.18);
    transform: translateY(-1px);
  }
  .option.selected {
    background: rgba(var(--accent-rgb), 0.15);
    border-color: var(--accent);
    color: var(--accent);
    font-weight: 600;
  }
  .question-img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 14px;
    object-fit: cover;
    max-height: 220px;
  }
  .valider {
    width: 100%;
    margin-top: 16px;
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