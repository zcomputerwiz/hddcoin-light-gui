import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function catToByte(cat: string | number | Big): string {
  return hddcoinFormatter(cat, Unit.CAT)
    .to(Unit.BYTE)
    .toString();
}