import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { paths } from "./paths";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  EditProfilePage,
  DisplayPetsPage,
  CreatePetPage,
  DisplayWorkersPage,
  WorkerPage,
  DisplayInventoryPage,
  InventoryPage,
  DisplayServicesPage,
  ServicesPage,
  ReserveServicePage,
  AvatarOptionsPage,
} from "pages";
import { Routes } from "types/types";
import Path from "./Path";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => (
        <Path key={index} exact {...route} />
      ))}
    </Switch>
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
    path: paths.resetPassword,
    component: ResetPasswordPage,
  },

  {
    path: paths.editProfile,
    component: EditProfilePage,
    userLevel: 1,
    protected: true,
  },
  {
    path: paths.profilePicture,
    component: AvatarOptionsPage,
    userLevel: 1,
    protected: true,
  },
  {
    path: paths.myPets,
    component: DisplayPetsPage,
    userLevel: 1,
    protected: true,
  },
  {
    path: paths.addPet,
    component: CreatePetPage,
    userLevel: 1,
    protected: true,
  },
  {
    path: paths.workers,
    component: DisplayWorkersPage,
    userLevel: 3,
    protected: true,
  },
  {
    path: paths.addWorker,
    component: WorkerPage,
    userLevel: 3,
    protected: true,
  },
  {
    path: paths.editWorker,
    component: WorkerPage,
    userLevel: 3,
    protected: true,
  },
  {
    path: paths.inventory,
    component: DisplayInventoryPage,
    userLevel: 2,
    protected: true,
  },
  {
    path: paths.editInventory,
    component: InventoryPage,
    userLevel: 3,
    protected: true,
  },
  {
    path: paths.addInventory,
    component: InventoryPage,
    userLevel: 3,
    protected: true,
  },
  {
    path: paths.addService,
    component: ServicesPage,
    userLevel: 2,
    protected: true,
  },
  {
    path: paths.editService,
    component: ServicesPage,
    userLevel: 2,
    protected: true,
  },
  {
    path: paths.services,
    component: DisplayServicesPage,
    userLevel: 1,
    protected: true,
  },
  {
    path: paths.userServices,
    component: ReserveServicePage,
  },
  {
    path: paths.myServices,
    component: ReserveServicePage,
    userLevel: 1,
    protected: true,
  },
];

export default Router;
