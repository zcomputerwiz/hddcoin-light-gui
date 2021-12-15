import type Wallet from '../types/Wallet';
import WalletType from '../constants/WalletType';
import { byte_to_colouredcoin_string, byte_to_hddcoin_string } from './hddcoin';

export default function getWalletHumanValue(wallet: Wallet, value: number): string {
  return wallet.type === WalletType.CAT
    ? byte_to_colouredcoin_string(value)
    : byte_to_hddcoin_string(value);
}
