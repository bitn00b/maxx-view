import type {CHAIN_TYPES, UrlIcon} from "./logic/types";

export function homepage(link: string): UrlIcon {
  return {
    title: 'Homepage',
    type: 'homepage',
    targetUrl: link
  };
}

export function telegram(link: string): UrlIcon {
  return {
    title: 'Telegram',
    type: 'telegram',
    targetUrl: link
  };
}

export function twitter(link: string): UrlIcon {
  return {
    title: 'Twitter',
    type: 'twitter',
    targetUrl: link
  };
}

export function charts(chain: CHAIN_TYPES, pool: string): UrlIcon[] {
  let geckoChain: string = chain;
  let dexScreenerChain: string = chain;

  switch (chain) {
    case 'eth': {
      dexScreenerChain = 'ethereum';
      break;
    }
    case 'maxx': {
      geckoChain = 'maxxchain';
      dexScreenerChain = '';
    }
  }

  const chartArray: UrlIcon[] = [
    {
      title: 'GeckoTerminal',
      type: 'custom',
      iconUrl: 'https://www.geckoterminal.com/images/favicon.ico',
      targetUrl: `https://www.geckoterminal.com/${geckoChain}/pools/${pool}`
    },
  ]

  if (dexScreenerChain) {
    chartArray.push({
      title: 'DexScreener',
      type: 'custom',
      iconUrl: './assets/dexscreener.png',
      targetUrl: `https://dexscreener.com/${dexScreenerChain}/${pool}`
    })
  }

  return chartArray;
}

export function maxxExplorer(address?: string, titleSuffix = ''): UrlIcon {
  return {
    title: `Maxx Explorer ${titleSuffix}`,
    type: 'custom',
    iconUrl: './assets/maxxExplorer.png',
    targetUrl: address
      ? `https://explorer.maxxchain.org/address/${address}`
      : 'https://explorer.maxxchain.org/'
  }
}

export function bscscan(address: string, titleSuffix = ''): UrlIcon {
  return {
    title: `BSC Scan ${titleSuffix}`,
    type: 'custom',
    iconUrl: './assets/memescan.png',
    targetUrl: address ? `https://memescan.io/address/${address}` : 'https://memescan.io/'
  }
}
