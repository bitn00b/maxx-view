<script lang="ts">

  import {showWalletConfigModal, walletsStore} from "../appState";
  import {Button, Paper} from "@svelteuidev/core";
  import StakingOverviewOfWallet from "../StakingOverviewOfWallet.svelte";
</script>

<br/>
<br/>
<br/>

<Button compact on:click={() => $showWalletConfigModal = true}>Edit Wallets</Button>

Note: design / layout will be improved in the future

<br/>

{#each $walletsStore as entry}
   {#if entry.wallet}
      <br/>
      {entry.name} <br />
      <Paper style="overflow-y: auto">
         <StakingOverviewOfWallet
            walletAddress={entry.wallet}></StakingOverviewOfWallet>
      </Paper>
   {/if}
   <br/>
{/each}


