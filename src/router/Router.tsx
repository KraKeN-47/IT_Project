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
  DisplayWorkersPage,
  WorkerPage,
  DisplayInventoryPage,
  InventoryPage,
  DisplayServicesPage,
  ServicesPage,
  ReserveServicePage,
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
  {
    path: paths.workers,
    component: DisplayWorkersPage,
    protected: true,
  },
  {
    path: paths.addWorker,
    component: WorkerPage,
    protected: true,
  },
  {
    path: paths.editWorker,
    component: WorkerPage,
    protected: true,
  },
  {
    path: paths.inventory,
    component: DisplayInventoryPage,
    protected: true,
  },
  {
    path: paths.editInventory,
    component: InventoryPage,
    protected: true,
  },
  {
    path: paths.addInventory,
    component: InventoryPage,
    protected: true,
  },
  {
    path: paths.addService,
    component: ServicesPage,
    protected: true,
  },
  {
    path: paths.editService,
    component: ServicesPage,
    protected: true,
  },
  {
    path: paths.services,
    component: DisplayServicesPage,
    protected: true,
  },
  {
    path: paths.userServices,
    component: ReserveServicePage,
    protected: true,
  },
  {
    path: paths.myServices,
    component: ReserveServicePage,
    protected: true,
  },
];

export default Router;
