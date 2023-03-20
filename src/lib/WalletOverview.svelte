<script lang="ts">
  import { localStoredSettingJson } from "./utils";
  import WalletInfo from "./WalletInfo.svelte";

  interface WalletEntry {
    wallet: string;
    name: string;
  }

  const walletsStore = localStoredSettingJson<WalletEntry[]>('wallets', []);

  function addNewEntry () {
    $walletsStore.push({wallet: '', name: ''});
    $walletsStore = $walletsStore;
  }

</script>

<button on:click={() => addNewEntry()}>add new</button><br/>

{JSON.stringify($walletsStore)} <br/>

{#each $walletsStore as entry}
  <input type="text" bind:value={entry.wallet} placeholder="wallet"> <br/>
  <input type="text" bind:value={entry.name} placeholder="name">

  <br/>
  <br/>
  <WalletInfo walletAddress={entry.wallet}></WalletInfo>
  <br/>
{/each}
