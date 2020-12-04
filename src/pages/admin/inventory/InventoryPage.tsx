import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";

import { api } from "global/variables";
import { paths } from "router/paths";
import { FormWrapper } from "components";

const InventoryPage = (data: any) => {
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
        <h2>
          {!props ? "Inventoriaus registacija" : "Inventoriaus redagavimas"}
        </h2>
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
            label="Kiekis"
            name="quantity"
            defaultValue={props ? props.quantity : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Kabineto nr."
            name="cabinet"
            defaultValue={props ? props.cabinet : ""}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Laisvi vnt."
            name="free"
            defaultValue={props ? props.free : ""}
            disabled={props ? true : false}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Galioja nuo"
            name="from"
            defaultValue={props ? props.from : ""}
            disabled={props ? true : false}
            required
          />
          <TextField
            style={{ paddingBottom: "20px" }}
            color="primary"
            id="outlined-basic"
            label="Galioja iki"
            name="to"
            defaultValue={props ? props.to : ""}
            disabled={props ? true : false}
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
export default InventoryPage;
