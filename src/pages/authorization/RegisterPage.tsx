import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

import { api } from "global/variables";
import { paths } from "router/paths";
import { login } from "modules/userType/userData.slice";
import { FormWrapper } from "components";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [socialSecNr, setSocialSecNr] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/Auth/registerUser", {
        userName,
        vardas: name,
        pavarde: surName,
        pastas: email,
        adresas: address,
        password,
        asmensKodas: socialSecNr,
        telefononr: phoneNumber,
      })
      .then((resp: any) => {
        const data: any = jwt(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            level: data.level,
            name: data.name,
            id: data.id,
          })
        );
        history.push(paths.addPet);
        alert("Vartotojas užregistruotas");
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
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Vardas"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pavardė"
            name="surname"
            onChange={(e) => setSurName(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="El. Paštas"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Adresas"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Slaptažodis"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pakartokite slaptažodį"
            name="repeatPassword"
            type="password"
            onChange={(e) => setRepeatPass(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Asmens Kodas"
            name="socialSecNr"
            type="text"
            onChange={(e) => setSocialSecNr(e.target.value)}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Telefono Nr."
            name="phoneNumber"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
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
