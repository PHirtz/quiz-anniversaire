<svelte:options runes={false} />
<script>
  import { get } from 'svelte/store';
  import { score, teamName, userAnswers, resetGame } from '$lib/stores/game.js';
  import { isCorrect } from '$lib/utils/normalize.js';
  import { steps, QUIZ_TOTAL } from '$lib/data/steps.js';

  $: pct     = Math.round(($score / QUIZ_TOTAL) * 100);
  $: mention = pct === 100 ? '🏆 Score parfait !' : pct >= 70 ? '🥈 Bien joué !' : '🥉 Pas mal !';

  $: quizSteps = steps
    .map((step, i) => ({ step, i }))
    .filter(({ step }) => step.type === 'quiz');
</script>

<div class="gameover">
  <div class="header">
    <div class="icon">🎉</div>
    <h2>Bravo, {$teamName} !</h2>
    <div class="mention">{mention}</div>
    <div class="final-score">{$score} / {QUIZ_TOTAL}</div>
    <p class="pct">{pct}% de réussite</p>
  </div>

  <div class="recap">
    {#each quizSteps as { step, i }}
      {@const answer = $userAnswers[i] ?? ''}
      {@const correct = isCorrect(answer, step.answer)}
      <div class="item" class:correct class:wrong={!correct}>
        <div class="item-title">{step.title}</div>
        <div class="item-question">{step.description}</div>
        <div class="item-answer">
          <strong>Votre réponse :</strong>
          <span class:ok={correct} class:ko={!correct}>
            {answer || '(aucune réponse)'}
          </span>
        </div>
        <div class="item-good">
          <strong>Bonne réponse :</strong>
          {Array.isArray(step.answer) ? step.answer.join(' / ') : step.answer}
        </div>
      </div>
    {/each}
  </div>

  <button class="btn-reset" on:click={resetGame}>🔄 Recommencer</button>
</div>

<style>
  .gameover { padding: 8px 0; }

  .header { text-align: center; padding-bottom: 24px; }
  .icon   { font-size: 60px; margin-bottom: 8px; }

  h2 {
    font-family: var(--font-title);
    color: var(--accent);
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  .mention     { font-size: 1.6rem; margin: 10px 0; }
  .final-score { font-size: 2rem; font-weight: 600; color: var(--accent); }
  .pct         { color: var(--muted); font-size: 0.9rem; margin-top: 4px; font-style: italic; }

  .recap { display: flex; flex-direction: column; gap: 12px; }

  .item {
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 0.95rem;
    border: 1px solid;
  }
  .item.correct { background: #f0f9f4; border-color: #bde5c8; }
  .item.wrong   { background: #fff3f5; border-color: #f5c2c7; }

  .item-title    { font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }
  .item-question { color: var(--ink-dim); margin-bottom: 8px; font-style: italic; font-size: 0.9rem; }
  .item-answer   { font-size: 0.88rem; margin-bottom: 3px; }
  .item-good     { font-size: 0.85rem; color: #555; }

  .ok { color: #3daa6a; }
  .ko { color: #d64550; }

  .btn-reset {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border: 1px dashed var(--border);
    border-radius: 12px;
    background: transparent;
    color: var(--muted);
    font-family: var(--font-body);
    font-style: italic;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    opacity: 0.7;
  }
  .btn-reset:hover { opacity: 1; }
</style>
