import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "router/paths";

interface Props {
  handleClose: () => void;
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
}

const BurgerMenu: React.FC<Props> = (props: Props) => {
  const { handleClose, open, anchorEl } = props;
  const location = useLocation();
  const history = useHistory();
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.services && history.push(paths.services);
        }}
      >
        Paslaugos
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.inventory &&
            history.push(paths.inventory);
        }}
      >
        Inventorius
      </MenuItem>
    </Menu>
  );
};

export default BurgerMenu;
