import { FC } from 'react';
import { generatePath } from 'react-router-dom';
import { Page404 } from '../pages/Page404';
import { PostListPage } from '../pages/PostListPage';
import { PostEditPage } from '../pages/PostEditPage';
import { PostNewPage } from '../pages/PostNewPage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes =
  | 'PostListPage'
  | 'PostEditPage'
  | 'PostNewPage'
  | 'Page404';

export const routeList: RouteItem[] = [
  {
    name: 'PostListPage',
    path: '/post-list',
    component: PostListPage,
  },

  {
    name: 'PostNewPage',
    path: '/post-new',
    component: PostNewPage,
  },

  {
    name: 'PostEditPage',
    path: '/post-edit/:id',
    component: PostEditPage,
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
