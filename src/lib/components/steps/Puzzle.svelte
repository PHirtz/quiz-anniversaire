<svelte:options runes={false} />
<script>
  import { onMount } from 'svelte';
  import { nextStep } from '$lib/stores/game.js';

  export let step;

  const SIZE    = step.size;
  const TOTAL   = SIZE * SIZE;

  // Positions actuelles (mélangées) → idx original de chaque case
  let positions = Array.from({ length: TOTAL }, (_, i) => i)
    .sort(() => Math.random() - 0.5);

  let selected = null;       // index de la pièce sélectionnée
  let containerSize = 0;
  let containerEl;

  onMount(() => {
    containerSize = Math.min(window.innerWidth * 0.85, 360);
  });

  $: pieceSize = containerSize / SIZE;

  function bgPos(originalIdx) {
    const col = originalIdx % SIZE;
    const row = Math.floor(originalIdx / SIZE);
    return `-${col * pieceSize}px -${row * pieceSize}px`;
  }

  function handleClick(i) {
    if (selected === null) {
      selected = i;
    } else {
      // Échange
      [positions[selected], positions[i]] = [positions[i], positions[selected]];
      positions = [...positions];
      selected = null;
      checkSolved();
    }
  }

  function checkSolved() {
    if (positions.every((orig, pos) => orig === pos)) {
      setTimeout(nextStep, 2500);
    }
  }

function pieceStyle(originalIdx, pSize, cSize) {
  const col = originalIdx % SIZE;
  const row = Math.floor(originalIdx / SIZE);
  return [
    `width:${pSize}px`,
    `height:${pSize}px`,
    `background-image:url('${step.image}')`,
    `background-size:${cSize}px ${cSize}px`,
    `background-position:-${col * pSize}px -${row * pSize}px`,
    `background-repeat:no-repeat`
  ].join(';');
}
</script>

{#if containerSize > 0}
<div
  bind:this={containerEl}
  class="container"
  style="width:{containerSize}px; height:{containerSize}px"
>
{#each positions as originalIdx, i}
  <button
    class="piece"
    class:selected={selected === i}
    style={pieceStyle(originalIdx, pieceSize, containerSize)}
    on:click={() => handleClick(i)}
    aria-label="Pièce {i + 1}"
  ></button>
{/each}
</div>
{/if}

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    margin: 16px auto 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.14);
  }

  .piece {
    cursor: pointer;
    background-repeat: no-repeat;
    border: 1px solid rgba(var(--accent-rgb), 0.18);
    transition: filter 0.2s, outline 0.15s;
    padding: 0;
  }
  .piece:hover   { filter: brightness(1.06); }
  .piece.selected { outline: 3px solid var(--accent); }
</style>
