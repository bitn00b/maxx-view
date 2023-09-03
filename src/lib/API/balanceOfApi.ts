import {getContractOfChain} from "./web3ContractCache";
import {balanceOfABII} from "../ABII/balanceOfABII";
import {type CHAIN_TYPES} from "../logic/types";
import {decimals} from "../sources";
import {CONNECTIONS_BY_TYPE} from "./web3Connections";

export async function balanceOfToken(
  chain: CHAIN_TYPES,
  walletAddress: string,
  tokenContractAddress: string,
  tokenDecimals: number = decimals
) {
  const tokenContractInstance = await getContractOfChain(tokenContractAddress, chain, [balanceOfABII]);

  const rawAmountOfBaseToken = (await tokenContractInstance.methods.balanceOf(walletAddress).call());

  return rawAmountOfBaseToken / tokenDecimals;

}


export async function balanceOf(
  chain: CHAIN_TYPES,
  walletAddress: string,
  tokenDecimals: number = decimals
) {
  const connection = await CONNECTIONS_BY_TYPE[chain];

  return Number.parseFloat(await connection.eth.getBalance(walletAddress)) / tokenDecimals;
}
