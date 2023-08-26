<script lang="ts">
  import type {TokenEntry} from "./memeScanTypes";
  import {cacheableResult} from "./utils";

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
      /*const uniswapContractInstance = new web3PomConnection.eth.Contract(uniswapV2Contract as any, tokenEntry.contractAddress);

      console.info(uniswapContractInstance);

      const pairAddress = await uniswapContractInstance.methods.uniswapV2Pair().call({
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
*/

    } catch (e) {
      return {
        status: 'error',
        error: e.message
      }
    }
  }, {
    status: 'not_loaded_yet'
  } as TokenInfo);

</script>

<br/>

{JSON.stringify($tokenInfo)}

<br/>

<button on:click={refresh}> refresh token info</button>

<br/>

{JSON.stringify(tokenEntry)}
