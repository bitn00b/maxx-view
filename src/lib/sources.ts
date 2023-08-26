import {balanceOfABII} from "./ABII/balanceOfABII";
import {calculateRatioByContracts} from "./functions";
import type Web3 from "web3";
import {createContractInstance, web3BscConnection, web3EthConnection, web3MaxxConnection} from "./lazyWeb3";
import type {Contract} from "web3-eth-contract";
import type {CHAIN_TYPES, StaticTokenInformationDEX} from "./logic/types";

export type MemeScanResult = {
  message: string;
  status: string;
  result: {
    coin_usd: string;
    coin_usd_timestamp: string;
  }
}

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      console.info(xhr);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function (e) {
      console.info(e);
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

const decimals = 10 ** 18;

const CONTRACT_CACHE: { [key: string]: Promise<Contract> } = {}

const CONNECTIONS_BY_TYPE: Record<CHAIN_TYPES, Promise<Web3>> = {
  'bsc': web3BscConnection,
  'eth': web3EthConnection,
  'maxx': web3MaxxConnection
};


function getContractOfChain(address: string, chain: CHAIN_TYPES) {
  const cacheKey = `${chain}_${address}`;

  return CONTRACT_CACHE[cacheKey]
    ?? (CONTRACT_CACHE[cacheKey] = createContractInstance(CONNECTIONS_BY_TYPE[chain], [balanceOfABII], address));
}

export async function getTokenRatio(tokenInfo: StaticTokenInformationDEX) {
  const [tokenContract, baseTokenContract] = await Promise.all([
    getContractOfChain(tokenInfo.chainAddresses.tokenAddress, tokenInfo.chain),
    getContractOfChain(tokenInfo.chainAddresses.pairedWithContract, tokenInfo.chain),
  ])

  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract,
    baseTokenContract,
    addressOfLp: tokenInfo.chainAddresses.lpAddress
  });

  return tokenRatio;
}
