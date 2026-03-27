<script>
  import { createSchemeState } from '../lib/state.svelte.ts';
  import './app.css';

  createSchemeState();

  let { children } = $props();
</script>

<header>
  <h1>SiteName</h1>
</header>

{@render children()}

<style>
  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
    line-height: 2rem;
    background: var(--header-bg);
    color: var(--header-text);
  }
</style>
