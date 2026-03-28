<script>
  import SchemeSlider from './SchemeSlider.svelte';
  import SchemeButton from './SchemeButton.svelte';
</script>

<div class="container">
  <h1>Examples</h1>
  <main>
    <section>
      <h2>Slider</h2>
      <SchemeSlider />
    </section>
    <section>
      <h2>Button</h2>
      <SchemeButton />
    </section>
  </main>
</div>

<style>
  .container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: var(--container-bg);
    color: var(--header-text);

    h1 {
      background: var(--header-bg);
      padding: 0 1rem;
      margin: 0 0 1rem 0;
      border-radius: 0.5rem;
    }
  }

  main {
    padding: 1rem;
    width: 280px;
    border: 3px solid var(--mangrove);
    border-radius: 1rem;
    background: var(--page-element-bg);
  }

  section {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 1rem 0 1rem 0;
    color: var(--page-element-header-color);
    border: 2px dashed var(--viking-diva);
    border-radius: 1rem;
  }

  section:nth-child(n + 2) {
    margin: 0.75rem 0 0 0;
  }
</style>
