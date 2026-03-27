<script>
  import SchemeSlider from '$lib/SchemeSlider.svelte';
  import Scheme from '$lib/Scheme.svelte';
</script>

<div class="container">
  <main>
    <section>
      <SchemeSlider />
    </section>
    <section>
      <Scheme />
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
    width: 250px;
    height: 250px;
    background: var(--element-bg-variant);
  }
</style>
