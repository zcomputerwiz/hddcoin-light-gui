import React from 'react';
import { Trans } from '@lingui/macro';
import { CardSimple } from '@hddcoin/core';
import { ServiceName } from '@hddcoin/api';
import { useIsServiceRunningQuery } from '@hddcoin/api-react';

export default function FullNodeCardConnectionStatus() {
  const { data: isRunning, isLoading } = useIsServiceRunningQuery({
    service: ServiceName.FULL_NODE,
  }, {
    pollingInterval: 1000,
  });

  return (
    <CardSimple
      loading={isLoading}
      valueColor={isRunning ? 'primary' : 'textPrimary'}
      title={<Trans>Connection Status</Trans>}
      value={
        isRunning ? <Trans>Connected</Trans> : <Trans>Not connected</Trans>
      }
    />
  );
}
