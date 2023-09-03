<script lang="ts">
  import TokenPriceTile from '../components/TokenPriceTile.svelte';
  import {formatNumber, formatNumberUSD} from "../utils";
  import {Grid} from "../components/Grid";
  import {MAXX_BNB, MAXX_ETH, MAXX_PWR, PWR_CEX, PWR_DEX, XTRA_PWR} from "../logic/maxxMainTokes";
  import {attachRefresher, isRefreshing, refreshData} from "../logic/refresher";
  import {getTokenPriceReadable, PriceCache, priceCacheCall} from "../logic/priceCache";
  import {getTokenRatio} from "../sources";
  import type {PriceCacheEntry, SimpleTokenInfo, StaticTokenInformationDEX} from "../logic/types";
  import {MUSDT_MAXX_CONTRACT, WBNB_CONTRACT, WETH_CONTRACT, WPWR_CONTRACT} from "../logic/chainTokens";
  import {get} from "svelte/store";
  import {updateEthPrice, updateBnbPrice} from "../API/coincapApi";
  import PairedPriceToTokenAmount from "../components/PairedPriceToTokenAmount.svelte";
  import FormattedNumberColorChanged from "../components/FormattedNumberColorChanged.svelte";

  // usually not needed BUT so that the IDE says "its ok" ^^
  const {Col: GridCol} = Grid;

  const ethTokenInfo: SimpleTokenInfo = {
    id: WETH_CONTRACT
  };

   const bnbTokenInfo: SimpleTokenInfo = {
    id: WBNB_CONTRACT
  };

  attachRefresher(
    () => priceCacheCall(ethTokenInfo, () => updateEthPrice().then(price => {
      return {priceUSD: price, source: 'coincap API'}
    }))
  )

  attachRefresher(
    () => priceCacheCall(bnbTokenInfo, () => updateBnbPrice().then(price => {
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

  attachRefresher(
    () => priceCacheCall(XTRA_PWR, () => getTokenPriceDex(XTRA_PWR))
  );


  refreshData();

  const TOKENS_STATIC_LIST = [
    PWR_CEX,
    PWR_DEX,
    XTRA_PWR,
    MAXX_BNB,
    MAXX_ETH,
    MAXX_PWR
  ] as const;

  const USD_CONTRACTS = [MUSDT_MAXX_CONTRACT];

  const ethPrice = getTokenPriceReadable(ethTokenInfo);
  const bnbPrice = getTokenPriceReadable(bnbTokenInfo);

  setInterval(() => refreshData(), 1100*60);
</script>

<br/>
<br/>
<br/>
   Maxx View - auto refreshing every minute :)

<br/>
<br/>

ETH: $ <FormattedNumberColorChanged formattedNumber={formatNumber($ethPrice?.priceUSD)} rawNumber={$ethPrice?.priceUSD} /> - BNB: $ <FormattedNumberColorChanged formattedNumber={formatNumber($bnbPrice?.priceUSD)} rawNumber={$bnbPrice?.priceUSD} />

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
