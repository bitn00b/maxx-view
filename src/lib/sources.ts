import {balanceOfABII} from "./ABII/balanceOfABII";
import type {StaticTokenInformationDEX} from "./logic/types";
import {getContractOfChain} from "./API/web3ContractCache";
import {calculateRatioByContracts} from "./API/tokenMathUtils";

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

export const decimals = 10 ** 18;

export async function getTokenRatio(tokenInfo: StaticTokenInformationDEX) {
  const [tokenContract, baseTokenContract] = await Promise.all([
    getContractOfChain(tokenInfo.chainInformation!.tokenAddress, tokenInfo.chain, [balanceOfABII]),
    getContractOfChain(tokenInfo.chainInformation!.pairedWithContract, tokenInfo.chain, [balanceOfABII]),
  ])

  const tokenRatio = await calculateRatioByContracts({
    tokenDecimals: tokenInfo.chainInformation.tokenDecimals ?? decimals,
    baseTokenDecimals: tokenInfo.chainInformation.pairedWithDecimals ?? decimals,

    tokenContract,
    baseTokenContract,
    addressOfLp: tokenInfo.chainInformation!.lpAddress
  });

  return tokenRatio;
}
