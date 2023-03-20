import type { UrlIcon } from "./components/types";

export function homepage (link: string): UrlIcon {
  return {
    title: 'Homepage',
    type: 'homepage',
    targetUrl: link
  };
}

export function telegram (link: string): UrlIcon {
  return {
    title: 'Telegram',
    type: 'telegram',
    targetUrl: link
  };
}

export function twitter (link: string): UrlIcon {
  return {
    title: 'Twitter',
    type: 'twitter',
    targetUrl: link
  };
}

export function charts (chain: string, pool: string): UrlIcon[] {
  let geckoChain = chain;
  let dexScreenerChain = chain;

  switch (chain) {
    case 'eth': {
      dexScreenerChain = 'ethereum';
      break;
    }
    case 'pom': {
      geckoChain = 'proof_of_memes';
      dexScreenerChain = 'proofofmemes';
    }
  }


  return [
    {
      title: 'GeckoTerminal',
      type: 'custom',
      iconUrl: 'https://www.geckoterminal.com/images/favicon.ico',
      targetUrl: `https://www.geckoterminal.com/${geckoChain}/pools/${pool}`
    },
    {
      title: 'DexScreener',
      type: 'custom',
      iconUrl: './assets/dexscreener.png',
      targetUrl: `https://dexscreener.com/${dexScreenerChain}/${pool}`
    }
  ]
}

export function memescan (address?: string, titleSuffix = ''): UrlIcon {
  return {
    title: `Memescan ${titleSuffix}`,
    type: 'custom',
    iconUrl: './assets/memescan.png',
    targetUrl: address ? `https://memescan.io/address/${address}` : 'https://memescan.io/'
  }
}
