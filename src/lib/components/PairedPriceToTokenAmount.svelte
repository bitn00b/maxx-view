<script lang="ts">
  import type {StaticTokenInformationDEX} from "../logic/types";
  import {formatNumber} from "../utils";
  import {getTokenPriceReadable} from "../logic/priceCache";

  export let tokenInfo: StaticTokenInformationDEX;

  export let priceOfToken: number;

  const priceOfPaired = getTokenPriceReadable({
    id: tokenInfo.chainAddresses.pairedWithContract
  })
</script>

1 {tokenInfo.chainAddresses.pairedWith}
=> {formatNumber($priceOfPaired?.priceUSD / priceOfToken)} {tokenInfo.tokenName}
