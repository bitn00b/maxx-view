export interface UrlIcon {
  type: 'homepage' | 'telegram' | 'twitter' | 'custom',
  iconUrl?: string;
  title: string;
  targetUrl: string;
}

export interface PriceCacheEntry {
  priceUSD: number;
  priceBackedToken: number;
  source: string
}

export interface SimpleTokenInfo {
  id: string, // internal ID only for foreach as key needed
  tokenName: string, // label to show
}

export interface SharedTokenInformation extends SimpleTokenInfo {
  title: string, // title in the tile

  urls: UrlIcon[],
}

export interface StaticTokenInformationCustom extends SharedTokenInformation {
  type: 'custom';

  getTokenPriceRefresher(): Promise<PriceCacheEntry>;
}

export type CHAIN_TYPES = 'bsc' | 'eth' | 'maxx';

export const CHAIN_TOKEN: Record<CHAIN_TYPES, string> = {
  eth: 'ETH',
  bsc: 'BNB',
  maxx: 'PWR'
}

export interface StaticTokenInformationDEX extends SharedTokenInformation {
  type: 'chain',
  chain: CHAIN_TYPES,

  chainAddresses?: {
    tokenAddress: string;
    lpAddress: string;
    pairedWithContract: string;
    pairedWith: string;
  }
}

export type StaticTokenInformation = StaticTokenInformationCustom | StaticTokenInformationDEX;

export interface CalculatedTokenRatio {
  pairedTokenAmount: number;
  tokenAmount: number;
  ratio: number;
}
