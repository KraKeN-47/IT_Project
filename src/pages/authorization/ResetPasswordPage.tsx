import { Box, Button, TextField } from "@material-ui/core";
import React from "react";

import { FormWrapper } from "components";

const ResetPasswordPage: React.FC = () => {
  return (
    <FormWrapper>
      <Box
        width="30%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <form onSubmit={() => {}} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="El paštas"
            name="email"
            //   onChange={(event) => setEmail(event.target.value)}
            style={{ paddingBottom: "20px" }}
          />
          <Button variant="contained" type="submit" color="primary">
            Patvirtinti
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
};

export default ResetPasswordPage;
