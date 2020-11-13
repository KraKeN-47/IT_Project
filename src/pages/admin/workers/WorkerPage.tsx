import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

import { api } from "global/variables";
import { paths } from "router/paths";
import { setUserType } from "modules/userType/userData.slice";
import { FormWrapper } from "components";

const AddWorkerPage = (data: any) => {
  const props = data.location.state ? data.location.state.props : null;
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
    // await api
    //   .post("/Users", {
    //     name,
    //     email,
    //     password,
    //   })
    //   .then((resp: any) => {
    //     const data: any = jwt(resp.data.authToken);
    //     alert("Vartotojas užregistruotas");
    //     localStorage.setItem("token", resp.data.authToken);
    //     dispatch(
    //       setUserType({
    //         level: data.level,
    //         name: data.name,
    //         id: data.id,
    //       })
    //     );
    //     history.push(paths.availableTimes);
    //   })
    //   .catch((x) => alert(x.response.data));
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
        <h2>{!props ? "Darbuotojo registracija" : "Darbuotojo redagavimas"}</h2>
        <form style={{ display: "grid" }} onSubmit={handleSubmit}>
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Vardas"
            name="name"
            defaultValue={props ? props.name : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pavardė"
            name="surname"
            defaultValue={props ? props.surname : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="El. Paštas"
            name="email"
            defaultValue={props ? props.email : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Adresas"
            name="address"
            defaultValue={props ? props.address : ""}
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
              defaultValue={props ? props.name : ""}
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
            defaultValue={props ? props.socialNr : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Telefono Nr."
            name="phoneNr"
            type="text"
            defaultValue={props ? props.phone : ""}
            required
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
