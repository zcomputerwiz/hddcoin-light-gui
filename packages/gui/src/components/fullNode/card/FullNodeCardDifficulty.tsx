import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatLargeNumber, CardSimple } from '@hddcoin/core';
import { useGetBlockchainStateQuery } from '@hddcoin/api-react';

export default function FullNodeCardDifficulty() {
  const { data, isLoading } = useGetBlockchainStateQuery();
  const value = data?.difficulty;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>Difficulty</Trans>}
      value={<FormatLargeNumber value={value} />}
    />
  );
}
