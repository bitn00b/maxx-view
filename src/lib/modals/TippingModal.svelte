<script lang="ts">
  import {ActionIcon, Alert, Code, CopyIcon, Modal} from "@svelteuidev/core";

  import {copyText} from 'svelte-copy';
  import wallet from "../../assets/wallet.png";
  import {isSmallDevice} from "../utils";
  import {showTippingModal} from "../appState";

  const tipWallet = '0x0eB4B25D17c72D435ca430c233E9f64Ac409efe4';

  $: opened = $showTippingModal;
  $: size = $isSmallDevice ? '100vw' : '90vw';

  async function handleCopyToClipboard() {
    try {
      await copyText(tipWallet);
      alert('Wallet Address copied to your clipboard.');
    } catch (e) {
      alert(`There was an error: ${e.message}`)
    }
  }
</script>

<Modal {opened} on:close={() => $showTippingModal = false} {size}>
   <h3 style="margin-top: -2rem">Thank you for clicking on 'tip Bitnoob'!</h3>

   A few people mentioned they would like a way to show their appreciation for the work I've done so here it is :)
   <br/>
   <br/>
   If you wish, you can send any amount of <Code>PWR</Code>, <Code>MAXX</Code>, <Code>ETH</Code>, <Code>BNB</Code>, <Code>BUSD</Code>,
   <Code>USDT</Code> to the provided wallet address.

   <br/>
   <br/>
   I thank you and appreciate your kindness.

   <br/>
   <br/>

   <div class="input-group">
      <input readonly aria-readonly="true" style="flex: 1; margin-left: 0.5rem" value={tipWallet}/>


      <ActionIcon color="teal" size="lg" variant="light"
                  on:click={() => handleCopyToClipboard()}>
         <CopyIcon></CopyIcon>
      </ActionIcon>
   </div>

   <br/>

   <Alert title="This wallet is an EVM wallet and compatible to the following chains:">
      <Code>MaxxChain</Code>, <Code>ETH</Code>, <Code>BSC</Code>, <Code>Polygon</Code>
   </Alert>

   <br/>
   <img src={wallet} class="centered-qr"/>
</Modal>

<style lang="scss">
  .input-group {
    display: flex;
    gap: 0.5rem;
    background: #535353;
  }

  .centered-qr {
    display: block;
    width: 256px;
    margin: 0 auto;
  }
</style>
