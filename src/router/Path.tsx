import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { selectUserTypeState } from "modules/userType/userData.selector";
import { IUserData, Routes } from "types/types";
import { FadeWrapper } from "components";
import Layout from "pages/Layout";

interface ProtectedRouteProps {
  userType: IUserData;
  routeProps: Routes;
}

const ProtectedRoute = ({ routeProps, userType }: ProtectedRouteProps) => (
  <>
    {routeProps.userLevel !== undefined &&
    routeProps.userLevel <= userType.level ? (
      <Route {...routeProps} />
    ) : (
      <Redirect to="/404" />
    )}
  </>
);

const Path = (props: Routes) => {
  const userType = useSelector(selectUserTypeState);
  const dispatch = useDispatch();
  const protectedRouteProps: ProtectedRouteProps = {
    routeProps: props,
    userType,
  };
  return (
    <Layout>
      <FadeWrapper>
        {props.protected ? (
          <ProtectedRoute {...protectedRouteProps} />
        ) : (
          <Route {...props} />
        )}
      </FadeWrapper>
    </Layout>
  );
};

export default Path;
