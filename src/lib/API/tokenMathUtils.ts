import type {Contract} from "web3-eth-contract";
import {derived, type Readable} from "svelte/store";

export interface CalculatedTokenRatio {
  pairedTokenAmount: number;
  tokenAmount: number;
  ratio: number;
}


export function calculateRatio(args: {
  rawAmountOfBaseToken: number,
  decimalsOfBaseToken: number,
  rawAmountOfToken: number,
  decimalsOfToken: number
}): CalculatedTokenRatio {
  const baseTokenAmount = (args.rawAmountOfBaseToken / args.decimalsOfBaseToken);
  const tokenAmount = (args.rawAmountOfToken / args.decimalsOfToken);
  const ratio = baseTokenAmount
    / tokenAmount;

  return {
    pairedTokenAmount: baseTokenAmount,
    tokenAmount,
    ratio
  }
}

export async function calculateRatioByContracts(args: {
  baseTokenContract: Contract,
  baseTokenDecimals: number,
  tokenContract: Contract,
  tokenDecimals: number,
  addressOfLp: string
}): Promise<CalculatedTokenRatio> {
  const rawAmountOfBaseToken = (await args.baseTokenContract.methods.balanceOf(args.addressOfLp).call());
  const rawAmountOfToken = await args.tokenContract.methods.balanceOf(args.addressOfLp).call();

  console.info({
    args,
    rawAmountOfBaseToken,
    rawAmountOfToken
  })

  return calculateRatio({
    rawAmountOfBaseToken,
    decimalsOfBaseToken: args.baseTokenDecimals,
    rawAmountOfToken,
    decimalsOfToken: args.tokenDecimals
  });
}


export function deriveActualPrice(
  tokenRatioStore: Readable<CalculatedTokenRatio>,
  baseTokenPriceStore: Readable<number>
) {
  return derived([tokenRatioStore, baseTokenPriceStore], ([tokenRatio, baseTokenPrice]) => {
    if (!tokenRatio) {
      return 0;
    }

    return tokenRatio.ratio * baseTokenPrice;
  })
}
