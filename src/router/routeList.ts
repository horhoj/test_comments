import { FC } from 'react';
import { generatePath } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Page404 } from '../pages/Page404';
import { TestPage } from '../pages/TestPage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes = 'Home' | 'TestPage' | 'Page404';

export const routeList: RouteItem[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },

  {
    name: 'TestPage',
    path: '/test-page/:id',
    component: TestPage,
  },

  {
    name: 'Page404',
    path: '*',
    component: Page404,
  },
];

export const getRoutePath = (
  routeName: Routes,
  id: string | null = null,
): string => {
  const index = routeList.findIndex(
    (routeItems) => routeItems.name === routeName,
  );

  const path = routeList[index].path;

  if (!id) {
    return path;
  }

  return generatePath(path, { id });
};
