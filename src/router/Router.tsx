import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { paths } from "./paths";
import {
  LandingPage,
  LoginPage,
  AvailableOrdersListPage,
  RegisterPage,
  PlacedOrdersListPage,
  AdminPage,
  ResetPasswordPage,
  EditProfilePage,
  DisplayPetsPage,
  CreatePetPage,
} from "pages";
import { Routes } from "types/types";
import Path from "./Path";
import Layout from "pages/Layout";

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        {routes.map((route, index) => (
          <Path key={index} exact {...route} />
        ))}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export const routes: Routes[] = [
  {
    path: paths.home,
    component: LandingPage,
  },
  {
    path: paths.login,
    component: LoginPage,
  },
  {
    path: paths.register,
    component: RegisterPage,
  },
  {
    path: paths.availableTimes,
    component: AvailableOrdersListPage,
    protected: true,
    userLevel: 1,
  },
  {
    path: paths.reservedTimes,
    component: PlacedOrdersListPage,
    protected: true,
    userLevel: 2,
  },
  {
    path: paths.adminPage,
    component: AdminPage,
    protected: true,
    userLevel: 2,
  },
  {
    path: paths.resetPassword,
    component: ResetPasswordPage,
  },

  {
    path: paths.editProfile,
    component: EditProfilePage,
    protected: true,
  },
  {
    path: paths.myPets,
    component: DisplayPetsPage,
    protected: true,
  },
  {
    path: paths.addPet,
    component: CreatePetPage,
    protected: true,
  },
];

export default Router;
