import type { Wallet } from '@hddcoin/api';
import { WalletType } from '@hddcoin/api';
import { byteToCATLocaleString, byteToHDDcoinLocaleString } from '@hddcoin/core';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? byteToCATLocaleString(value)
    : byteToHDDcoinLocaleString(value);
}
