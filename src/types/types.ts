import { RouteProps } from "react-router-dom";

export interface IUserData {
  name: string;
  level: number;
  id: number;
}

export interface Image {
  imagePath: string;
}

export interface ReduxStoreRootTypes {
  userData: IUserData;
  image: Image;
}

export interface Routes extends RouteProps {
  component: React.FC;
  path: string;
  protected?: boolean | undefined;
  userLevel?: number;
}
