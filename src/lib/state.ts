import { writable } from "svelte/store";

export const pomChainCexPrice = writable(0);
export const bnbPrice = writable(0);
export const ethPrice = writable(0);

export interface CalculatedTokenRatio {
  pairedTokenAmount: number;
  tokenAmount: number;
  ratio: number;
}

export interface PomCoinData {
  status: string,
  data?: {
    eth: CalculatedTokenRatio,
    bsc: CalculatedTokenRatio
  }
}

export const pomCoinData = writable<PomCoinData>(null);

// todo derived POM Coin Price on BSC
// todo derived POM Coin Price on ETH
// todo derived average POM Coin Price
