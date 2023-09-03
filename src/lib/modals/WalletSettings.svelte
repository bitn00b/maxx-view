<script lang="ts">
  import {Modal, Button} from "@svelteuidev/core";
  import {addNewWallet, deleteWallet, showWalletConfigModal, walletsStore} from "../appState";
  import {isSmallDevice} from "../utils";


  $: opened = $showWalletConfigModal;
  $: size = $isSmallDevice ? '100vw' : '70vw';
</script>


<Modal {opened} on:close={() => $showWalletConfigModal = false}
       size={size}>

   <h3>Wallets</h3>

   <table style="width: 100%">
      <tr>
         <th style="width: 30%">Name</th>
         <th>Wallet</th>
         <th style="width: 15%">
         </th>
      </tr>
      {#each $walletsStore as entry, i}
         <tr class:odd={i % 2 === 1} class:even={i % 2 === 0}>
            <td><input type="text" bind:value={entry.name}
                       placeholder="Wallet Name"></td>
            <td><input type="text" bind:value={entry.wallet}
                       placeholder="address"> <br/></td>
            <td>
               <Button compact on:click={() => deleteWallet(entry.wallet)}>remove</Button>
            </td>
         </tr>
      {/each}
      <tr>
         <td>
            <Button compact on:click={() => addNewWallet()}>+</Button>
         </td>
      </tr>
   </table>

</Modal>

<style>
    input {
        width: 100%;
    }
</style>
