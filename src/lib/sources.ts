import { balanceOfABII } from "./ABII/balanceOfABII";
import { calculateRatioByContracts } from "./functions";
import type { CalculatedTokenRatio } from "./state";
import { createContractInstance, web3BscConnection, web3EthConnection, web3PomConnection } from "./lazyWeb3";
import {
  BSC_LP,
  ETH_LP, MAXX_CONTRACT, MAXX_LP, MMP_CONTRACT, MMP_LP,
  POM_BSC_CONTRACT,
  POM_ETH_CONTRACT, POMD_CONTRACT, POMD_LP, POMG_CONTRACT, POMG_LP, UMC_CONTRACT, UMC_LP,
  WBNB_CONTRACT,
  WETH_CONTRACT,
  WPOM_CONTRACT
} from "./TokenConstants";

export type MemeScanResult = {
  message: string;
  status: string;
  result: {
    coin_usd: string;
    coin_usd_timestamp: string;
  }
}

function makeRequest (method, url) {
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

// catch and maybe show that an adblocker might blocked this...
export function getMemeScanPrice (): Promise<MemeScanResult> {
  return fetch('https://memescan.io/api?module=stats&action=coinprice', {
     mode: 'cors',
    referrerPolicy: 'unsafe-url',
  })
    .then(r => {
     return r.json()})
    ;
}

const decimals = 10 ** 18;

const web3EthContract = createContractInstance(web3EthConnection, [balanceOfABII], WETH_CONTRACT);
const web3EthPomContract = createContractInstance(web3EthConnection, [balanceOfABII], POM_ETH_CONTRACT);

const web3BscContract = createContractInstance(web3BscConnection, [balanceOfABII], WBNB_CONTRACT);
const web3BscPomContract = createContractInstance(web3BscConnection, [balanceOfABII], POM_BSC_CONTRACT);


export async function getPomEthRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3EthPomContract,
    baseTokenContract: await web3EthContract, addressOfLp: ETH_LP
  });

  return tokenRatio;
}

export async function getPomBscRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3BscPomContract,
    baseTokenContract: await web3BscContract, addressOfLp: BSC_LP
  });

  return tokenRatio;
}


const web3WPOMContract = createContractInstance(web3PomConnection, [balanceOfABII], WPOM_CONTRACT);
const web3PomPomGContract = createContractInstance(web3PomConnection, [balanceOfABII], POMG_CONTRACT);

export async function getPomPomGRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3PomPomGContract,
    baseTokenContract: await web3WPOMContract, addressOfLp: POMG_LP
  });

  return tokenRatio;
}

const web3PomPomDContract = createContractInstance(web3PomConnection, [balanceOfABII], POMD_CONTRACT);

export async function getPomPomDRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3PomPomDContract,
    baseTokenContract: await web3WPOMContract, addressOfLp: POMD_LP
  });

  return tokenRatio;
}

const web3PomUmcContract = createContractInstance(web3PomConnection, [balanceOfABII], UMC_CONTRACT);

export async function getPomUmcRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3PomUmcContract,
    baseTokenContract: await web3WPOMContract, addressOfLp: UMC_LP
  });

  return tokenRatio;
}

const web3PomMaxxContract = createContractInstance(web3PomConnection, [balanceOfABII], MAXX_CONTRACT);

export async function getPomMaxxRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3PomMaxxContract,
    baseTokenContract: await web3WPOMContract, addressOfLp: MAXX_LP
  });

  return tokenRatio;
}

const web3PomMMPContract = createContractInstance(web3PomConnection, [balanceOfABII], MMP_CONTRACT);

export async function getPomMMPRatio (): Promise<CalculatedTokenRatio> {
  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: decimals,
    baseTokenDecimals: decimals,

    tokenContract: await web3PomMMPContract,
    baseTokenContract: await web3WPOMContract, addressOfLp: MMP_LP
  });

  return tokenRatio;
}
