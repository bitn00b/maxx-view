import {charts, homepage, maxxExplorer, telegram} from "../urlIconFunctions";
import type {StaticTokenInformationDEX, StaticTokenInformationCustom, PriceCacheEntry} from "./types";
import {MUSDT_MAXX_CONTRACT, WBNB_CONTRACT, WETH_CONTRACT, WPWR_CONTRACT} from "./chainTokens";

export const PWR_CEX: StaticTokenInformationCustom = {
  type: "custom",
  id: 'pwrCEX',
  tokenName: 'PWR',
  title: 'PWR CEX Price',

  urls: [
    homepage('https://www.maxxchain.org'),
    telegram('https://t.me/MaxxChain'),
    maxxExplorer()
  ],

  async getTokenPriceRefresher(): Promise<PriceCacheEntry> {
    const result = await fetch('https://api.coinstore.com/api/v1/ticker/price;symbol=PWRUSDT').then(f => f.json());

    return Promise.resolve({
      priceBackedToken: 0,
      priceUSD: result.data[0].price,
      source: 'CoinStore API'
    });
  },
};

export const PWR_DEX: StaticTokenInformationDEX = {
  chain: 'maxx',
  type: "chain",
  id: 'pwrDEX',
  tokenName: 'PWR',
  title: 'PWR DEX Price',

  urls: [],
  chainAddresses: {
    lpAddress: "0x217a7522feda3cea46744645e6329c784606bdc9",
    pairedWithContract: MUSDT_MAXX_CONTRACT,
    pairedWith: 'MUSDT',
    tokenAddress: WPWR_CONTRACT
  },
};


const MAXX_BSC_CONTRACT = '0x3e61c7fb137765e7cfcc4399d2d7d5bc1838d6b1'; // same as ETH :)
const BSC_LP = '0x6b3eca3f6fa6b36d8277b201ede9c0ed6a2779e7';

const MAXX_TOKEN = '$MAXX';

export const MAXX_BNB: StaticTokenInformationDEX = {
  id: 'maxxBNB',
  tokenName: MAXX_TOKEN,
  title: `${MAXX_TOKEN} (BSC)`,
  chain: 'bsc',
  type: 'chain',
  urls: [
    ...charts('bsc', BSC_LP)
  ],
  chainAddresses: {
    tokenAddress: MAXX_BSC_CONTRACT,
    lpAddress: BSC_LP,
    pairedWith: 'BNB',
    pairedWithContract: WBNB_CONTRACT
  }
};

const MAXX_ETH_LP = '0xb618708643490df2f3f90149b27954a4be04f1e4';

export const MAXX_ETH: StaticTokenInformationDEX = {
  id: 'maxxETH',
  tokenName: MAXX_TOKEN,
  title: `${MAXX_TOKEN} (ETH)`,
  chain: 'eth',
  type: 'chain',
  urls: [
    ...charts('eth', MAXX_ETH_LP)
  ],
  chainAddresses: {
    tokenAddress: '0x966e770030209C95F974f37Edbde65D98e853354',
    lpAddress: MAXX_ETH_LP,
    pairedWith: 'ETH',
    pairedWithContract: WETH_CONTRACT
  }
};

const MAXX_PWR_LP = '0x5bDE6210f307596c64189291D0b61f769863bC52';

export const MAXX_PWR: StaticTokenInformationDEX = {
  id: 'maxxPWR',
  tokenName: MAXX_TOKEN,
  title: `${MAXX_TOKEN} (PWR)`,
  chain: 'maxx',
  type: 'chain',
  urls: [
    ...charts('maxx', MAXX_PWR_LP)
  ],
  chainAddresses: {
    tokenAddress: '0x25490a833a22050dEaE49647d0c264e1960FF8E0',
    lpAddress: MAXX_PWR_LP,
    pairedWith: 'PWR',
    pairedWithContract: WPWR_CONTRACT
  }
};

const XTRA_PWR_LP = '0xfc0e3991c4ee5fa281faf0d13ade54f20c91ec4f';

export const XTRA_PWR: StaticTokenInformationDEX = {
  id: 'xtraPWR',
  tokenName: 'XTRA',
  title: 'XTRA (PWR)',
  chain: 'maxx',
  type: 'chain',
  urls: [
    ...charts('maxx', XTRA_PWR_LP)
  ],
  chainAddresses: {
    tokenAddress: '0xb151859760f0460f7f2c619b7970a65d1bad8949',
    lpAddress: XTRA_PWR_LP,
    pairedWith: 'PWR',
    pairedWithContract: WPWR_CONTRACT
  }
}
