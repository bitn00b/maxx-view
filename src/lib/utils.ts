import type { Readable } from "svelte/store";
import { writable } from "svelte/store";
import { get_store_value } from "svelte/internal";

import nf from '@tuplo/numberfmt';

/* yaaay a utils file */

export function localStoredSetting<TWritableType> (key: string, defaultValue: string, mapper: (savedValue: string) => TWritableType) {
  const localStoredValue = localStorage.getItem(key) ?? defaultValue;

  const writableToReturn = writable(mapper(localStoredValue));

  writableToReturn.subscribe(newVal => localStorage.setItem(key, newVal + ''));

  return writableToReturn;
}

export function localStoredSettingJson<TWritableType> (key: string, defaultValue: TWritableType) {
  const localStoredValue = localStorage.getItem(key);

  const jsonValue = localStoredValue && localStoredValue !== "undefined" && localStoredValue !== "null"
    ? JSON.parse(localStoredValue)
    : defaultValue;

  const writableToReturn = writable<TWritableType>(jsonValue);

  writableToReturn.subscribe(newVal => localStorage.setItem(key, JSON.stringify(newVal)));

  return writableToReturn;
}


export interface CacheableResult<TData> {
  store: Readable<TData>;
  loadingState: Readable<string>;

  refresh ();
}

export function cacheableResult<TData> (cacheKey: string, getDataCall: () => Promise<TData>, defaultIfEmpty: TData): CacheableResult<TData> {
  const writableStore = localStoredSettingJson(cacheKey, defaultIfEmpty);
  const loadingState = writable('');

  async function refresh () {
    loadingState.set('loading');
    const loadedData = await getDataCall();
    loadingState.set('loaded');
    writableStore.set(loadedData);
  }

  const currentValue = get_store_value(writableStore);

  if (currentValue == defaultIfEmpty) {
    refresh();
  } else {
    loadingState.set('cached');
  }

  return {
    store: writableStore,
    loadingState,
    refresh
  }
}

const nfpUSD = nf.partial('0,0.00000000');
const nfp = nf.partial('0,0[.00]');

export function formatNumberUSD (value: number): string {
  if (!value) {
    return '';
  }

  return nfpUSD(value);
}


export function formatNumber (value: number): string {
  if (!value) {
    return '';
  }

  return nfp(value);
}


export function averageOfNumbers (numbers: number[]) {
  return numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / numbers.length;
}


export function createChunks<TElement> (
  sourceArray: TElement[], chunkSize: number
) {
  return sourceArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}

export function sumPropertyOfArray<TElement> (source: TElement[], chooseProp: (el: TElement) => number) {
  return source.reduce((prev, cur) => {
    return prev + chooseProp(cur);
  }, 0);
}
