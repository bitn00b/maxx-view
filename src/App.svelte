<script lang="ts">
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Router from 'svelte-spa-router'
  import TokenOverview from "./lib/pages/TokenOverview.svelte";

  const routes = {
    // Exact path
    '/': TokenOverview,
  };

</script>

<SvelteUIProvider themeObserver="dark">
  <Router {routes}/>
</SvelteUIProvider>
