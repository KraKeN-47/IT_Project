import { Box, Button, Fab, TextField } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import { paths } from "router/paths";
import { FormWrapper } from "components";

export default function EditProfilePage() {
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
            <Box margin="auto" display="grid">
              <label style={{ fontWeight: "bolder", marginBottom: "10px" }}>
                Įkelti nuotrauką
              </label>
              <input type="file" />
              <Box mt="20px">
                <Button color="secondary" variant="outlined">
                  Pašalinti profilio nuotrauką
                </Button>
              </Box>
            </Box>
          </Box>
          <Button variant="contained" color="secondary">
            Patvirtinti
          </Button>
        </form>
        <h4 style={{ paddingTop: "20px" }}>Šalinti paskyrą</h4>
        <Fab>
          <DeleteIcon />
        </Fab>
      </Box>
    </FormWrapper>
  );
}
