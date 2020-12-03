import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Box } from "@material-ui/core";
import { FormWrapper } from "components";

interface FormProps {
  initialValues: {};
  validationSchema: {};
  handleSubmit: ((
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>) &
    ((e?: React.FormEvent<HTMLFormElement> | undefined) => void);
}

const FormikForm: React.FC<FormProps> = (props) => {
  const { initialValues, validationSchema, handleSubmit } = props;

  return (
    <FormWrapper>
      <Box
        width="30%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <>
              <form
                style={{ display: "grid" }}
                onSubmit={formikProps.handleSubmit}
              >
                {props.children}
              </form>
            </>
          )}
        </Formik>
      </Box>
    </FormWrapper>
  );
};

export default FormikForm;
