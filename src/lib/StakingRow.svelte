<script lang="ts">
  import type {CHAIN_TYPES, StaticTokenInformationDEX} from "./logic/types";
  import {getStakingFee, getStakingInfo, rewardsEstimate} from "./API/stakingApi";
  import {formatNumber, formatNumberUSD, refreshable} from "./utils";
  import {balanceOf, balanceOfToken} from "./API/balanceOfApi";
  import {MAXX_BNB, MAXX_ETH, MAXX_PWR, PWR_DEX} from "./logic/maxxMainTokes";
  import {derived, type Readable} from "svelte/store";
  import {getTokenPriceReadable} from "./logic/priceCache";

  export let chain: CHAIN_TYPES;
  export let walletAddress: string;
  export let refresher: Readable<number>;

  const maxxTokenInformationByChain: Record<CHAIN_TYPES, StaticTokenInformationDEX> = {
    maxx: MAXX_PWR,
    bsc: MAXX_BNB,
    eth: MAXX_ETH,
  }

  const pwrTokenContractAddressByChain: Record<CHAIN_TYPES, string> = {
    maxx: PWR_DEX.chainInformation?.tokenAddress,
    bsc: '0x467833Bad9eB455229E118Af9A12f3C579c7f11C',
    eth: '0x0bE5DA34c333804b793a3B3B31C3203B2BdD7e94',
  }

  const maxxPrice = getTokenPriceReadable(maxxTokenInformationByChain[chain])
  const pwrPrice = getTokenPriceReadable(PWR_DEX)

  const {
    store: stakingFeeStore
  } = refreshable(() => getStakingFee(chain))

  const {
    store: walletStakingInfoStore,
    refresh: walletStakingRefresh
  } = refreshable(() => getStakingInfo(chain, walletAddress), {
    isStaked: false
  })

  const {
    store: rewardsStore,
    refresh: rewardsRefresh
  } = refreshable(() => rewardsEstimate(chain, walletAddress), 0)


  const estimatedRewards = derived([stakingFeeStore, rewardsStore], ([stakingFee, rewards]) => {
    return rewards / 100 * (100 - stakingFee);
  });

  const {
    store: holdingsStore,
    refresh: holdingsRefresh
  } = refreshable(() => Promise.all([
    balanceOfToken(chain, walletAddress, maxxTokenInformationByChain[chain].chainInformation.tokenAddress),

    balanceOfToken(chain, walletAddress, pwrTokenContractAddressByChain[chain]),

    chain === 'maxx'
      ? balanceOf(chain, walletAddress)
      : undefined
  ]).then(([maxxAmount, pwrAmount, pwrOnMaxx]) => ({
    maxxAmount, pwrAmount: pwrAmount + (pwrOnMaxx ? pwrOnMaxx : 0)
  })), {})

  async function refreshAll() {
    await walletStakingRefresh();
    await rewardsRefresh();
    await holdingsRefresh();
  }

  $: if ($refresher !== 0) {
    console.info('refreshing');
    refreshAll();
  }
</script>

<tr>
   <td> {chain.toUpperCase()}</td>
</tr>
<tr class="odd">
   <td colspan="3" style="text-align: center">In Wallet</td>
</tr>
<tr class="even">
   <td>$MAXX</td>
   <td>
      {formatNumber($holdingsStore.maxxAmount, '0')}
   </td>
   <td>
      $ {formatNumberUSD($holdingsStore.maxxAmount * $maxxPrice?.priceUSD)}
   </td>
</tr>
<tr class="odd">
   <td>PWR</td>
   <td>
      {formatNumber($holdingsStore.pwrAmount, '0')}
   </td>
   <td>
      $ {formatNumberUSD($holdingsStore.pwrAmount * $pwrPrice?.priceUSD)}
   </td>
</tr>
<tr class="even">
   <td colspan="3"  style="text-align: center" >Staking Information
      { ($walletStakingInfoStore.isStaked) ? 'Staked' : 'Not Staked'}

      {#if $walletStakingInfoStore.isStaked}
         -
         Duration: {$walletStakingInfoStore.PWRDDays} Days -
         until { new Date($walletStakingInfoStore.stakedTill * 1000).toLocaleString()} <br/>
      {/if}
   </td>
</tr>

{#if $walletStakingInfoStore.isStaked}
   <tr  class="odd">
      <td>Staked $MAXX</td>
      <td>
         {formatNumber($walletStakingInfoStore.stakedMAXXPWRD, '0')}
      </td>
      <td>
         $ {formatNumberUSD($walletStakingInfoStore.stakedMAXXPWRD * $maxxPrice?.priceUSD)}
      </td>
   </tr>
   <tr  class="even">
      <td>Claimed PWR</td>
      <td>
         {formatNumber($walletStakingInfoStore.PWRDClaimed, '0')}
      </td>
      <td>
         $ {formatNumberUSD($walletStakingInfoStore.PWRDClaimed * $pwrPrice?.priceUSD)}
      </td>
   </tr>
   <tr  class="odd">
      <td>Claimable PWR <br/>
         Fee applied
      </td>
      <td>
         {formatNumber($estimatedRewards, '0')}
      </td>
      <td>
         $ {formatNumberUSD($estimatedRewards * $pwrPrice?.priceUSD)}
      </td>
   </tr>
{/if}

<style>
   td:not(:first-of-type) {
       text-align: center;
   }
</style>
