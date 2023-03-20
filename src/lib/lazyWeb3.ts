import type Web3 from "web3";
import type { AbiItem } from "web3-utils";

export const lazyWeb3 = () => import('web3').then(w => w.default);

const ETH_RPC_URL = 'https://rpc.ankr.com/eth' // 'https://ethereum.publicnode.com';

export const web3EthConnection = lazyWeb3().then(Web3 => new Web3(ETH_RPC_URL));

const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
export const web3BscConnection = lazyWeb3().then(Web3 => new Web3(BSC_RPC_URL));

const pomDataseed = "https://mainnet-rpc.memescan.io"; // https://rpc.pomchain.io

export const web3PomConnection = lazyWeb3().then(Web3 => new Web3(pomDataseed));

export async function createContractInstance (web3Promise: Promise<Web3>, abiiItems: AbiItem[], contractAddress: string) {
  const web3 = await web3Promise;

  return new web3.eth.Contract(abiiItems, contractAddress);
}

