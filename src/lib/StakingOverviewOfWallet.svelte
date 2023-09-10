<script lang="ts">
  import StakingRow from "./StakingRow.svelte";
  import {refresher} from "./logic/refresher";
  export let walletAddress: string;
  export let walletName: string;
</script>

<table>
   <tr>
      <td>Wallet: {walletName}</td>
      <td>Amount</td>
      <td>Value in $</td>
   </tr>
   <tr>
      <td></td>
      <td></td>
      <td></td>
   </tr>

   <StakingRow chain="maxx" rowClass="odd" {walletAddress} {refresher}/>
   <StakingRow chain="eth" rowClass="even" {walletAddress} {refresher}/>
   <StakingRow chain="bsc" rowClass="odd" {walletAddress} {refresher}/>
</table>


<style lang="scss">
  td:not(.row-label) {
    white-space: nowrap;
    padding-left: 4px;
    padding-right: 4px;
  }


</style>
