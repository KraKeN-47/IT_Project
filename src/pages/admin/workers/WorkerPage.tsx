import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { api } from "global/variables";
import { paths } from "router/paths";
import { FormWrapper } from "components";

const AddWorkerPage = (data: any) => {
  const props = data.location.state ? data.location.state.props : null;
  const history = useHistory();
  const [name, setName] = useState(props ? props.name : "");
  const [surname, setSurname] = useState(props ? props.surname : "");
  const [email, setEmail] = useState(props ? props.email : "");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [socialNr, setSocialNr] = useState(props ? props.socialNr : "");
  const [phoneNr, setPhoneNr] = useState(props ? props.phoneNr : "");
  const [address, setAddress] = useState(props ? props.address : "");
  const [position, setPosition] = useState(props ? props.position : "");
  const [isAdmin, setIsAdmin] = useState(props ? props.isAdmin : false);

  const handleChange = (e) => {
    e.preventDefault();
    const input = e.target.name;
    const value = e.target.value;
    switch (input) {
      case "name": {
        setName(value);
        break;
      }
      case "surname": {
        setSurname(value);
        break;
      }
      case "email": {
        setEmail(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
      case "repeatPassword": {
        setRepeatPass(value);
        break;
      }
      case "socialNr": {
        setSocialNr(value);
        break;
      }
      case "phoneNr": {
        setPhoneNr(value);
        break;
      }
      case "address": {
        setAddress(value);
        break;
      }
      case "position": {
        setPosition(value);
        break;
      }
    }
  };

  const handleSubmit = async () => {
    const data = {
      vardas: name,
      pavarde: surname,
      pastas: email,
      adresas: address,
      asmensKodas: socialNr,
      telefonoNr: phoneNr,
      pozicija: position,
      password,
      isAdmin,
    };
    if (props) {
      console.log(data);

      api
        .put(`/Auth/updateWorker/${props.id}`, data)
        .then(() => {
          alert("Darbuotojas redaguotas");
          history.push(paths.workers);
        })
        .catch((x) => alert(x.response));
    } else {
      api
        .post("/Auth/registerWorker", data)
        .then(() => {
          alert("Darbuotojas užregistruotas");
          //history.push(paths.workers);
        })
        .catch((x) => alert(x.response.data));
    }
  };
  const handleCheckBox = (checked: boolean) => {
    setIsAdmin(checked);
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
        {props && console.log(props.id)}
        <h2>{!props ? "Darbuotojo registracija" : "Darbuotojo redagavimas"}</h2>
        <form style={{ display: "grid" }} onSubmit={handleSubmit} noValidate>
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Vardas"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pavardė"
            name="surname"
            value={surname}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="El. Paštas"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Adresas"
            name="address"
            value={address}
            onChange={handleChange}
            required
          />
          {!props && (
            <TextField
              style={{ paddingBottom: "20px" }}
              color="primary"
              id="outlined-basic"
              label="Slaptažodis"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          )}
          {!props && (
            <TextField
              style={{ paddingBottom: "20px" }}
              color="primary"
              id="outlined-basic"
              label="Pakartokite slaptažodį"
              name="repeatPassword"
              value={repeatPass}
              onChange={handleChange}
              type="password"
              required
            />
          )}
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Asmens Kodas"
            name="socialNr"
            type="text"
            value={socialNr}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Telefono Nr."
            name="phoneNr"
            type="text"
            value={phoneNr}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pozicija"
            name="position"
            type="text"
            value={position}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            name="isAdmin"
            control={<Checkbox value={isAdmin} defaultChecked={isAdmin} />}
            label="Administratorius"
            onChange={(_, checked) => handleCheckBox(checked)}
          />
          <Button color="primary" variant="contained" type="submit">
            {!props ? "Registruoti" : "Redaguoti"}
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
};
export default AddWorkerPage;
