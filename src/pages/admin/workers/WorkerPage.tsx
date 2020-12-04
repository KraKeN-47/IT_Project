import { Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { api } from "global/variables";
import { paths } from "router/paths";
import { FormikForm, FormikTextField, FormWrapper } from "components";

const AddWorkerPage = (data: any) => {
  const props = data.location.state ? data.location.state.props : null;
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);

  const initialValues = {
    name: props ? props.name : "",
    surname: props ? props.surname : "",
    email: props ? props.email : "",
    address: props ? props.address : "",
    password: props ? props.password : "",
    repeatPassword: props ? props.repeatPassword : "",
    socialNr: props ? props.socialNr : "",
    phoneNr: props ? props.phoneNr : "",
    position: props ? props.position : "",
  };
  const handleSubmit = async (e: any) => {
    console.log(e);
    if (props) {
      await api
        .put(`/Auth/updateWorker/${props.id}`, {
          vardas: e.name,
          pavarde: e.surname,
          adresas: e.address,
          password: "",
          asmensKodas: e.socialNr,
          userName: "",
          pastas: e.email,
          telefonoNr: e.phoneNr,
          pozicija: e.position,
          isAdmin: isAdmin,
        })
        .then(() => {
          alert("Darbuotojas redaguotas.");
          history.push(paths.workers);
        })
        .catch(() => alert("Serverio klaida"));
    } else {
      await api
        .post("/Auth/registerWorker", {
          vardas: e.name,
          pavarde: e.surname,
          adresas: e.address,
          password: e.password,
          asmensKodas: e.socialNr,
          userName: "",
          pastas: e.email,
          telefonoNr: e.phoneNr,
          pozicija: e.position,
          isAdmin: isAdmin,
        })
        .then(() => {
          alert("Darbuotojas sukurtas.");
          history.push(paths.workers);
        })
        .catch(() => alert("Serverio klaida"));
    }
  };
  const handleCheckBox = (checked: boolean) => {
    setIsAdmin(checked);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    surname: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    email: Yup.string()
      .required("Privalomas laukas")
      .email("Neteisingai įvestas el. paštas"),
    address: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    password: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    repeatPassword: Yup.string()
      .required("Privalomas laukas")
      .oneOf([Yup.ref("password"), ""], "Slaptažodžiai nesutampa"),
    socialNr: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai")
      .length(11, "Asmens kodas turi 11 simbolių"),
    phoneNr: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai"),
    position: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
  });
  const validationSchema1 = Yup.object({
    name: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    surname: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    email: Yup.string()
      .required("Privalomas laukas")
      .email("Neteisingai įvestas el. paštas"),
    address: Yup.string()
      .required("Privalomas laukas")
      .min(5, "Mažiausiai 5 simboliai"),
    socialNr: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai")
      .length(11, "Asmens kodas turi 11 simbolių"),
    phoneNr: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai"),
    position: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
  });
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
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={props ? validationSchema1 : validationSchema}
        >
          <h2>
            {!props ? "Darbuotojo registracija" : "Darbuotojo redagavimas"}
          </h2>
          <FormikTextField formikKey="name" variant="filled" label="Vardas" />
          <FormikTextField
            formikKey="surname"
            variant="filled"
            label="Pavardė"
          />
          <FormikTextField
            formikKey="email"
            variant="filled"
            label="El. paštas"
          />
          <FormikTextField
            formikKey="address"
            variant="filled"
            label="Adresas"
          />
          {!props && (
            <FormikTextField
              formikKey="password"
              variant="filled"
              label="Slaptažodis"
              type="password"
            />
          )}
          {!props && (
            <FormikTextField
              formikKey="repeatPassword"
              variant="filled"
              label="Pakartokite slaptažodį"
              type="password"
            />
          )}
          <FormikTextField
            formikKey="socialNr"
            variant="filled"
            label="Asmens kodas"
            inputProps={{
              maxLength: 11,
            }}
          />
          <FormikTextField
            formikKey="phoneNr"
            variant="filled"
            label="Telefono nr."
          />
          <FormikTextField
            formikKey="position"
            variant="filled"
            label="Pareigos"
          />
          <FormControlLabel
            name="isAdmin"
            control={
              <Checkbox defaultChecked={props ? props.isAdmin : false} />
            }
            label="Administratorius"
            onChange={(_, checked) => handleCheckBox(checked)}
          />
          <Button color="primary" variant="contained" type="submit">
            {!props ? "Registruoti" : "Redaguoti"}
          </Button>
        </FormikForm>
        {/* <form style={{ display: "grid" }} onSubmit={handleSubmit}>
          <FormControlLabel
            name="isAdmin"
            control={<Checkbox />}
            defaultChecked={props ? props.isAdmin : false}
            label="Administratorius"
            onChange={(_, checked) => handleCheckBox(checked)}
          />
        </form> */}
      </Box>
    </FormWrapper>
  );
};
export default AddWorkerPage;
