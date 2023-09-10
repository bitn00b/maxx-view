import type {PriceCacheEntry, SharedTokenInformation, SimpleTokenInfo} from "./types";
import {derived, get, writable} from "svelte/store";

export const PriceCache = writable<{
  [key: string]: PriceCacheEntry & {
    updatedAt: Date;
  }
}>({});

export function getTokenPriceReadable(tokenInfo: SimpleTokenInfo) {
  return derived(PriceCache, values => {
    return values[tokenInfo.id];
  })
}

export async function priceCacheCall(
  tokenInfo: SimpleTokenInfo,
  priceGetter: () => Promise<Partial<PriceCacheEntry>>,
  options: {
    setContractAsKeyAsWell: string
  } = {setContractAsKeyAsWell: ''}
) {
  const lastEntry = get(PriceCache)[tokenInfo.id];

  if (lastEntry?.updatedAt) {
    const now = Date.now();

    const diffMs = (now - lastEntry.updatedAt.valueOf());

    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffMins <= 1) {
      return;
    }
  }

  const result = await priceGetter();

  PriceCache.update(cache => {
    cache[tokenInfo.id] = {
      priceUSD: 0,
      source: '',
      priceBackedToken: 0,
      ...result,
      updatedAt: new Date()
    };

    if (options.setContractAsKeyAsWell) {
      cache[options.setContractAsKeyAsWell] = {
        priceUSD: 0,
        source: '',
        priceBackedToken: 0,
        ...result,
        updatedAt: new Date()
      };
    }

    return cache;
  })
}
