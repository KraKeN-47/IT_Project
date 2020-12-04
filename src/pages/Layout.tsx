import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  selectUserName,
  selectUserTypeState,
} from "modules/userType/userData.selector";
import { logout } from "modules/userType/userData.slice";
import { paths } from "router/paths";
import { ArrowBackIos } from "@material-ui/icons";
import { BurgerMenu, ProfileMenu } from "components";
import { selectImagePath } from "modules/image/image.selector";

const Layout = ({ children }: any) => {
  const [auth, setAuth] = useState(false);
  const [
    profileAnchorEl,
    setProfileAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(profileAnchorEl);
  const imagePath = useSelector(selectImagePath());
  const userName = useSelector(selectUserName());
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const openMenu = Boolean(menuAnchorEl);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const userData = useSelector(selectUserTypeState);
  const history = useHistory();

  const dispatch = useDispatch();
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  const handleGoBack = () => {
    history.goBack();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    history.push(paths.home);
    alert("Sėkmingai atsijungėte");
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          >
            <MenuIcon style={{ color: "tan" }} />
          </IconButton>
          <BurgerMenu
            anchorEl={menuAnchorEl}
            handleClose={handleMenuClose}
            open={openMenu}
          />

          <IconButton onClick={handleGoBack}>
            <ArrowBackIos style={{ color: "tan" }} />
          </IconButton>
          {userData.level > 0 && (
            <Typography
              style={{
                alignSelf: "center",
                fontFamily: "cursive",
                margin: "auto",
              }}
              variant="h6"
            >
              {userName}
            </Typography>
          )}

          <Box ml="auto" display="flex">
            {userData.level > 0 && (
              <Box alignSelf="center">
                <Button
                  size="medium"
                  variant="outlined"
                  style={{ color: "white", borderColor: "white" }}
                  onClick={handleLogout}
                >
                  Atsijungti
                </Button>
              </Box>
            )}
            {userData.level > 0 && (
              <IconButton
                onClick={(e) => {
                  setAuth(true);
                  setProfileAnchorEl(e.currentTarget);
                }}
              >
                <Avatar src={imagePath} />
              </IconButton>
            )}
            {auth && (
              <ProfileMenu
                anchorEl={profileAnchorEl}
                handleClose={handleProfileClose}
                open={openProfile}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box id="layout" width="100%" height="100%">
        {children}
      </Box>
    </>
  );
};

export default Layout;
