<script lang="ts">
  import TokenPriceTile from '../components/TokenPriceTile.svelte';
  import {
    maxPomUrls,
    mmpPomUrls,
    pomBscUrls,
    pomCexUrls,
    pomDUrls,
    pomEthUrls,
    pomGUrls,
    umcPomUrls
  } from "../TokenConstants.js";
  import {
    averagePrice, isLoading, maxxPrice, mmpPrice,
    pomBscPrice,
    pomDPrice,
    pomEthPrice,
    pomGPrice,
    refreshData,
    umcPrice
  } from "../pomCoinPriceChecker.js";
  import { bnbPrice, ethPrice, pomChainCexPrice } from "../state.js";
  import { formatNumber, formatNumberUSD } from "../utils.js";
  import HeaderRow from "../components/HeaderRow.svelte";
  import { Button, Loader } from "@svelteuidev/core";
  import { Grid } from "../components/Grid";

  // usually not needed BUT so that the IDE says "its ok" ^^
  const {Col: GridCol} = Grid;

  refreshData();

  $: tokens = [
    {
      id: 'pomCEX',
      tokenName: 'POM',
      title: 'POM MemeScan / CEX Price',
      price: $pomChainCexPrice,
      urls: pomCexUrls,
    },
    {
      id: 'pomBNB',
      tokenName: 'POM',
      title: `POM (BSC) - BNB: $${formatNumber($bnbPrice)}`,
      price: $pomBscPrice,
      urls: pomBscUrls,

      otherCalculations: {
        pairedWith: '$BNB',
        pairedPrice: $bnbPrice
      }
    },
    {
      id: 'pomETH',
      tokenName: 'POM',
      title: `POM (ETH) - ETH: $${formatNumber($ethPrice)}`,
      price: $pomEthPrice,
      urls: pomEthUrls,

      otherCalculations: {
        pairedWith: '$ETH',
        pairedPrice: $ethPrice
      }
    },
    {
      id: 'pomG',
      tokenName: 'POMG',
      title: `POMG`,
      price: $pomGPrice,
      urls: pomGUrls,

      otherCalculations: {
        pairedWith: '$POM',
        pairedPrice: $averagePrice
      }
    },
    {
      id: 'pomD',
      tokenName: 'POMD',
      title: `POMD`,
      price: $pomDPrice,
      urls: pomDUrls,

      otherCalculations: {
        pairedWith: '$POM',
        pairedPrice: $averagePrice
      }
    },
    {
      id: 'umc',
      tokenName: 'UMC',
      title: `United Meme Corps`,
      price: $umcPrice,
      urls: umcPomUrls,

      otherCalculations: {
        pairedWith: '$POM',
        pairedPrice: $averagePrice
      }
    }
  ];

  $: otherProjects = [
    {
      id: 'maxx',
      tokenName: 'MAXX',
      title: `Maxx`,
      price: $maxxPrice,
      urls: maxPomUrls,

      otherCalculations: {
        pairedWith: '$POM',
        pairedPrice: $averagePrice
      }
    },
    {
      id: 'mmp',
      tokenName: 'MMP',
      title: `MoneyMagnet POM`,
      price: $mmpPrice,
      urls: mmpPomUrls,

      otherCalculations: {
        pairedWith: '$POM',
        pairedPrice: $averagePrice
      }
    }
  ]
</script>

<HeaderRow>
  Proof Of Memes - Token Price Overview - POM: ${formatNumberUSD($averagePrice)} (avg) &nbsp;&nbsp;

  <Button on:click={() => refreshData()} compact loading={$isLoading}>
    {$isLoading ? 'Refreshing' : 'Refresh'}
  </Button>
</HeaderRow>
<br/>
<br/>

<Grid>
  <GridCol span={12}>

  </GridCol>
  {#each tokens as token (token.id)}
    <GridCol md={4} xs={6}>
      <TokenPriceTile title={token.title} price={token.price} urls={token.urls}
                      mainUrl={token.urls.find(u => u.type === 'homepage')}>
        <div slot="additionalData">

          {#if token.price === 0 && token.id === 'pomCEX'}
            Please check adblockers (memescan is blocked lol)
          {:else}
            $1 => {formatNumber(1 / token.price)} {token.tokenName} <br/>
            {#if token.otherCalculations}
              1 {token.otherCalculations.pairedWith}
              => {formatNumber(token.otherCalculations.pairedPrice / token.price)} {token.tokenName}<br/>
            {/if}
          {/if}
        </div>
      </TokenPriceTile>
    </GridCol>
  {/each}
</Grid>


<h2>Projects</h2>

<Grid>
  {#each otherProjects as token (token.id)}
    <GridCol md={4} xs={6}>
      <TokenPriceTile title={token.title} price={token.price} urls={token.urls}
                      mainUrl={token.urls.find(u => u.type === 'homepage')}>
        <div slot="additionalData">

          $1 => {formatNumber(1 / token.price)} {token.tokenName} <br/>
          {#if token.otherCalculations}
            1 {token.otherCalculations.pairedWith}
            => {formatNumber(token.otherCalculations.pairedPrice / token.price)} {token.tokenName}<br/>
          {/if}
        </div>
      </TokenPriceTile>
    </GridCol>
  {/each}

  <GridCol xs={12}>

    More projects to be added
  </GridCol>
</Grid>
