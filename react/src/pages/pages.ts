import {lazy} from 'react';
import PageModel, {PageEnum} from '@models/PageModel';

export const HomePage = lazy(() => import('./HomePage'));
// export const RegistrationPage = lazy(() => import('./RegistrationPage'));
// export const LoginPage = lazy(() => import('./LoginPage'));

export const pages: PageModel[] = [
  {id: 1, title: 'Home', path: '/', component: HomePage, type: PageEnum.Home, exposed: true},
  // {id: 2, title: 'Registration', path: '/registration', component: RegistrationPage, type: PageEnum.Registration, exposed: false},
  // {id: 3, title: 'Login', path: '/login', component: LoginPage, type: PageEnum.Login, exposed: false},
];
