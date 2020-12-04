import { paths } from "router/paths";
import { History, Location } from "history";

interface Props {
  location: Location;
  history: History;
  handleClose: () => void;
}

export const burgerMenuItemsData = ({
  location,
  handleClose,
  history,
}: Props) => [
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.services && history.push(paths.services);
    },
    children: "Paslaugos",
    level: 2,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.inventory && history.push(paths.inventory);
    },
    children: "Inventorius",
    level: 2,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.workers && history.push(paths.workers);
    },
    children: "Darbuotojai",
    level: 2,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.users && history.push(paths.users);
    },
    children: "Klientai",
    level: 2,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.register && history.push(paths.register);
    },
    children: "Registruotis",
    level: -1,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.login && history.push(paths.login);
    },
    children: "Prisijungti",
    level: -1,
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.userServices &&
        history.push(paths.userServices);
    },
    children: "Teikiamos paslaugos",
    level: -1,
  },
];
