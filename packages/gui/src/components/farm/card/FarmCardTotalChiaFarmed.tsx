import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, byteToHDDcoinLocaleString } from '@hddcoin/core';
import { useGetFarmedAmountQuery } from '@hddcoin/api-react';
import FarmCard from './FarmCard';

export default function FarmCardTotalHDDcoinFarmed() {
  const currencyCode = useCurrencyCode();
  const { data, isLoading } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalHDDcoinFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {byteToHDDcoinLocaleString(farmedAmount)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount]);

  return (
    <FarmCard
      title={<Trans>Total HDDcoin Farmed</Trans>}
      value={totalHDDcoinFarmed}
      loading={isLoading}
    />
  );
}
