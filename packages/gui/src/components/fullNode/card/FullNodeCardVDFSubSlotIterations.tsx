import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatLargeNumber, CardSimple } from '@hddcoin/core';
import { useGetBlockchainStateQuery } from '@hddcoin/api-react';

export default function FullNodeCardVDFSubSlotIterations() {
  const { data, isLoading } = useGetBlockchainStateQuery();
  const value = data?.peak?.subSlotIters ?? 0;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>VDF Sub Slot Iterations</Trans>}
      value={<FormatLargeNumber value={value} />}
    />
  );
}
