<script lang="ts">


  import { refreshData } from "./pomCoinPriceChecker";


  refreshData();

  setInterval(() => refreshData(), 30_000)
</script>

<button on:click={refreshData}>refresh
</button>
<br/>
<br/>
<!--
Memescan Price: {$memescanPrice} <br/>
POM/ETH: {$pomEthPrice} <br/>
{JSON.stringify($pomEthRatioStore)} <br/><br/>
POM/BSC: {$pomBscPrice} <br/>
{JSON.stringify($pomBscRatioStore)} <br/><br/>
BNB: {$bscPrice} <br/>
ETH: {$ethPrice} <br/>

<br/>
<br/>

POMD/POM: {$pomDPrice}  <br/>
{JSON.stringify($pomDRatio)} <br/><br/>
POMG/POM: {$pomGPrice} <br/>
{JSON.stringify($pomgRatio)} <br/><br/>
-->
