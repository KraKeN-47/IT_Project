import { ListItemIcon, Menu, MenuItem, Typography } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

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
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.editProfile &&
            history.push(paths.editProfile);
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <Typography color="primary">Redaguoti profilį</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          location.pathname !== paths.myPets && history.push(paths.myPets);
        }}
      >
        <ListItemIcon>
          <PetsIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <Typography color="primary">Mano augintiniai</Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
