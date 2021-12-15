import React from 'react';
import { Trans } from '@lingui/macro';
import { useGetNetworkInfoQuery } from '@hddcoin/api-react';
import { CardSimple } from '@hddcoin/core';

export default function FullNodeCardNetworkName() {
  const { data: networkInfo, isLoading } = useGetNetworkInfoQuery(); 
  const value = networkInfo?.networkName;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>Network Name</Trans>}
      value={value}
    />
  );
}
