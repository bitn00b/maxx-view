import type {AbiItem} from "web3-utils";
import type {ContractSendMethodTyped, ContractTyped} from "../API/web3Typed";

export const maxxStakingContractAddress = '0x2D653c7256e5977B235421fD267E5623B8Cf8fcd';//maxx stake

export const ethStakingContractAddress = '0x06a1A9D831590Fa7074E16B53B855364D7e0f5bB';

export const bscStakingContractAddress = '0x3324aD43BE713A2EAAffC4a548C4287270BFE18d';

export type StakingInfo = {
  stakedMAXXPWRD: number;
  stakedSince: number;
  stakedTill: number;
  PWRDlastClaim: number;
  PWRDClaimed: number;
  PWRDDays: number;
  isStaked: number;
}

// @ts-expect-error Args typed
export type StakingContractType = ContractTyped<{
  ['stakerVaultPWRD']: (wallet: string) => ContractSendMethodTyped<StakingInfo>,
  viewRewardsEst: (wallet: string) => ContractSendMethodTyped<string>
}>;


export const maxxStakingAbii: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakerVaultPWRD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "stakedMAXXPWRD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stakedSince",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stakedTill",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "PWRDlastClaim",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "PWRDClaimed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "PWRDDays",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isStaked",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "viewRewardsEst",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PWRDFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {"inputs": [], "name": "PWR_Fee", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
  {
    "inputs": [],
    "name": "PWRDPoolExp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PWRDPoolInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "Stakers",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "TokenAmt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
]
