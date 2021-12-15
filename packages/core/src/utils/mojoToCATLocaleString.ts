import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function mojoToCATLocaleString(mojo: string | number | Big) {
  return hddcoinFormatter(Number(mojo), Unit.MOJO)
    .to(Unit.CAT)
    .toLocaleString();
}