import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

import { FormWrapper } from "components";
import { paths } from "router/paths";

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  return (
    <FormWrapper>
      <Box
        width="30%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Profilio redagavimas</h2>
        <form onSubmit={() => {}} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="El.Paštas"
            name="email"
            style={{ paddingBottom: "20px" }}
            defaultValue="El. Paštas"
          />
          <TextField
            id="outlined-basic"
            label="Adresas"
            name="email"
            style={{ paddingBottom: "20px" }}
            defaultValue="Adresas"
          />
          <TextField
            id="outlined-basic"
            label="Telefono Numeris"
            name="email"
            style={{ paddingBottom: "20px" }}
            defaultValue="Telefono numeris"
          />
          <Box display="flex" marginBottom="20px">
            <Button
              onClick={() => history.push(paths.resetPassword)}
              variant="outlined"
              color="primary"
            >
              Keisti slaptažodį
            </Button>
            <Box margin="auto">
              <label style={{ fontWeight: "bolder" }}>
                Įkelti nuotrauką
                <TextField id="test" type="file" />
              </label>
            </Box>
          </Box>
          <Button variant="contained" color="secondary">
            Patvirtinti
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
};

export default EditProfilePage;
