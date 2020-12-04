import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { api } from "global/variables";
import { paths } from "router/paths";
import { FormikForm, FormikTextField, FormWrapper } from "components";

const InventoryPage = (data: any) => {
  const props = data.location.state ? data.location.state.props : null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Privalomas laukas")
      .min(2, "Mažiausiai 2 simboliai"),
    amount: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai"),
    cabinet: Yup.string()
      .required("Privalomas laukas")
      .min(1, "Mažiausiai 1 simbolis"),
    free: Yup.string()
      .required("Privalomas laukas")
      .matches(/^[0-9]*$/, "Tik skaičiai"),
    from: Yup.string()
      .required("Privalomas laukas")
      .matches(
        /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
        "Neteisingas datos formatas, YYYY-MM-DD"
      ),
    to: Yup.string()
      .required("Privalomas laukas")
      .matches(
        /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
        "Neteisingas datos formatas, YYYY-MM-DD"
      ),
  });

  const history = useHistory();
  const handleSubmit = async (event: any) => {
    if (props) {
      const resp = await api
        .post("/Inventor/ChangeInventor", {
          id: props.id,
          name: event.name,
          amount: parseInt(event.amount),
          room: event.cabinet,
        })
        .then((resp) => {
          history.push(paths.inventory);
          alert("Redagavimas sėkmingas");
        })
        .catch((err) => alert("Serverio klaida"));
    } else {
      const resp = await api
        .post("/Inventor/AddInventor", {
          name: event.name,
          amount: parseInt(event.amount),
          room: event.cabinet,
          free: parseInt(event.free),
          goodFrom: event.from,
          goodUntil: event.to,
        })
        .then((resp) => {
          alert("Inventorius sukurtas sėkmingai");
          history.push(paths.inventory);
        })
        .catch((err) => alert("Serverio klaida"));
    }
  };

  const initialValues = {
    name: props ? props.name : "",
    amount: props ? props.quantity : "",
    cabinet: props ? props.cabinet : "",
    free: props ? props.free : "",
    from: props ? props.from : "",
    to: props ? props.to : "",
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
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <h2>
            {!props ? "Inventoriaus registacija" : "Inventoriaus redagavimas"}
          </h2>
          <FormikTextField formikKey="name" label="Pavadinimas" />
          <FormikTextField formikKey="amount" label="Kiekis" />
          <FormikTextField formikKey="cabinet" label="Kabineto nr." />
          <FormikTextField
            formikKey="free"
            label="Laisvu vnt."
            disabled={props ? true : false}
          />
          <FormikTextField
            formikKey="from"
            label="Galioja nuo"
            disabled={props ? true : false}
          />
          <FormikTextField
            formikKey="to"
            label="Galiojima iki"
            disabled={props ? true : false}
          />
          <Button color="primary" variant="contained" type="submit">
            {!props ? "Pridėti" : "Redaguoti"}
          </Button>
        </FormikForm>
      </Box>
    </FormWrapper>
  );
};
export default InventoryPage;
