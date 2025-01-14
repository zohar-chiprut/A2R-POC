export enum PageEnum {
  Home = 'Home',
  Registration = 'Registration',
  Login = 'Login',
}

export default interface PageModel {
  id: number;
  title: string;
  path: string;
  component: React.ComponentType;
  type: PageEnum;
  exposed: boolean;
}
