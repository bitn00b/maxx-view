<script lang="ts">
  import WalletInfo from "./WalletInfo.svelte";
  import {walletsStore} from "./appState";


</script>

{#each $walletsStore as entry}
   {#if entry.wallet}
      <WalletInfo walletAddress={entry.wallet}></WalletInfo>
   {/if}
   <br/>
{/each}
