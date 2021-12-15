import type { Wallet } from '@hddcoin/api';
import { WalletType } from '@hddcoin/api';
import { mojoToCATLocaleString, mojoToHDDcoinLocaleString } from '@hddcoin/core';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? mojoToCATLocaleString(value)
    : mojoToHDDcoinLocaleString(value);
}
