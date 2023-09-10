<script lang="ts">
  import {SvelteUIProvider} from "@svelteuidev/core";
  import Router from 'svelte-spa-router'
  import TokenOverview from "./lib/pages/TokenOverview.svelte";
  import {wrap} from "svelte-spa-router/wrap";
  import WalletSettings from "./lib/modals/WalletSettings.svelte";
  import HeaderRow from "./lib/pageParts/HeaderRow.svelte";
  import Footer from "./lib/pageParts/Footer.svelte";
  import {refreshData} from "./lib/logic/refresher";

  const routes = {
    // Exact path
    '/': TokenOverview,
    '/staking-overview': wrap({
      asyncComponent: () => import('./lib/pages/StakingOverview.svelte')
    })
  };


  refreshData();
</script>

<SvelteUIProvider themeObserver="dark">
   <HeaderRow></HeaderRow>
   <Router {routes}/>
   <br/>
   <br/><br/>
   <br/>
   <Footer/>
</SvelteUIProvider>

<WalletSettings/>
