import { AppBar, Box, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { selectUserTypeState } from "modules/userType/userData.selector";
import { setUserType } from "modules/userType/userData.slice";
import { paths } from "router/paths";
import { AccountCircle, ArrowBackIos } from "@material-ui/icons";
import { ProfileMenu } from "components";

const Layout = ({ children }: any) => {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const userData = useSelector(selectUserTypeState);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLoginRedirect = () => {
    history.push(paths.login);
  };
  const handleRegisterRedirect = () => {
    location.pathname !== paths.register && history.push(paths.register);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGoBack = () => {
    history.goBack();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserType({ id: -1, level: 0, name: "" }));
    alert("Sėkmingai atsijungėte");
  };
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleGoBack}>
            <ArrowBackIos style={{ color: "tan" }} />
          </IconButton>
          <Box ml="auto">
            <Button
              style={{ backgroundColor: "tan" }}
              variant="contained"
              onClick={handleRegisterRedirect}
            >
              Registruotis
            </Button>
            <Button
              style={{ backgroundColor: "tan" }}
              variant="contained"
              onClick={handleLoginRedirect}
            >
              Prisijungti
            </Button>
            <Button style={{ backgroundColor: "tan" }} variant="contained">
              Atsijungti
            </Button>
            <IconButton
              onClick={(e) => {
                setAuth(true);
                setAnchorEl(e.currentTarget);
              }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            {auth && (
              <ProfileMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                open={open}
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