import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

import { api } from "global/variables";
import { paths } from "router/paths";
import { setUserType } from "modules/userType/userData.slice";
import { FormWrapper } from "components";

const ServicesPage = (data: any) => {
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
        <h2>{!props ? "Paslaugų registacija" : "Paslaugų redagavimas"}</h2>
        <form style={{ display: "grid" }} onSubmit={handleSubmit}>
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Pavadinimas"
            name="name"
            defaultValue={props ? props.name : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Rizika"
            name="risk"
            defaultValue={props ? props.risk : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Kaina"
            name="cost"
            defaultValue={props ? props.cost : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Aprašymas"
            name="description"
            defaultValue={props ? props.description : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Narkozė"
            name="anesthesia"
            defaultValue={props ? props.anesthesia : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Trukmė"
            name="time"
            defaultValue={props ? props.time : ""}
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
export default ServicesPage;
