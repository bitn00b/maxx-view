<script lang="ts">
  import TokenPriceTile from '../components/TokenPriceTile.svelte';
  import {formatNumber} from "../utils";
  import {Grid} from "../components/Grid";
  import {getTokenPriceReadable} from "../logic/priceCache";
  import {MUSDT_MAXX_CONTRACT} from "../logic/chainTokens";
  import PairedPriceToTokenAmount from "../components/PairedPriceToTokenAmount.svelte";
  import FormattedNumberColorChanged from "../components/FormattedNumberColorChanged.svelte";
  import {bnbTokenInfo, ethTokenInfo, PROJECTS_ON_MAXX, TOKENS_STATIC_LIST} from "../logic/allTokensRefresher";

  // usually not needed BUT so that the IDE says "its ok" ^^

  const USD_CONTRACTS = [MUSDT_MAXX_CONTRACT];

  const ethPrice = getTokenPriceReadable(ethTokenInfo);
  const bnbPrice = getTokenPriceReadable(bnbTokenInfo);
</script>

<br/>
<br/>
<br/>
Maxx View - auto refreshing every minute :)

<br/>
<br/>

ETH: $
<FormattedNumberColorChanged formattedNumber={formatNumber($ethPrice?.priceUSD)}
                             rawNumber={$ethPrice?.priceUSD}/> - BNB: $
<FormattedNumberColorChanged formattedNumber={formatNumber($bnbPrice?.priceUSD)} rawNumber={$bnbPrice?.priceUSD}/>

<Grid>
   <Grid.Col span={12}>

   </Grid.Col>
   {#each TOKENS_STATIC_LIST as token (token.id)}
      <Grid.Col md={4} xs={6}>
         <TokenPriceTile staticInfo={token}>
            <div slot="additionalData" let:priceToShow>
               {#if priceToShow === 0 && token.id === 'pwrCEX'}
                  Either Maxx Explorer Price API not returning a Price or <br/>
                  Please check adblockers (maxx explorer url is blocked lol)
               {:else}
                  $1 => {formatNumber(1 / priceToShow)} {token.tokenName} <br/>
                  {#if token.chainInformation && !USD_CONTRACTS.includes(token.chainInformation.pairedWithContract)}
                     <PairedPriceToTokenAmount tokenInfo={token}
                                               priceOfToken={priceToShow}/>
                     <br/>
                  {/if}
               {/if}
            </div>
         </TokenPriceTile>
      </Grid.Col>
   {/each}
</Grid>

<h4>Projects on MAXX</h4>

<Grid>
   <Grid.Col span={12}>

   </Grid.Col>
   {#each PROJECTS_ON_MAXX as token (token.id)}
      <Grid.Col md={4} xs={6}>
         <TokenPriceTile staticInfo={token}>
            <div slot="additionalData" let:priceToShow>
               $1 => {formatNumber(1 / priceToShow)} {token.tokenName} <br/>
               {#if token.chainInformation && !USD_CONTRACTS.includes(token.chainInformation.pairedWithContract)}
                  <PairedPriceToTokenAmount tokenInfo={token}
                                            priceOfToken={priceToShow}/>
                  <br/>
               {/if}
            </div>
         </TokenPriceTile>
      </Grid.Col>
   {/each}
</Grid>

<br />
Prices of PWR-paired Tokens using the DEX Price Value instead of CEX Price, so the prices might be a bit off in comparison to the Charts.
