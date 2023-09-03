import type {CallOptions, Contract, ContractSendMethod} from "web3-eth-contract";

export interface ContractTyped<TMethods extends Record<string, (...args: unknown[]) => ContractSendMethod>> extends Contract {
  methods: TMethods;
}

export interface ContractSendMethodTyped<TResult> extends ContractSendMethod {
  call(
    options?: CallOptions,
    callback?: (err: Error, result: any) => void
  ): Promise<TResult>;

}
