import { Box } from "@material-ui/core";
import React from "react";

const FormWrapper: React.FC = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      {props.children}
    </Box>
  );
};
export default FormWrapper;
