import { Button } from "@material-ui/core";
import { FormikForm, FormikTextField, FormWrapper } from "components";
import { api } from "global/variables";
import { selectUserId } from "modules/userType/userData.selector";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { paths } from "router/paths";
import * as Yup from "yup";

const initialValues = {
  data: "",
  laikasNuo: "",
  laikasIki: "",
};

const validationSchema = Yup.object({
  data: Yup.string()
    .required("Privalomas laukas")
    .matches(
      /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
      "Neteisingas datos formatas, YYYY-MM-DD"
    ),
  laikasNuo: Yup.string()
    .required("Privalomas laukas")
    .matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/, "Laiko formatas HH:MM"),
  laikasIki: Yup.string()
    .required("Privalomas laukas")
    .matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/, "Laiko formatas HH:MM"),
});

const ReserveInventoryPage = (props: any) => {
  const id = props.location.state.props.id;
  const userId: any = useSelector(selectUserId());
  const history = useHistory();
  const handleSubmit = async (event: any) => {
    const resp = await api
      .post("/InventorReservation/AddReservation", {
        data: event.data,
        laikasNuo: event.laikasNuo,
        laikasIki: event.laikasIki,
        profilioID: parseInt(userId),
        inventoriusid: parseInt(id),
      })
      .then((resp) => {
        alert("Sekmingai užrezervuota");
        history.push(paths.inventory);
      })
      .catch((err) => alert("Serverio klaida"));
  };
  return (
    <FormWrapper>
      <FormikForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
      >
        <FormikTextField formikKey="data" label="Data" />
        <FormikTextField formikKey="laikasNuo" label="Laikas nuo" />
        <FormikTextField formikKey="laikasIki" label="Laikas iki" />
        <Button variant="contained" type="submit" color="primary">
          Patvirtinti
        </Button>
      </FormikForm>
    </FormWrapper>
  );
};

export default ReserveInventoryPage;
