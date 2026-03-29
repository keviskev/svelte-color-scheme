<script lang="ts">
  import { getSchemeState } from '../lib/state.svelte.ts';

  let scheme = getSchemeState();
  let s = $derived.by(() => {
    return scheme.sitePref;
  });

  $effect(() => {
    scheme.set(s);
    document.documentElement.dataset.scheme = scheme.current;
  });
</script>

<div class="switch">
  <label
    >Light
    <input type="radio" bind:group={s} value="light" class="sw-npt l" />
  </label>
  <label
    >System
    <input type="radio" bind:group={s} value="system" class="sw-npt s" checked />
  </label>
  <label
    >Dark
    <input type="radio" bind:group={s} value="dark" class="sw-npt d" />
  </label>
  <span class="selector"></span>
</div>

<style>
  label {
    position: relative;
    z-index: 2;
    margin: 0 0.5rem;
    font-weight: bold;
    color: var(--page-element-text);
  }
  .switch {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.25rem;
    user-select: false;
    background: var(--page-element-bg-variant);
    overflow-x: hidden;
  }
  .sw-npt {
    display: none;
  }
  label:has(input[type='radio']:checked) {
    color: var(--page-element-header-color);
  }
  .selector {
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 33.33%;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 0.25rem;
    transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
  label:has(input[type='radio'].l:checked) ~ .selector {
    transform: translateX(0%);
    background: var(--pa);
    width: 30%;
  }
  label:has(input[type='radio'].s:checked) ~ .selector {
    transform: translateX(87.7%);
    background: var(--nd);
    width: 37%;
  }
  label:has(input[type='radio'].d:checked) ~ .selector {
    transform: translateX(235%);
    background: var(--ah);
    width: 30%;
  }
</style>
