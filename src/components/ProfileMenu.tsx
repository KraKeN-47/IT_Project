import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "router/paths";

interface Props {
  handleClose: () => void;
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
}

const ProfileMenu: React.FC<Props> = (props: Props) => {
  const { handleClose, open, anchorEl } = props;
  const location = useLocation();
  const history = useHistory();
  return (
    <Menu
      anchorEl={anchorEl}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.editProfile &&
            history.push(paths.editProfile);
        }}
      >
        Redaguoti profilį
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.myPets && history.push(paths.myPets);
        }}
      >
        Mano augintiniai
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
