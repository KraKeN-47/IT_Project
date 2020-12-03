import { Box, Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import * as Yup from "yup";

import { api } from "global/variables";
import { paths } from "router/paths";
import { login } from "modules/userType/userData.slice";
import { FormWrapper, FormikForm, FormikTextField } from "components";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    vardas: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    pavarde: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    pastas: Yup.string()
      .required("Privalomas laukas")
      .email("Neteisingai įvestas el. paštas"),
    adresas: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    password: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    repeatPassword: Yup.string()
      .required("Privalomas laukas")
      .oneOf([Yup.ref("password"), ""], "Slaptažodžiai nesutampa"),
    asmensKodas: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai")
      .length(11, "Asmens kodas turi 11 simbolių"),
    telefononr: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai"),
  });

  const initialValues = {
    userName: "",
    vardas: "",
    pavarde: "",
    pastas: "",
    adresas: "",
    password: "",
    repeatPassword: "",
    asmensKodas: "",
    telefononr: "",
  };

  const handleSubmit = (event: any) => {
    const {
      userName,
      vardas,
      pavarde,
      pastas,
      adresas,
      password,
      asmensKodas,
      telefononr,
    } = event;
    console.log(event);
    api
      .post("/Auth/registerUser", {
        userName,
        vardas,
        pavarde,
        pastas,
        adresas,
        password,
        asmensKodas,
        telefononr,
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
        <FormikForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <FormikTextField
            formikKey="userName"
            variant="filled"
            label="Slapyvardis"
          />
          <FormikTextField formikKey="vardas" variant="filled" label="Vardas" />
          <FormikTextField
            formikKey="pavarde"
            variant="filled"
            label="Pavarde"
          />
          <FormikTextField
            formikKey="pastas"
            variant="filled"
            label="El. paštas"
          />
          <FormikTextField
            formikKey="adresas"
            variant="filled"
            label="Adresas"
          />
          <FormikTextField
            formikKey="password"
            type="password"
            variant="filled"
            label="Slaptažodis"
          />
          <FormikTextField
            formikKey="repeatPassword"
            type="password"
            variant="filled"
            label="Pakartokite slaptažodį"
          />
          <FormikTextField
            formikKey="asmensKodas"
            variant="filled"
            inputProps={{ maxLength: 11 }}
            label="Asmens kodas"
          />
          <FormikTextField
            formikKey="telefononr"
            variant="filled"
            label="Telefono numeris"
          />
          <Button color="primary" variant="contained" type="submit">
            Registruotis
          </Button>
        </FormikForm>
      </Box>
    </FormWrapper>
  );
};
export default RegisterPage;
