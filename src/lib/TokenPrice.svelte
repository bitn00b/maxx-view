<script lang="ts">
  import {cacheableResult} from "./utils";
  import {uniswapV2Contract} from "./ABII/contractsWithLiquidity";

  import {getTokens, type TokenEntry} from "./API/maxxScanApi";
  import TokenPriceTile from "./components/TokenPriceTile.svelte";
  import type {StaticTokenInformationDEX} from "./logic/types";
  import {getContractOfChain} from "./API/web3ContractCache";

  export let tokenEntry: TokenEntry;

  interface TokenInfo {
    status: string;
    error?: string;
    isUniswapV2Ish?: boolean;
    pairAddress?: string;
    pairedWith?: string;
  }

  const {
    store: tokenInfo,
    loadingState,
    refresh
  } = cacheableResult<TokenInfo>(`token_info_${tokenEntry.contractAddress}`, async () => {
    try {
      const tokenContract = getContractOfChain(tokenEntry.contractAddress, 'maxx', uniswapV2Contract);


      const pairAddress = await tokenContract.methods.uniswapV2Pair().call({
        from: tokenEntry.contractAddress
      });

      const tokensOfPair = await getTokens(pairAddress);

      if (tokensOfPair.message === 'OK') {
        const pairedWith = tokensOfPair.result.find(p => p.contractAddress !== tokenEntry.contractAddress);

        return {
          status: 'ok',
          isUniswapV2Ish: true,
          pairAddress,
          pairedWith: pairedWith.contractAddress
        }

      } else {
        return {
          status: 'error',
          error: 'No Pair Found - ' + tokensOfPair.message
        }
      }


    } catch (e) {
      return {
        status: 'error',
        error: e.message
      }
    }
  }, {
    status: 'not_loaded_yet'
  } as TokenInfo);

  $: tokenInfoForTile = {
    chain: 'maxx',
    chainAddresses: {
      tokenAddress: tokenEntry.contractAddress,
      lpAddress: $tokenInfo.pairAddress,
      pairedWithContract: $tokenInfo.pairedWith
    },
    type: 'chain',
    urls: []
  } satisfies StaticTokenInformationDEX;

</script>

<br/>

{JSON.stringify($tokenInfo)}

<br/>

<button on:click={refresh}> refresh token info</button>

<br/>

{JSON.stringify(tokenEntry)}

 <TokenPriceTile staticInfo={tokenInfoForTile} />
