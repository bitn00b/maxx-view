import { derived, writable } from "svelte/store";
import type { Readable } from "svelte/store";
import type { CalculatedTokenRatio } from "./state";
import { bnbPrice, ethPrice, pomChainCexPrice } from "./state";
import {
  getMemeScanPrice,
  getPomBscRatio,
  getPomEthRatio, getPomMaxxRatio, getPomMMPRatio,
  getPomPomDRatio,
  getPomPomGRatio,
  getPomUmcRatio
} from "./sources";
import { deriveActualPrice } from "./functions";
import { get_store_value } from "svelte/internal";


export const pomEthRatioStore = writable<CalculatedTokenRatio>(null);
export const pomBscRatioStore = writable<CalculatedTokenRatio>(null);


export const pomDRatio = writable<CalculatedTokenRatio>(null);

export const pomgRatio = writable<CalculatedTokenRatio>(null);
export const umcRatio = writable<CalculatedTokenRatio>(null);
export const maxxRatio = writable<CalculatedTokenRatio>(null);
export const mmpRatio = writable<CalculatedTokenRatio>(null);


export const pomEthPrice = deriveActualPrice(pomEthRatioStore, ethPrice);
export const pomBscPrice = deriveActualPrice(pomBscRatioStore, bnbPrice);

export const averagePrice = derived([pomChainCexPrice, pomBscPrice, pomEthPrice], ([cexPrice, bscPrice, ethPrice]) => (cexPrice + bscPrice + ethPrice) / 3);

export const pomGPrice = deriveActualPrice(pomgRatio, averagePrice);
export const pomDPrice = deriveActualPrice(pomDRatio, averagePrice);
export const umcPrice = deriveActualPrice(umcRatio, averagePrice);
export const maxxPrice = deriveActualPrice(maxxRatio, averagePrice);
export const mmpPrice = deriveActualPrice(mmpRatio, averagePrice);

export function updateBnbPrice (): Promise<number> {
  return fetch('https://api.coincap.io/v2/assets/binance-coin')
    .then(r => r.json()).then(j => Number(j.data.priceUsd));
}

export function updateEthPrice (): Promise<number> {
  return fetch('https://api.coincap.io/v2/assets/ethereum')
    .then(r => r.json()).then(j => Number(j.data.priceUsd));
}

/*
const coinPricesWS = new WebSocket('wss://ws.coincap.io/prices?assets=binance-coin,ethereum')

coinPricesWS.onmessage = function (msg) {
  const bnbPrice = +JSON.parse(msg.data)['binance-coin'];

  if (bnbPrice) {
    console.info({
      bnbPrice
    });

    bscPrice.set(
      bnbPrice
    );
  }

  const ethPriceValue = +JSON.parse(msg.data)['ethereum'];

  if (ethPriceValue) {
    console.info({
      ethPriceValue
    });

    ethPrice.set(
      ethPriceValue
    );
  }
}*/

export const isLoading = writable(false)

export async function refreshData () {
  if (get_store_value(isLoading)) {
    return;
  }

  isLoading.set(true);

  bnbPrice.set(await updateBnbPrice());

  try {
    await Promise.all([
      getMemeScanPrice().then(res => pomChainCexPrice.set(Number(res.result.coin_usd))),
      getPomEthRatio().then(pomEthRatio => pomEthRatioStore.set(pomEthRatio)),
      getPomBscRatio().then(pomBscRatio => pomBscRatioStore.set(pomBscRatio)),
      updateEthPrice().then(ethPriceValue => ethPrice.set(ethPriceValue))
    ]);
  } catch (e) {
    // alert(e);
  }

  const pomPomDRatio = await getPomPomDRatio();
  pomDRatio.set(pomPomDRatio);

  const pomPomGRatio = await getPomPomGRatio();
  pomgRatio.set(pomPomGRatio);

  const pomUmcRatio = await getPomUmcRatio();
  umcRatio.set(pomUmcRatio);

  maxxRatio.set(await getPomMaxxRatio());
  mmpRatio.set(await getPomMMPRatio());

  isLoading.set(false);
}
