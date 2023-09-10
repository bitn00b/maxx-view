<script lang="ts">
  import type {StaticTokenInformationDEX} from "../logic/types";
  import {formatNumber} from "../utils";
  import {getTokenPriceReadable} from "../logic/priceCache";

  export let tokenInfo: StaticTokenInformationDEX;

  export let priceOfToken: number;

  const priceOfPaired = getTokenPriceReadable({
    id: tokenInfo.chainInformation.pairedWithContract
  })
</script>

1 {tokenInfo.chainInformation.pairedWith}
=> {formatNumber($priceOfPaired?.priceUSD / priceOfToken)} {tokenInfo.tokenName}
