<script lang="ts">

  import type {CHAIN_TYPES} from "./logic/types";
  import {getStakingFee, getStakingInfo, rewardsEstimate} from "./API/stakingApi";
  import {formatNumber, refreshable} from "./utils";
  import {balanceOf, balanceOfToken} from "./API/balanceOfApi";
  import {MAXX_BNB, MAXX_ETH, MAXX_PWR, PWR_DEX} from "./logic/maxxMainTokes";
  import {derived, type Readable} from "svelte/store";

  export let chain: CHAIN_TYPES;
  export let walletAddress: string;

  export let rowClass: string;

  export let refresher: Readable<number>;

  const maxxTokenContractAddressByChain: Record<CHAIN_TYPES, string> = {
    maxx: MAXX_PWR.chainAddresses?.tokenAddress,
    bsc: MAXX_BNB.chainAddresses?.tokenAddress,
    eth: MAXX_ETH.chainAddresses?.tokenAddress,
  }

  const pwrTokenContractAddressByChain: Record<CHAIN_TYPES, string> = {
    maxx: PWR_DEX.chainAddresses?.tokenAddress,
    bsc: '0x467833Bad9eB455229E118Af9A12f3C579c7f11C',
    eth: '0x0bE5DA34c333804b793a3B3B31C3203B2BdD7e94',
  }

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
    balanceOfToken(chain, walletAddress, maxxTokenContractAddressByChain[chain]),

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
    refreshAll();
  }
</script>

<tr class={rowClass}>
   <td colspan="5">
      {chain.toUpperCase()} -

      { ($walletStakingInfoStore.isStaked) ? 'Staked' : 'Not Staked'}

      {#if $walletStakingInfoStore.isStaked}
         -
         Duration: {$walletStakingInfoStore.PWRDDays} -
         until { new Date($walletStakingInfoStore.stakedTill * 1000).toLocaleDateString()} <br/>
      {/if}
   </td>

</tr>
<tr class={rowClass}>
   <td>
      {formatNumber($holdingsStore.maxxAmount, '0')} $MAXX <br/>
      {formatNumber($holdingsStore.pwrAmount, '0')} PWR
   </td>


   {#if $walletStakingInfoStore.isStaked}
      <td>{formatNumber($walletStakingInfoStore.stakedMAXXPWRD)} $MAXX</td>
      <td>{formatNumber($walletStakingInfoStore.PWRDClaimed)} PWR</td>
   {:else}
      <td></td>
      <td></td>
   {/if}

   {#if $estimatedRewards}
      <td>{ formatNumber($estimatedRewards) } PWR</td>
   {:else }
      <td></td>
   {/if}
</tr>
