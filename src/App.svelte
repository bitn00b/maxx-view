<script lang="ts">
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Router from 'svelte-spa-router'
  import TokenOverview from "./lib/pages/TokenOverview.svelte";
  import {wrap} from "svelte-spa-router/wrap";
  import WalletSettings from "./lib/modals/WalletSettings.svelte";
  import HeaderRow from "./lib/pageParts/HeaderRow.svelte";

  const routes = {
    // Exact path
    '/': TokenOverview,
    '/staking-overview': wrap({
      asyncComponent: () => import('./lib/pages/StakingOverview.svelte')
    })
  };

</script>

<SvelteUIProvider themeObserver="dark">
  <HeaderRow></HeaderRow>
  <Router {routes}/>

</SvelteUIProvider>

<WalletSettings/>
