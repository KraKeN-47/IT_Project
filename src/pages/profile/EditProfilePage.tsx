import {
  Box,
  Button,
  createStyles,
  Fab,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import jwt from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "modules/userType/userData.selector";
import { FormWrapper } from "components";
import { api } from "global/variables";
import { useHistory } from "react-router";
import { paths } from "router/paths";
import { logout } from "modules/userType/userData.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
  })
);

export default function EditProfilePage() {
  const userId = useSelector(selectUserId());
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  const initialState = (stateName: string) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const tokenData: any = jwt(token);
      if (stateName === "email") {
        return tokenData.email;
      }
      if (stateName === "adresas") {
        return tokenData.adresas;
      }
      if (stateName === "telefonoNumeris") {
        return tokenData.phoneNumber;
      }
    }
  };
  const [email, setEmail] = useState(initialState("email"));
  const [adresas, setAdresas] = useState(initialState("adresas"));
  const [telefonoNumeris, setTelefonoNumeris] = useState(
    initialState("telefonoNumeris")
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== initialState("email")) {
      const resp = await api.post("/Auth/changeEmail", {
        userId: userId.toString(),
        email,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    if (adresas !== initialState("adresas")) {
      const resp = await api.post("/Auth/changeAddress", {
        userId: userId.toString(),
        address: adresas,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    if (telefonoNumeris !== initialState("telefonoNumeris")) {
      const resp = await api.post("/Auth/changePhoneNumber", {
        userId: userId.toString(),
        phoneNumber: telefonoNumeris,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    window.location.reload();
  };
  const handleDeleteUser = async () => {
    try {
      const resp = await api.delete(`/Auth/deleteUser/${userId}`);
      history.push(paths.home);
      localStorage.removeItem("token");
      dispatch(logout());
      alert(resp.data.message);
    } catch (error) {
      alert("Serverio klaida");
    }
  };

  return (
    <FormWrapper>
      <Box
        width="30%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Profilio redagavimas</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="El.Paštas"
            name="email"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
          <TextField
            id="outlined-basic"
            label="Adresas"
            name="adresas"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setAdresas(e.target.value)}
            defaultValue={adresas}
          />
          <TextField
            id="outlined-basic"
            label="Telefono Numeris"
            name="telNr"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setTelefonoNumeris(e.target.value)}
            defaultValue={telefonoNumeris}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px" }}
            onClick={() => history.push(paths.profilePicture)}
          >
            Profilio nuotraukos nustatymai
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Patvirtinti
          </Button>
        </form>
        <h4 style={{ paddingTop: "20px" }}>Šalinti paskyrą</h4>
        <Fab onClick={() => setIsModal(true)}>
          <DeleteIcon />
        </Fab>
        <Modal
          className={classes.modal}
          open={isModal}
          onClose={() => setIsModal(false)}
        >
          <div className={classes.paper}>
            <Typography variant="h4">
              Ar tikrai norite pašalinti paskyrą?
            </Typography>
            <div className={classes.buttons}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleDeleteUser}
              >
                Tęsti
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={() => setIsModal(false)}
              >
                Atšaukti
              </Button>
            </div>
          </div>
        </Modal>
      </Box>
    </FormWrapper>
  );
}
