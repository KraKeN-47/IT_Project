import React from "react";
import { Box, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import jwt from "jwt-decode";
import * as Yup from "yup";

import { login } from "modules/userType/userData.slice";
import { api } from "global/variables";
import { paths } from "router/paths";
import { FormWrapper, FormikForm, FormikTextField } from "components";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Privalomas laukas")
      .email("Netinkamas pašto adresas"),
    password: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
  });

  const handleSubmit = async (event: any) => {
    const { email, password } = event;
    api
      .post("/Auth/login", { pastas: email, password })
      .then((resp) => {
        const user = resp.data;
        var token: any = jwt(user.token);
        const level = parseInt(token.level);
        localStorage.setItem("token", user.token);
        dispatch(
          login({
            id: parseInt(user.id),
            level,
            name: user.name,
          })
        );
        if (level <= 1) {
          history.push(paths.userServices);
          alert("Sėkmingai prisijungėte");
        } else {
          history.push(paths.services);
          alert("Sėkmingai prisijungėte");
        }
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
        <FormikForm
          handleSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "" }}
        >
          <FormikTextField
            variant="filled"
            label="El. paštas"
            formikKey="email"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <FormikTextField
            variant="filled"
            label="Slaptažodis"
            formikKey="password"
            name="password"
            style={{ paddingBottom: "20px" }}
            type="password"
          />
          <Button variant="contained" type="submit" color="primary">
            Prisijungti
          </Button>
        </FormikForm>
      </Box>
    </FormWrapper>
  );
};
export default Login;
