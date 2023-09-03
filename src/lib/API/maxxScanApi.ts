export interface TokenEntry {
  balance: number;
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
  type: string;
}

export interface TokensResult {
  message: string;
  status: string;
  result: TokenEntry[]
}

export type MemeScanResult = {
  message: string;
  status: string;
  result: {
    coin_usd: string;
    coin_usd_timestamp: string;
  }
}

const maxxchainAPI = 'https://explorer.maxxchain.org/api';

export function getTokens(walletAddress: string): Promise<TokensResult> {
  return fetch(`${maxxchainAPI}?module=account&action=tokenlist&address=${walletAddress}`).then(r => r.json())
}

// catch and maybe show that an adblocker might blocked this...
export function getPwrCEXPrice(): Promise<MemeScanResult> {
  return fetch(`${maxxchainAPI}?module=stats&action=coinprice`, {
    mode: 'cors',
    referrerPolicy: 'unsafe-url',
  })
    .then(r => {
      return r.json()
    })
    ;
}
