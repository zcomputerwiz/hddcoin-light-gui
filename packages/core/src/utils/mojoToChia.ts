import Big from 'big.js';
import Unit from '../constants/Unit';
import hddcoinFormatter from './hddcoinFormatter';

export default function mojoToHDDcoin(mojo: string | number | Big): number {
  return hddcoinFormatter(mojo, Unit.MOJO)
    .to(Unit.HDDCOIN)
    .toNumber();
}