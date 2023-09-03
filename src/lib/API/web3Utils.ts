import type {Contract} from "web3-eth-contract";

export async function getSimpleInformation<T>(
  contract: Contract,
  methodName: string): Promise<T> {

  return await contract.methods[methodName]().call();
}

