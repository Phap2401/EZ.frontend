import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import LazyLoadComponent from '~/components/LazyLoadComponent';
import path from '~/constants/path';

const Register = LazyLoadComponent(lazy(() => import('~/pages/Register')));

const registerRoute: RouteObject = {
  path: path.REGISTER_PATH,
  element: <Register />,
  children: [],
};

const AuthenticationRoutes = {
  registerRoute,
};

export default AuthenticationRoutes;
