import type {Contract} from "web3-eth-contract";
import type {CHAIN_TYPES} from "../logic/types";
import {CONNECTIONS_BY_TYPE} from "./web3Connections";
import type {AbiItem} from "web3-utils";
import type Web3 from "web3";

const CONTRACT_CACHE: { [key: string]: Promise<Contract> } = {}

export async function createContractInstance(web3Promise: Promise<Web3>, abiiItems: AbiItem[], contractAddress: string) {
  const web3 = await web3Promise;

  return new web3.eth.Contract(abiiItems, contractAddress);
}

export function getContractOfChain(
  address: string,
  chain: CHAIN_TYPES,
  abiiItems: AbiItem[],
) {
  const cacheKey = `${chain}_${address}`;


  return CONTRACT_CACHE[cacheKey]
    ?? (CONTRACT_CACHE[cacheKey] = createContractInstance(CONNECTIONS_BY_TYPE[chain], abiiItems, address));
}
