import type Web3 from "web3";
import type {CHAIN_TYPES} from "../logic/types";

export const lazyWeb3 = () => import('web3').then(w => w.default);

const ETH_RPC_URL = 'https://rpc.ankr.com/eth' // 'https://ethereum.publicnode.com';

export const web3EthConnection = lazyWeb3().then(Web3 => new Web3(ETH_RPC_URL));

const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";
export const web3BscConnection = lazyWeb3().then(Web3 => new Web3(BSC_RPC_URL));

const maxxChainDataseed = "https://mainrpc2.maxxchain.org";

export const web3MaxxConnection = lazyWeb3().then(Web3 => new Web3(maxxChainDataseed));



export const CONNECTIONS_BY_TYPE: Record<CHAIN_TYPES, Promise<Web3>> = {
  'bsc': web3BscConnection,
  'eth': web3EthConnection,
  'maxx': web3MaxxConnection
};
