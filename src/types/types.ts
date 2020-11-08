import { RouteProps } from "react-router-dom";

export interface IUserData {
  name: string;
  level: number;
  id: number;
}

export interface ReduxStoreRootTypes {
  userData: IUserData;
}

export interface Routes extends RouteProps {
  component: React.FC;
  path: string;
  protected: boolean | undefined;
  userLevel?: number;
}
