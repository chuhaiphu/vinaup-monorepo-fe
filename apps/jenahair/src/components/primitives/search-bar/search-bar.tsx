import { cacheLife, cacheTag } from 'next/cache';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { getAllMenusActionPublic } from '@/actions/menu-action';
import { SearchBarContainer } from './search-bar-container/search-bar-container';
import { Suspense } from 'react';

export default async function SearchBar() {
  'use cache';
  cacheLife('hours');
  cacheTag('app-config');
  cacheTag('menu');

  const [configResponse, menusResponse] = await Promise.all([
    getAppConfigActionPublic(),
    getAllMenusActionPublic(),
  ]);

  const logoUrl = configResponse.data?.logoUrl;
  const menusData = menusResponse.data ?? [];

  return (
    <Suspense>
      <SearchBarContainer
        logoUrl={logoUrl || '/images/group1.png'}
        menusData={menusData}
      />
    </Suspense>
  );
}
