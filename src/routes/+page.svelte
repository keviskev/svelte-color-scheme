<script>
  import SchemeSlider from '$lib/SchemeSlider.svelte';
  import SchemeButton from '$lib/SchemeButton.svelte';
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
  }

  main {
    padding: 1rem;
    width: 280px;
    border: 3px solid var(--mangrove);
    border-radius: 1rem;
    background: var(--page-element-bg);
  }

  section {
    margin: 1rem auto;
    padding: 1rem;
    color: var(--page-element-header-color);
    border: 2px dashed var(--viking-diva);
    border-radius: 1rem;
  }
</style>
