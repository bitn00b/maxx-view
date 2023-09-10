<script lang="ts">

  import {showWalletConfigModal, walletsStore} from "../appState";
  import {Button, Paper} from "@svelteuidev/core";
  import StakingOverviewOfWallet from "../StakingOverviewOfWallet.svelte";
  import BiWallet from "svelte-icons-pack/bi/BiWallet";
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import {Grid} from "../components/Grid";
  import {refresher} from "../logic/refresher";

  $: lastRefresh = $refresher ? new Date() : new Date();

</script>

<br/>
<br/>
<br/>

<span style="display: inline-block">
<Button compact on:click={() => $showWalletConfigModal = true}>
   <Icon src={BiWallet} size="24" color="lightgray" slot="leftIcon"></Icon>

   Edit Wallets
</Button>
</span>
<span style="vertical-align: center; height: 1.5rem">
Updated at: {lastRefresh.toLocaleTimeString()}
</span>
<br/>

<Grid>
   {#each $walletsStore as entry}
      {#if entry.wallet}

         <Grid.Col xs={12} md={6}>
            <Paper style="overflow-y: auto">
               <StakingOverviewOfWallet
                  walletName={entry.name}
                  walletAddress={entry.wallet}>

               </StakingOverviewOfWallet>
            </Paper>
         </Grid.Col>
      {/if}
      <br/>
   {/each}
</Grid>

