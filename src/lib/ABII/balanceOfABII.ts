import type { AbiItem } from "web3-utils";

export const balanceOfABII: AbiItem = {
  "constant": true,
  "inputs": [{"internalType": "address", "name": "", "type": "address"}],
  "name": "balanceOf",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
