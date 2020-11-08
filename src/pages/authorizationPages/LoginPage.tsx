import React, { useState } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { setUserType } from "modules/userType/userData.slice";
import { api } from "global/variables";
import { paths } from "router/paths";
import { Link } from "react-router-dom";
import { FormWrapper } from "components";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api
      .post("Users/login", { email, password })
      .then((resp) => {
        const user = resp.data.userData;
        dispatch(
          setUserType({ id: user.id, level: user.level, name: user.name })
        );
        localStorage.setItem("token", user.token);
        user.level <= 1
          ? history.push(paths.availableTimes)
          : user.level > 2
          ? history.push(paths.adminPage)
          : history.push(paths.reservedTimes);
      })
      .catch((resp) => alert(resp.response.data));
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
        <h2>Prisijungimas</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="El paštas"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            id="outlined-basic"
            label="Slaptažodis"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            style={{ paddingBottom: "20px" }}
          />
          <Link style={{ marginLeft: "auto" }} to={paths.resetPassword}>
            Pamiršau slaptažodį
          </Link>
          <br />
          <Button variant="contained" type="submit" color="primary">
            Prisijungti
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
};
export default Login;
