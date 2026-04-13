<svelte:options runes={false} />
<script>
  import { onMount } from 'svelte';
  import { submitQuiz } from '$lib/stores/game.js';

  export let step;

  let value = '';
  let inputEl;

  onMount(() => setTimeout(() => inputEl?.focus(), 50));

  function submit() {
    submitQuiz(value, step);
  }

  function onKeydown(e) {
    if (e.key === 'Enter') submit();
  }
</script>

{#if step.aide}
  <p class="aide">💡 {step.aide}</p>
{/if}

<input
  bind:this={inputEl}
  bind:value
  type="text"
  placeholder="Votre réponse..."
  on:keydown={onKeydown}
/>

<button on:click={submit}>Valider</button>

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

  input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(247, 252, 247, 0.85);
    color: var(--ink);
    font-family: inherit;
    font-size: 1.1rem;
    outline: none;
    margin-top: 16px;
    margin-bottom: 4px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.18);
  }
  input::placeholder {
    color: var(--muted);
    font-style: italic;
    opacity: 0.7;
  }

  button {
    width: 100%;
    margin-top: 12px;
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
  button:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.22);
    transform: translateY(-1px);
  }
  button:active { transform: scale(0.98); }
</style>
