import type {PriceCacheEntry, SimpleTokenInfo, StaticTokenInformationDEX} from "./types";
import {WBNB_CONTRACT, WETH_CONTRACT, WPWR_CONTRACT} from "./chainTokens";
import {attachRefresher, refreshData} from "./refresher";
import {PriceCache, priceCacheCall} from "./priceCache";
import {updateBnbPrice, updateEthPrice} from "../API/coincapApi";
import {MAXX_BNB, MAXX_ETH, MAXX_PWR, PWR_CEX, PWR_DEX, XTRA_PWR} from "./maxxMainTokes";
import {getTokenRatio} from "../sources";
import {get} from "svelte/store";
import {SAFU_PWR} from "./projectsOnMaxx";

export const ethTokenInfo: SimpleTokenInfo = {
  id: WETH_CONTRACT,
  tokenName: 'WETH'
};

export const bnbTokenInfo: SimpleTokenInfo = {
  id: WBNB_CONTRACT,
  tokenName: 'WBNB'
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

  switch (tokenInfo.chainInformation.pairedWithContract) {
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
    setContractAsKeyAsWell: PWR_DEX.chainInformation.tokenAddress
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

attachRefresher(
  () => priceCacheCall(SAFU_PWR, () => getTokenPriceDex(SAFU_PWR))
);

export const TOKENS_STATIC_LIST = [
  PWR_CEX,
  PWR_DEX,
  XTRA_PWR,
  MAXX_BNB,
  MAXX_ETH,
  MAXX_PWR
] as const;

export const PROJECTS_ON_MAXX = [
  SAFU_PWR
] as const;
