import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function byteToCAT(byte: string | number | Big): number {
  return hddcoinFormatter(byte, Unit.BYTE)
    .to(Unit.CAT)
    .toNumber();
}