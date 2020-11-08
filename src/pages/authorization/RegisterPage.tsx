import { Box, Button, TextField, Select, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

import { api } from "global/variables";
import { paths } from "router/paths";
import { setUserType } from "modules/userType/userData.slice";
import { FormWrapper } from "components";

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api
      .post("/Users", {
        name,
        email,
        password,
      })
      .then((resp: any) => {
        const data: any = jwt(resp.data.authToken);
        alert("Vartotojas užregistruotas");
        localStorage.setItem("token", resp.data.authToken);
        dispatch(
          setUserType({
            level: data.level,
            name: data.name,
            id: data.id,
          })
        );
        history.push(paths.availableTimes);
      })
      .catch((x) => alert(x.response.data));
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
        <h2>Registracija</h2>
        <form style={{ display: "grid" }} onSubmit={handleSubmit}>
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Slapyvardis"
            name="name"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Vardas"
            name="name"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pavardė"
            name="name"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="El. Paštas"
            name="email"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Adresas"
            name="email"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Slaptažodis"
            name="password"
            type="password"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pakartokite slaptažodį"
            name="repeatPassword"
            type="password"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Asmens Kodas"
            name="answer"
            type="text"
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Telefono Nr."
            name="answer"
            type="text"
            required
          />
          <Button color="primary" variant="contained" type="submit">
            Registruotis
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
};
export default RegisterPage;
