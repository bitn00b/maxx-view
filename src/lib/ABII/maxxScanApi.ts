import type {TokensResult} from "../memeScanTypes";
import type {MemeScanResult} from "../sources";

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
