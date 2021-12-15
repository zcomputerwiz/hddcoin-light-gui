import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function byteToCATLocaleString(byte: string | number | Big) {
  return hddcoinFormatter(Number(byte), Unit.BYTE)
    .to(Unit.CAT)
    .toLocaleString();
}