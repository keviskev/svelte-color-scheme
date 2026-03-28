<svelte:head>
  <script>
    (function () {
      const qry = '(prefers-color-scheme: dark)';
      const sys = window.matchMedia(qry).matches ? 'dark' : 'light';
      const ovr = localStorage.getItem('scheme');
      const drk = ovr === 'dark' || sys === 'dark';

      if (drk) {
        document.documentElement.classList.toggle('dark');
      }
    })();
  </script>
</svelte:head>
