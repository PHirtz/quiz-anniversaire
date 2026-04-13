<svelte:options runes={false} />
<script>
  import { submitQuiz } from '$lib/stores/game.js';
  export let step;

  const codeRef = Array.isArray(step.code) ? step.code[0] : step.code;
  const length = codeRef.length;

  let digits = Array(length).fill('');
  let inputs = [];

  function onInput(i, e) {
    digits[i] = e.target.value.slice(-1).toUpperCase();
    e.target.value = digits[i];
    if (digits[i] && i < length - 1) inputs[i + 1]?.focus();
  }

  function onKeydown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs[i - 1]?.focus();
    if (e.key === 'Enter') submit();
  }

  function submit() {
    const val = digits.join('');
    if (val.length < length) return;
    const answers = Array.isArray(step.code) ? step.code : [step.code];
    submitQuiz(val, { answer: answers });
  }
</script>

{#if step.aide}
  <p class="aide">💡 {step.aide}</p>
{/if}

<div class="digits">
  {#each digits as _, i}
    <input
      bind:this={inputs[i]}
      type="text"
      maxlength="1"
      autocomplete="off"
      spellcheck="false"
      value={digits[i]}
      on:input={e => onInput(i, e)}
      on:keydown={e => onKeydown(i, e)}
      on:focus={e => e.target.select()}
    />
  {/each}
</div>

<button on:click={submit}>🔓 Déverrouiller</button>

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

  .digits {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0 8px;
    flex-wrap: wrap;
  }

  input {
    width: 48px;
    height: 58px;
    text-align: center;
    font-family: var(--font-title);
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.05);
    border: 1px solid var(--border);
    border-radius: 12px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    caret-color: var(--accent);
  }

  input:focus {
    border-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.18);
  }

  input:not(:placeholder-shown) {
    background: rgba(var(--accent-rgb), 0.08);
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
</style>