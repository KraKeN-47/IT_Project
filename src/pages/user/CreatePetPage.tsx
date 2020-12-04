import { Box, Button} from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import { api } from "global/variables";
import { FormWrapper, FormikForm, FormikTextField } from "components";
import { useHistory } from "react-router-dom";
import { FormikSelectField } from 'formik-material-fields';
import { useSelector } from "react-redux";
import { selectUserId } from "modules/userType/userData.selector";
import { paths } from "router/paths";

export default function CreatePetPage() {
  const history = useHistory();
  const validationSchema = Yup.object({
    vardas: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    rusis: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    veisle: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    lytis: Yup.number()
      .required("Privalomas laukas")
      .min(0, "Teigiami skaičiai"),
    amzius: Yup.number()
      .required("Privalomas laukas")
      .min(0, "Teigiami skaičiai"),
    svoris: Yup.number()
      .required("Privalomas laukas")
      .min(0, "Teigiami skaičiai"),
  });

  const initialValues = {
    vardas: "",
    rusis: "",
    veisle: "",
    lytis: "",
    amzius: "",
    svoris: "",
  };

  const FkKlientaiidKlientai:any = useSelector(selectUserId());
  const handleSubmit = (event: any) => {
    const { vardas, rusis, veisle, lytis, amzius, svoris } = event;
    api
      .post("/Pet", {
        vardas,
        rusis,
        veisle,
        lytis,
        amzius,
        svoris,
        FkKlientaiidKlientai
      })
      .then((resp: any) => {
        alert("Augintinis užregistruotas");
        history.push(paths.myPets);
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
        <h2>Augintinio pridėjimas</h2>
        <FormikForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <FormikTextField formikKey="vardas" variant="filled" label="Vardas" />
          <FormikTextField formikKey="rusis" variant="filled" label="Rūšis" />
          <FormikTextField formikKey="veisle" variant="filled" label="Veislė" />
          <FormikSelectField
            name="lytis"
            label="Lytis"
            margin="normal"
            options={[
              {label: 'Patinas', value: 1},
              {label: 'Patelė', value: 2}
            ]}
          />
          <FormikTextField formikKey="amzius" variant="filled" label="Amžius" />
          <FormikTextField formikKey="svoris" variant="filled" label="Svoris" />
          <Button variant="contained" color="primary" type="submit">
            Pridėti
          </Button>
        </FormikForm>
      </Box>
    </FormWrapper>
  );
}
