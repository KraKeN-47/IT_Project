import { Menu, MenuItem } from "@material-ui/core";
import { selectUserTypeLevel } from "modules/userType/userData.selector";
import React from "react";
import { useSelector } from "react-redux";
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
  const userLevel = useSelector(selectUserTypeLevel());

  const burgerMenuItems = burgerMenuItemsData({
    location,
    handleClose,
    history,
  });

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {userLevel > -1 &&
        burgerMenuItems
          .filter((item) => item.level <= userLevel)
          .filter((item) => item.name !== "login")
          .filter((item) => item.name !== "register")
          .map((props, index) => <MenuItem key={index} {...props} />)}
      {userLevel === -1 &&
        burgerMenuItems
          .filter((item) => item.level <= userLevel)
          .map((props, index) => <MenuItem key={index} {...props} />)}
    </Menu>
  );
};

export default BurgerMenu;
