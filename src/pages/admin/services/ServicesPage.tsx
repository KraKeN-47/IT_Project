import { Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { api } from "global/variables";
import { paths } from "router/paths";
import { FormikForm, FormikTextField, FormWrapper } from "components";

const ServicesPage = (data: any) => {
  const props = data.location.state ? data.location.state.props : null;
  const history = useHistory();
  const [anesthesia, setAnesthesia] = useState(
    props ? props.anesthesia : false
  );
  const handleCheckBox = (checked: boolean) => {
    setAnesthesia(checked);
  };
  const handleSubmit = async (event: any) => {
    const resp = await api
      .post("/Service/Updateservice", {
        id: props.id,
        pavadinimas: event.name,
        rizika: parseInt(event.risk),
        kaina: parseInt(event.cost),
        aprasymas: event.description,
        narkoze: anesthesia,
        trukme: event.time,
      })
      .then((resp) => {
        alert("Redagavimas sėkmingas");
        history.push(paths.services);
      })
      .catch((err) => alert("Serverio klaida."));
  };
  const initialValues = {
    name: props ? props.name : "",
    description: props ? props.description : "",
    risk: props ? props.risk : "",
    cost: props ? props.cost : "",
    time: props ? props.time : "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    description: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    risk: Yup.string()
      .required("Privalomas laukas")
      .matches(/^([1-9]|10)$/, "Tik skaičiai 1-10"),
    cost: Yup.string().required("Privalomas laukas"),
    time: Yup.string()
      .required("Privalomas laukas")
      .min(1, "Mažiausiai 1 simbolis"),
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
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
        >
          <h2>{!props ? "Paslaugų registacija" : "Paslaugų redagavimas"}</h2>
          <FormikTextField
            formikKey="name"
            label="Pavadinimas"
            variant="filled"
          />
          <FormikTextField formikKey="risk" label="Rizika" variant="filled" />
          <FormikTextField formikKey="cost" label="Kaina" variant="filled" />
          <FormikTextField
            formikKey="description"
            label="Aprašymas"
            variant="filled"
          />
          <FormControlLabel
            name="anesthesia"
            control={
              <Checkbox defaultChecked={props ? props.anesthesia : false} />
            }
            label="Narkozė"
            onChange={(_, checked) => handleCheckBox(checked)}
          />

          <FormikTextField formikKey="time" label="Trukmė" variant="filled" />
          <Button color="primary" variant="contained" type="submit">
            {!props ? "Registruoti" : "Redaguoti"}
          </Button>
        </FormikForm>
      </Box>
    </FormWrapper>
  );
};
export default ServicesPage;
