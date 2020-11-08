import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import jwt from "jwt-decode";

import { selectUserTypeState } from "modules/userType/userData.selector";
import { setUserType } from "modules/userType/userData.slice";
import { IUserData, Routes } from "types/types";

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
      <Redirect to="/" />
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
  const token = localStorage.getItem("token");
  if (userType.level === 0 && token !== null) {
    const data: IUserData = jwt(token);
    dispatch(setUserType({ id: data.id, name: data.name, level: data.level }));
  }
  return (
    <>
      {false ? (
        <ProtectedRoute {...protectedRouteProps} />
      ) : (
        <Route {...props} />
      )}
    </>
  );
};

export default Path;
