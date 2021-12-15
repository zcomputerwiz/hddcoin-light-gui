import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SelectKey, LayoutHero, LayoutDashboard } from '@hddcoin/core';
import { WalletAdd, WalletImport, Wallets  } from '@hddcoin/wallets';
import App from './App';
import FullNode from '../fullNode/FullNode';
import Block from '../block/Block';
import Settings from '../settings/Settings';
import Plot from '../plot/Plot';
import Farm from '../farm/Farm';
import Pool from '../pool/Pool';
import DashboardSideBar from '../dashboard/DashboardSideBar';

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App outlet />}>
          <Route element={<LayoutHero outlet />}>
            <Route index element={<SelectKey />} />
          </Route>
          <Route element={<LayoutHero back outlet />}>
            <Route path="wallet/add" element={<WalletAdd />} />
            <Route path="wallet/import" element={<WalletImport />} />
          </Route>
          <Route element={<LayoutDashboard sidebar={<DashboardSideBar />} outlet />}>
            <Route path="dashboard" element={<FullNode />} />
            <Route path="dashboard/block/:headerHash" element={<Block />} />
            <Route path="dashboard/wallets/*" element={<Wallets />} />
            <Route path="dashboard/settings/*" element={<Settings />} />
            <Route path="dashboard/plot/*" element={<Plot />} />
            <Route path="dashboard/farm/*" element={<Farm />} />
            <Route path="dashboard/pool/*" element={<Pool />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
