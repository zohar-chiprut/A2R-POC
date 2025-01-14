import React, {Suspense, lazy} from 'react';
import PageModel, {PageEnum} from '@models/PageModel';

const HomePage = lazy(() => import('./HomePage'));
// const LoginPage = lazy(() => import('./LoginPage'));
// const RegistrationPage = lazy(() => import('./RegistrationPage'));

export interface PageRendererProps {
  page: PageModel;
}

const withDisplayName = (Component: React.ComponentType, displayName: string) => {
  Component.displayName = displayName;
  return Component;
};

const PageRenderer: React.FC<PageRendererProps> = ({page}) => {
  let Component;
  switch (page.type) {
    case PageEnum.Home:
      Component = withDisplayName(HomePage, PageEnum.Home);
      break;
    // case PageType.About:
    //   Component = withDisplayName(LoginPage, 'LoginPage');
    //   break;
    // case PageType.Contact:
    //   Component = withDisplayName(RegistrationPage, 'RegistrationPage');
    //   break;
    default:
      return <div>Page not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default PageRenderer;
