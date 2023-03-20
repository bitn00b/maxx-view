import type { TokensResult } from "../memeScanTypes";

export function getTokens (walletAddress: string): Promise<TokensResult> {
    return fetch(`https://memescan.io/api?module=account&action=tokenlist&address=${walletAddress}`).then(r => r.json())
  }
