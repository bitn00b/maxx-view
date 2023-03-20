<script lang="ts">

  import type { TokensResult } from "./memeScanTypes";
  import TokenPrice from "./TokenPrice.svelte";
  import { cacheableResult } from "./utils";


  export let walletAddress;


  function getTokens (walletAddress: string): Promise<TokensResult> {
    return fetch(`https://memescan.io/api?module=account&action=tokenlist&address=${walletAddress}`).then(r => r.json())
  }

  const {store,loadingState, refresh} = cacheableResult(`wallet_tokens_${walletAddress}`, () => getTokens(walletAddress), {});
</script>

Loading State: {$loadingState} <br/>

<button on:click={refresh}>refresh</button>

{#if $store.result}
 {#each $store.result as tokenEntry}
      <TokenPrice {tokenEntry}></TokenPrice>
    <br/>
    <br/>
    {/each}
  {/if}

