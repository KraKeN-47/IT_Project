import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { burgerMenuItemsData } from "./burgerMenuItemsData";

interface Props {
  handleClose: () => void;
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
}

const BurgerMenu: React.FC<Props> = (props: Props) => {
  const { handleClose, open, anchorEl } = props;
  const location = useLocation();
  const history = useHistory();

  const burgerMenuItems = burgerMenuItemsData({
    location,
    handleClose,
    history,
  });

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {burgerMenuItems.map((props) => (
        <MenuItem {...props} />
      ))}
    </Menu>
  );
};

export default BurgerMenu;
