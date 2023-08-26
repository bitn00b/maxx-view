<script lang="ts">
  import TokenPriceTile from '../components/TokenPriceTile.svelte';
  import {formatNumber} from "../utils";
  import HeaderRow from "../components/HeaderRow.svelte";
  import {Button} from "@svelteuidev/core";
  import {Grid} from "../components/Grid";
  import {MAXX_BNB, MAXX_ETH, MAXX_PWR, PWR_CEX, PWR_DEX} from "../logic/maxxMainTokes";
  import {attachRefresher, isRefreshing, refreshData} from "../logic/refresher";
  import {PriceCache, priceCacheCall} from "../logic/priceCache";
  import {getTokenRatio} from "../sources";
  import type {PriceCacheEntry, StaticTokenInformationDEX} from "../logic/types";
  import {MUSDT_MAXX_CONTRACT, WBNB_CONTRACT, WETH_CONTRACT, WPWR_CONTRACT} from "../logic/chainTokens";
  import {get} from "svelte/store";
  import {updateEthPrice, updateBnbPrice} from "../coincapPriceChecker";
  import PairedPriceToTokenAmount from "../components/PairedPriceToTokenAmount.svelte";

  // usually not needed BUT so that the IDE says "its ok" ^^
  const {Col: GridCol} = Grid;


  attachRefresher(
    () => priceCacheCall({
      id: WETH_CONTRACT
    }, () => updateEthPrice().then(price => {
      return {priceUSD: price, source: 'coincap API'}
    }))
  )

  attachRefresher(
    () => priceCacheCall({
      id: WBNB_CONTRACT
    }, () => updateBnbPrice().then(price => {
      return {priceUSD: price, source: 'coincap API'}
    }))
  )

  attachRefresher(
    () => priceCacheCall(PWR_CEX, () => PWR_CEX.getTokenPriceRefresher())
  );

  async function getTokenPriceDex(tokenInfo: StaticTokenInformationDEX) {
    const tokenRatio = await getTokenRatio(tokenInfo);

    let valueOfPairedToken = 1;

    switch (tokenInfo.chainAddresses.pairedWithContract) {
      case WETH_CONTRACT: {
        valueOfPairedToken = get(PriceCache)[WETH_CONTRACT]?.priceUSD;
        break;
      }
      case WBNB_CONTRACT: {
        valueOfPairedToken = get(PriceCache)[WBNB_CONTRACT]?.priceUSD;
        break;
      }
      case WPWR_CONTRACT: {
        valueOfPairedToken = get(PriceCache)['pwrDEX']?.priceUSD;
        break;
      }
    }

    return {
      source: `${tokenInfo.chain} LP Calculation`,
      priceBackedToken: 0,
      priceUSD: tokenRatio.ratio * valueOfPairedToken
    } as PriceCacheEntry;
  }

  attachRefresher(
    () => priceCacheCall(PWR_DEX, () => getTokenPriceDex(PWR_DEX), {
      setContractAsKeyAsWell: PWR_DEX.chainAddresses.tokenAddress
    })
  );

  attachRefresher(
    () => priceCacheCall(MAXX_BNB, () => getTokenPriceDex(MAXX_BNB))
  );

  attachRefresher(
    () => priceCacheCall(MAXX_ETH, () => getTokenPriceDex(MAXX_ETH))
  );

  attachRefresher(
    () => priceCacheCall(MAXX_PWR, () => getTokenPriceDex(MAXX_PWR))
  );

  refreshData();

  const TOKENS_STATIC_LIST = [
    PWR_CEX,
    PWR_DEX,
    MAXX_BNB,
    MAXX_ETH,
    MAXX_PWR
  ] as const;

  const USD_CONTRACTS = [MUSDT_MAXX_CONTRACT];
</script>

<HeaderRow>
   <Button on:click={() => refreshData()} compact loading={$isRefreshing}>
      {$isRefreshing ? 'Refreshing' : 'Refresh'}
   </Button>
   &nbsp;
   can be refreshed every full min
</HeaderRow>
<br/>
<br/>

<Grid>
   <GridCol span={12}>

   </GridCol>
   {#each TOKENS_STATIC_LIST as token (token.id)}
      <GridCol md={4} xs={6}>
         <TokenPriceTile staticInfo={token}>
            <div slot="additionalData" let:priceToShow>
               {#if priceToShow === 0 && token.id === 'pwrCEX'}
                  Either Maxx Explorer Price API not returning a Price or <br/>
                  Please check adblockers (maxx explorer url is blocked lol)
               {:else}
                  $1 => {formatNumber(1 / priceToShow)} {token.tokenName} <br/>
                  {#if token.chainAddresses && !USD_CONTRACTS.includes(token.chainAddresses.pairedWithContract)}
                     <PairedPriceToTokenAmount tokenInfo={token}
                                               priceOfToken={priceToShow}/>
                     <br/>
                  {/if}
               {/if}
            </div>
         </TokenPriceTile>
      </GridCol>
   {/each}
</Grid>
