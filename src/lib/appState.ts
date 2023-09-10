import {writable} from "svelte/store";
import {localStoredSettingJson} from "./utils";

export const showWalletConfigModal = writable(false);
export const showTippingModal = writable(false);


export interface WalletEntry {
  wallet: string;
  name: string;
}

export const walletsStore = localStoredSettingJson<WalletEntry[]>('maxx_view_wallets', []);

export function addNewWallet() {
  walletsStore.update(value => {
    value.push({
      wallet: '', name:
        ''
    });

    return value;
  });
}

export function deleteWallet(walletAddress: string) {
  walletsStore.update(value => {
    const indexOf = value.findIndex(e => e.wallet === walletAddress);

    value.splice(indexOf, 1);

    return value;
  });
}
