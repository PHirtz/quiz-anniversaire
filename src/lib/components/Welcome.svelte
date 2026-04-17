<svelte:options runes={false} />
<script>
  import { teamName, startTimer } from '$lib/stores/game.js';

  export let onStart;

  let inputValue = '';
  let error = false;

  function start() {
    if (!inputValue.trim()) { error = true; return; }
    teamName.set(inputValue.trim());
    onStart();
    startTimer();
  }

  function onKeydown(e) {
    if (e.key === 'Enter') start();
  }
</script>

<div class="welcome">
  <div class="deco">
    <span class="icon">🎂</span>
    <div class="title">Jeu d'Anniversaire Biche</div>
    <div class="subtitle">Le grand quiz des invités</div>
    <p class="p">Tente de gagner l'un des prix !</p>
    <p class="missclick">Tu as jusqu'à 22h pour répondre aux questions, fais attention aux missclick...</p>
  </div>

  <div class="divider"><span>✦</span></div>

  <label for="team-input">Nom du joueur</label>
  <input
    id="team-input"
    type="text"
    bind:value={inputValue}
    placeholder="Ton name game..."
    class:error
    on:keydown={onKeydown}
    on:input={() => error = false}
  />
  {#if error}
    <p class="error-msg">Entre un nom de joueur !</p>
  {/if}

  <button on:click={start}>Commencer →</button>
</div>

<style>
  .welcome {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px 36px 40px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    animation: fadeUp 0.6s ease both;
  }

  .deco { text-align: center; margin-bottom: 28px; }

  .icon {
    font-size: 48px;
    display: block;
    margin-bottom: 12px;
    animation: sway 4s ease-in-out infinite;
  }
  @keyframes sway {
    0%, 100% { transform: rotate(-6deg) scale(1); }
    50%       { transform: rotate(6deg) scale(1.05); }
  }

  .title {
    font-family: var(--font-title);
    font-size: 1.6rem;
    color: var(--accent);
    letter-spacing: 0.08em;
  }

  .subtitle {
    font-style: italic;
    font-size: 0.85rem;
    color: var(--muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 6px;
    opacity: 0.7;
  }

  .p {
    font-size: 0.95rem;
    color: var(--ink-dim);
    line-height: 1.6;
    margin-top: 16px;
  }

  .missclick {
    font-size: 0.85rem;
    color: var(--error);
    margin-top: 8px;
    font-style: italic;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  .divider span { color: var(--muted); font-size: 16px; }

  label {
    display: block;
    font-family: var(--font-title);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.85);
    color: var(--ink);
    font-family: var(--font-body);
    font-size: 1.1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-bottom: 4px;
  }
  input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.18); }
  input.error { border-color: var(--error); }
  input::placeholder { color: var(--muted); font-style: italic; opacity: 0.7; }

  .error-msg { color: var(--error); font-size: 0.85rem; margin-bottom: 8px; font-style: italic; }

  button {
    width: 100%;
    margin-top: 12px;
    padding: 15px;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.14), rgba(var(--accent-rgb), 0.08));
    color: var(--accent);
    font-family: var(--font-title);
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: all 0.3s;
  }
  button:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.22); transform: translateY(-1px); }
  button:active { transform: scale(0.98); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
