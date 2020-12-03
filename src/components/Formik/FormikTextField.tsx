import React from "react";
import { useField } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";

type FormikTextFieldProps = {
  formikKey: string;
} & TextFieldProps;

const FormikTextField = ({ formikKey, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(formikKey);
  return (
    <TextField
      style={{ marginBottom: "20px" }}
      id={field.name}
      name={field.name}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ""}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...props}
    />
  );
};

export default FormikTextField;
