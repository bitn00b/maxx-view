import type {Readable} from "svelte/store";
import {writable, get, derived} from "svelte/store";

import nf from '@tuplo/numberfmt';
import {useViewportSize} from "@svelteuidev/composables";
import {theme} from "@svelteuidev/core";

/* yaaay a utils file */

export function localStoredSetting<TWritableType>(key: string, defaultValue: string, mapper: (savedValue: string) => TWritableType) {
  const localStoredValue = localStorage.getItem(key) ?? defaultValue;

  const writableToReturn = writable(mapper(localStoredValue));

  writableToReturn.subscribe(newVal => localStorage.setItem(key, newVal + ''));

  return writableToReturn;
}

export function localStoredSettingJson<TWritableType>(key: string, defaultValue: TWritableType) {
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

  refresh(): Promise<void>;
}


export function refreshable<TData>(getDataCall: () => Promise<TData>, defaultIfEmpty: TData): CacheableResult<TData> {
  const writableStore = writable(defaultIfEmpty);
  const loadingState = writable('');

  async function refresh() {
    loadingState.set('loading');
    const loadedData = await getDataCall();
    loadingState.set('loaded');
    writableStore.set(loadedData);
  }

  const currentValue = get(writableStore);

  if (currentValue == defaultIfEmpty) {
    refresh();
  }

  return {
    store: writableStore,
    loadingState,
    refresh
  }
}

export function cacheableResult<TData>(cacheKey: string, getDataCall: () => Promise<TData>, defaultIfEmpty: TData): CacheableResult<TData> {
  const writableStore = localStoredSettingJson(cacheKey, defaultIfEmpty);
  const loadingState = writable('');

  async function refresh() {
    loadingState.set('loading');
    const loadedData = await getDataCall();
    loadingState.set('loaded');
    writableStore.set(loadedData);
  }

  const currentValue = get(writableStore);

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

export function formatNumberUSD(value: number): string {
  if (!value) {
    return '';
  }

  return nfpUSD(value);
}


export function formatNumber(value: number, fallback = ''): string {
  if (!value) {
    return fallback;
  }

  return nfp(value);
}


export function averageOfNumbers(numbers: number[]) {
  return numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / numbers.length;
}


export function createChunks<TElement>(
  sourceArray: TElement[], chunkSize: number
) {
  return sourceArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as TElement[][])
}

export function sumPropertyOfArray<TElement>(source: TElement[], chooseProp: (el: TElement) => number) {
  return source.reduce((prev, cur) => {
    return prev + chooseProp(cur);
  }, 0);
}


export const viewport = useViewportSize();

const xsBreakpoint = theme.breakpoints.xs.value;

let lastWidth = 0;
const widthChanged: Readable<number> = derived(viewport, ({width}, set) => {
  if (lastWidth !== width) {
    set(width);
    lastWidth = width;
  }
});

export const isSmallDevice = derived(widthChanged, width => {
  return width < xsBreakpoint;
})
