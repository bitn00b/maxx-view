<script lang="ts">
  import TokenPrice from "./TokenPrice.svelte";
  import {cacheableResult} from "./utils";
  import {getTokens} from "./API/maxxScanApi";

  export let walletAddress;

  const {store, loadingState, refresh} = cacheableResult(`wallet_tokens_${walletAddress}`, () => getTokens(walletAddress), {});

</script>

Loading State: {$loadingState} <br/>

<button on:click={refresh}>refresh</button>

{#if $store.result && false}
   {#each $store.result as tokenEntry}
      <TokenPrice {tokenEntry}></TokenPrice>
      <br/>
      <br/>
   {/each}
{/if}

