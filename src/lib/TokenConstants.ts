import type { UrlIcon } from "./components/types";
import { charts, homepage, memescan, telegram, twitter } from "./urlIconFunctions";

export const WETH_CONTRACT = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const POM_ETH_CONTRACT = '0x3bfcb1E14F2b1BFec9D611CD6B02D48CeEF43491';
export const ETH_LP = '0xaC007D06c200f6056FD6a3a4e45A7cC75436d0Df';


export const WBNB_CONTRACT = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
export const POM_BSC_CONTRACT = '0x3bfcb1E14F2b1BFec9D611CD6B02D48CeEF43491';
export const BSC_LP = '0xC28A7b6e6645EAB8f3649E202bD784b1530e5d91';


export const WPOM_CONTRACT = '0xC84D8d03aA41EF941721A4D77b24bB44D7C7Ac55';
export const POMG_CONTRACT = '0x8BB07ad76ADdE952e83f2876c9bDeA9cc5B3a51E';
export const POMG_LP = '0x06CF019654EaE4F1b873aCCD69f1e8C8AcAb3683';


export const POMD_CONTRACT = '0x58843CB63012e7C2Ad643857977efD32147a3C23';
export const POMD_LP = '0xb70Cac5bEb5ba74d6dB52d9995f53f3eBe753676';


export const UMC_CONTRACT = '0x58843CB63012e7C2Ad643857977efD32147a3C23';
export const UMC_LP = '0xb70Cac5bEb5ba74d6dB52d9995f53f3eBe753676';


export const MAXX_CONTRACT = '0xd2cC1F5cf980B929f46E62F4c9f2B48659b28E23';
export const MAXX_LP = '0xa19F7Cd4124Fd7166b888bd7c5e38604a0b46475';

export const MMP_CONTRACT = '0x36dAe39775E4874702BfD9256c022bD60c0E646B';
export const MMP_LP = '0x6c0B3981A9dd50fd99ce6E7D9d23479Dcb4c3Bc5';


// wip of a bundle type to have all needed informations
export const UMC_TOKEN = {
  chain: 'pom',
  tokenName: 'UMC',
  pairedWith: 'POM',
  contract: UMC_CONTRACT,
  pool: UMC_LP
}

export const pomCexUrls: UrlIcon[] = [
  homepage('https://www.proofofmemes.org/'),
  telegram('https://t.me/proofofmemes'),
  twitter('https://twitter.com/proof_of_memes'),
  memescan(),
  {
    title: 'Linktree',
    type: 'custom',
    iconUrl: 'https://linktr.ee/_next/static/logo-assets/favicon.png',
    targetUrl: 'https://linktr.ee/proofofmemes'
  }
];

export const pomBscUrls: UrlIcon[] = [
  {
    title: 'PancakeSwap',
    type: 'custom',
    iconUrl: 'https://dexscreener.com/img/dexes/pancakeswap.png',
    targetUrl: 'https://pancakeswap.finance/swap?outputCurrency=0x3bfcb1E14F2b1BFec9D611CD6B02D48CeEF43491'
  },
  {
    title: 'Novation (lower gas)',
    type: 'custom',
    iconUrl: './assets/novation.png',
    targetUrl: ''
  },
  ...charts('bsc',  BSC_LP),
];
export const pomEthUrls: UrlIcon[] = [
  ...charts('eth', ETH_LP),
];

export const pomGUrls: UrlIcon[] = [
  telegram('https://t.me/pomgovernance'),

  ...charts('pom', POMG_LP),
  memescan(POMG_LP, 'LP'),
  memescan(POMG_CONTRACT, 'Contract'),
];

export const pomDUrls: UrlIcon[] = [
  ...charts('pom', POMD_LP),
  memescan(POMD_LP, 'LP'),
  memescan(POMD_CONTRACT, 'Contract'),
];
export const maxPomUrls: UrlIcon[] = [
  homepage('https://www.maxxcrypto.ca'),
  twitter('https://twitter.com/Maxx_PoM'),
  telegram('https://t.me/pomaxxtoken'),

  ...charts('pom', MAXX_LP),
  memescan(MAXX_LP, 'LP'),
  memescan(MAXX_CONTRACT, 'Contract'),
]

export const mmpPomUrls: UrlIcon[] = [
  homepage('https://moneymagnetpom.netlify.app'),
  telegram('https://t.me/money_magnet_POM'),


  ...charts('pom', MMP_LP),
  memescan(MMP_LP, 'LP'),
  memescan(MMP_CONTRACT, 'Contract'),
]

export const umcPomUrls: UrlIcon[] = [
  homepage('https://memecorps.io'),
  telegram('https://t.me/UnitedMemeCorps'),
  twitter('https://twitter.com/unitedmemecorps'),

  ...charts('pom', UMC_LP),
  memescan(UMC_LP, 'LP'),
  memescan(UMC_CONTRACT, 'Contract'),
]


