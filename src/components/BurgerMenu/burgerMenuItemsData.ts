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
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.inventory && history.push(paths.inventory);
    },
    children: "Inventorius",
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.workers && history.push(paths.workers);
    },
    children: "Darbuotojai",
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.register && history.push(paths.register);
    },
    children: "Registruotis",
  },
  {
    onClick: () => {
      handleClose();
      location.pathname !== paths.login && history.push(paths.login);
    },
    children: "Prisijungti",
  },
];
