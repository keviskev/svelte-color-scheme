<script lang="ts">
  import { getSchemeState, type Scheme } from './state.svelte.ts';

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

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    <button onclick={pickScheme}>{capitalize(scheme.sitePref)}</button>
  {:else}
    <button onclick={() => changeTo('light')}>Light</button>
    <button onclick={() => changeTo('dark')}>Dark</button>
    <button onclick={() => changeTo('system')}>System</button>
  {/if}
</div>

<style>
  button {
    all: unset;
    background: var(--page-element-bg-variant);
    color: var(--page-element-text);
    padding: 0.15rem 0.75rem;
    border-radius: 0.5rem;
  }
  button:hover {
    background: var(--page-element-accent);
    color: var(--page-element-text-variant);
  }
</style>
