<script lang="ts">
  import StakingRow from "./StakingRow.svelte";
  import {writable} from "svelte/store";
  export let walletAddress: string;

  const refresher = writable(0);

  $: lastRefresh = $refresher ? new Date() : new Date();

</script>

<button on:click={ () => $refresher++}>refresh</button>

Updated at: {lastRefresh.toLocaleTimeString()}
<table>
   <tr>
      <td>Holding</td>
      <td>Staked $MAXX</td>
      <td>Claimed PWR</td>
      <td>Claimable PWR</td>
   </tr>
   <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>Fee applied</td>
   </tr>

   <StakingRow chain="maxx" rowClass="odd" {walletAddress}/>
   <StakingRow chain="eth" rowClass="even" {walletAddress}/>
   <StakingRow chain="bsc" rowClass="odd" {walletAddress}/>
</table>


<style lang="scss">
  td:not(.row-label) {
    white-space: nowrap;
    padding-left: 4px;
    padding-right: 4px;
  }


</style>
