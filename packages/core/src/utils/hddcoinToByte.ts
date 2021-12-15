import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function hddcoinToByte(hddcoin: string | number | Big): number {
  return hddcoinFormatter(hddcoin, Unit.HDDCOIN)
    .to(Unit.BYTE)
    .toNumber();
}