import { AppBar, Box, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectUserTypeState } from "modules/userType/userData.selector";
import { setUserType } from "modules/userType/userData.slice";
import { paths } from "router/paths";
import { AccountCircle, ArrowBackIos } from "@material-ui/icons";

const Layout = ({ children }: any) => {
  const userData = useSelector(selectUserTypeState);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLoginRedirect = () => {
    history.push(paths.login);
  };
  const handleRegisterRedirect = () => {
    history.push(paths.register);
  };
  const handleEditProfileRedirect = () => {
    history.push(paths.editProfile);
  };
  const handleGoBack = () => {
    history.goBack();
    console.log("not working");
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
            <IconButton onClick={handleEditProfileRedirect}>
              <AccountCircle fontSize="large" />
            </IconButton>
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
