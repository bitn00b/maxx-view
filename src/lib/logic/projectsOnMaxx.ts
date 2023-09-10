import type {StaticTokenInformationDEX} from "./types";
import {charts, homepage, link} from "../urlIconFunctions";
import {WPWR_CONTRACT} from "./chainTokens";

const SAFUMAXX_TOKEN = '0x496aF7721811482f18D5f92C07718572B3Dd309D';

const SAFUMAXX_LP = '0xf19eb6b24e5ba102543af98e8e69936c78821a69';


export const SAFU_PWR: StaticTokenInformationDEX = {
  id: 'safuPwr',
  tokenName: 'SafuMaxx',
  title: 'SafuMaxx (PWR)',
  chain: 'maxx',
  type: 'chain',
  urls: [
    ...charts('maxx', SAFUMAXX_LP),
    homepage('https://safumaxx.com/'),
    link('https://safumaxxdapp.vercel.app/', 'DAPP')
  ],
  chainInformation: {
    tokenAddress: SAFUMAXX_TOKEN,
    tokenDecimals: 10**5,
    lpAddress: SAFUMAXX_LP,
    pairedWith: 'PWR',
    pairedWithContract: WPWR_CONTRACT
  }
}
