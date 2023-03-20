
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
