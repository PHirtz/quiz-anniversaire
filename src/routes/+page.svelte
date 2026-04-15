<svelte:options runes={false} />

<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import {
    current, score, teamName, gameOver, feedback,
    nextStep, checkRemoteReset
  } from '$lib/stores/game.js';
  import { steps, QUIZ_TOTAL } from '$lib/data/steps.js';

  import Welcome  from '$lib/components/Welcome.svelte';
  import GameOver from '$lib/components/GameOver.svelte';
  import Quiz     from '$lib/components/steps/Quiz.svelte';
  import Memory   from '$lib/components/steps/Memory.svelte';
  import Puzzle   from '$lib/components/steps/Puzzle.svelte';
  import Code     from '$lib/components/steps/Code.svelte';
  import Anagram from '$lib/components/steps/Anagram.svelte';

  function onStart() {}

  onMount(() => {
    checkRemoteReset(base);
    const interval = setInterval(() => checkRemoteReset(base), 30000);
    return () => clearInterval(interval);
  });
</script>

<div class="petals" aria-hidden="true">
  {#each Array(14) as _, i}
    <span class="petal" style="left:{Math.random()*100}vw; animation-duration:{9+Math.random()*10}s; animation-delay:{Math.random()*15}s; font-size:{0.8+Math.random()}rem">
      {['🎂','🎈','🐨','🎁','🎉','🥳','🍰','🐨','🎊','✨'][i % 10]}
    </span>
  {/each}
</div>

<main class="app">

  {#if !$teamName}
    <Welcome {onStart} />

  {:else if $gameOver}
    <div class="card">
      <GameOver />
    </div>

  {:else if steps[$current].type === 'message'}
    <div class="card message-card">
      <h2>{steps[$current].title}</h2>
      <div class="message-body">
        {#each steps[$current].description.split('\n') as line}
          <p>{line}</p>
        {/each}
      </div>
      <button class="skip" on:click={nextStep}>Continuer ›</button>
    </div>

  {:else}
    <header>
      <h1>🎂 Quizz</h1>
      <span class="progress-text">Étape {$current + 1} / {steps.length}</span>
    </header>

    <div class="meta">
      <span class="team-badge">👥 {$teamName}</span>
      <span class="score-badge">⭐ {$score} / {QUIZ_TOTAL}</span>
    </div>

    <div class="progress-track">
      <div class="progress-fill" style="width:{($current / steps.length) * 100}%"></div>
    </div>

    <div class="card">
      <span class="lock">{$feedback ? '🔓' : '🔒'}</span>
      <h2>{steps[$current].title}</h2>
      <p class="description">{steps[$current].description}</p>

      {#key $current}
        {#if steps[$current].type === 'quiz'}
          <Quiz step={steps[$current]} />
        {:else if steps[$current].type === 'memory'}
          <Memory step={steps[$current]} />
          <button class="skip" on:click={nextStep}>Passer ›</button>
        {:else if steps[$current].type === 'puzzle'}
          <Puzzle step={steps[$current]} />
          <button class="skip" on:click={nextStep}>Passer ›</button>
        {:else if steps[$current].type === 'code'}
          <Code step={steps[$current]} />
          <button class="skip" on:click={nextStep}>Passer ›</button>
        {:else if steps[$current].type === 'anagram'}
          <Anagram step={steps[$current]} />
          <button class="skip" on:click={nextStep}>Passer ›</button>
        {/if}
      {/key}

      {#if $feedback}
        <p class="feedback" class:ok={$feedback.startsWith('✅')}>{$feedback}</p>
      {/if}
    </div>
  {/if}

</main>

<style>
  .app { position:relative; z-index:1; width:100%; max-width:460px; padding:24px 16px 48px; margin:0 auto; }
  header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
  header h1 { font-family:var(--font-title); font-size:1rem; font-weight:400; color:var(--accent); letter-spacing:.12em; }
  .progress-text { font-family:var(--font-title); font-size:.7rem; letter-spacing:.1em; color:var(--ink-dim); opacity:.8; }
  .meta { display:flex; gap:8px; margin-bottom:6px; flex-wrap:wrap; }
  .team-badge, .score-badge { font-family:var(--font-title); font-size:.72rem; letter-spacing:.1em; color:var(--accent); padding:4px 12px; border:1px solid var(--border); border-radius:20px; background:rgba(var(--accent-rgb),.06); }
  .progress-track { height:2px; background:var(--border); border-radius:4px; margin-bottom:20px; overflow:hidden; }
  .progress-fill { height:100%; background:linear-gradient(to right,var(--accent),var(--accent-light)); border-radius:4px; transition:width .5s ease; }
  .card { background:var(--card-bg); border:1px solid rgba(var(--accent-rgb),.22); border-radius:24px; padding:32px 28px; box-shadow:0 8px 40px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.85); backdrop-filter:blur(10px); position:relative; z-index:20; scroll-margin-bottom: 300px;}
  .lock { display:block; font-size:2.4rem; text-align:center; margin-bottom:16px; }
  h2 { font-family:var(--font-title); font-size:1.3rem; font-weight:400; color:var(--accent); letter-spacing:.08em; text-align:center; margin-bottom:10px; }
  .description { font-size:1.05rem; font-style:italic; color:var(--ink-dim); text-align:center; line-height:1.65; margin-bottom:4px; }
  .feedback { min-height:22px; margin-top:12px; font-size:.95rem; font-style:italic; text-align:center; color:var(--error); }
  .feedback.ok { color:var(--success); }
  .skip { width:100%; margin-top:14px; padding:10px; border:1px dashed var(--border); border-radius:10px; background:transparent; color:var(--muted); font-family:var(--font-body); font-style:italic; font-size:.85rem; cursor:pointer; opacity:.6; transition:opacity .2s; }
  .skip:hover { opacity:1; }
  .message-card { text-align:center; }
  .message-body p { margin-bottom:14px; line-height:1.8; font-style:italic; color:var(--ink-dim); }
  .petals { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .petal { position:absolute; opacity:0; animation:fall linear infinite; }
  @keyframes fall { 0%{opacity:0;transform:translateY(-30px) rotate(0deg)} 10%{opacity:.4} 90%{opacity:.15} 100%{opacity:0;transform:translateY(110vh) rotate(540deg) translateX(30px)} }
</style>