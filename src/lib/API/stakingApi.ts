import {getContractOfChain} from "./web3ContractCache";
import {decimals} from "../sources";
import type {StakingContractType, StakingInfo} from "../ABII/maxxStakingAbii";
import {
  bscStakingContractAddress,
  ethStakingContractAddress,
  maxxStakingAbii,
  maxxStakingContractAddress
} from "../ABII/maxxStakingAbii";
import type {CHAIN_TYPES} from "../logic/types";
import {getSimpleInformation} from "./web3Utils";
import {singletonCache} from "../logic/singletonCache";

const StakingAddressByChain: Record<CHAIN_TYPES, string> = {
  maxx: maxxStakingContractAddress,
  bsc: bscStakingContractAddress,
  eth: ethStakingContractAddress,
}

const stakingContract = (chain: CHAIN_TYPES) => getContractOfChain(StakingAddressByChain[chain], chain, maxxStakingAbii);

export async function getStakingInfo(
  chain: CHAIN_TYPES, wallet: string): Promise<StakingInfo> {
  const stakingContractInstance: StakingContractType = await stakingContract(chain);

  const initialResult: StakingInfo = await stakingContractInstance.methods.stakerVaultPWRD(wallet).call();

  return {
    stakedSince: initialResult.stakedSince,
    stakedTill: initialResult.stakedTill,
    PWRDDays: initialResult.PWRDDays,
    PWRDlastClaim: initialResult.PWRDlastClaim,
    isStaked: initialResult.isStaked,

    stakedMAXXPWRD: initialResult.stakedMAXXPWRD / decimals,
    PWRDClaimed: initialResult.PWRDClaimed / decimals,
  }
}


export async function rewardsEstimate(
  chain: CHAIN_TYPES, wallet: string
): Promise<number> {
  const stakingContractInstance: StakingContractType = await stakingContract(chain);

  const rewardsAsString: string = await stakingContractInstance.methods.viewRewardsEst(wallet).call();

  return Number.parseInt(rewardsAsString) / decimals;
}


export async function globalInformations(chain: CHAIN_TYPES) {
  const stakingContractInstance: StakingContractType = await stakingContract(chain);

  const PWRDPoolInfo = await getSimpleInformation<unknown>(stakingContractInstance, 'PWRDPoolInfo');

  return {
    PWRDPoolInfo
  }
}

const stakingFeeCache = singletonCache<number>();

export function getStakingFee(chain: CHAIN_TYPES) {
  return stakingFeeCache.get(chain, async () => {
    const stakingContractInstance: StakingContractType = await stakingContract(chain);

    return await getSimpleInformation<number>(stakingContractInstance,  chain === 'maxx' ? 'PWR_Fee' : 'PWRDFee');
  })
}
