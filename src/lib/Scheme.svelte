<script lang="ts">
  import { getSchemeState } from './state.svelte.ts';
  import type { Scheme } from './types.ts';

  let picking = $state(false);

  const scheme = getSchemeState();

  $effect(() => {
    document.documentElement.dataset.scheme = scheme.current;
  });

  function pickScheme() {
    picking = true;
  }

  function changeTo(str: Scheme) {
    scheme.set(str);
    picking = false;
  }
</script>

<svelte:head>
  <script>
    (function () {
      const qry = '(prefers-color-scheme: dark)';
      const sys = window.matchMedia(qry).matches ? 'dark' : 'light';
      const ovr = localStorage.getItem('scheme');
      const drk = ovr === 'dark' || sys === 'dark';

      if (drk) {
        document.documentElement.dataset.scheme = 'dark';
      }
    })();
  </script>
</svelte:head>

<div>
  {#if !picking}
    <button onclick={pickScheme}>{scheme.label}</button>
  {:else}
    <button onclick={() => changeTo('light')}>Light</button>
    <button onclick={() => changeTo('dark')}>Dark</button>
    <button onclick={() => changeTo('system')}>System</button>
  {/if}
</div>

<style>
</style>
