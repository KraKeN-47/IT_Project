import { Box, Button, MenuItem, Select, TextField } from "@material-ui/core";
import { FormWrapper } from "components";
import React from "react";

export default function CreatePetPage() {
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
        <form onSubmit={() => {}} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="Vardas"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            id="outlined-basic"
            label="Rūšis"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            id="outlined-basic"
            label="Veislė"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <Select value="" id="Lytis" displayEmpty>
            <MenuItem value="" disabled>
              Lytis
            </MenuItem>
            <MenuItem>Vyras</MenuItem>
            <MenuItem>Moteris</MenuItem>
          </Select>
          <TextField
            id="outlined-basic"
            label="Amžius"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            id="outlined-basic"
            label="Svoris"
            name="email"
            style={{ paddingBottom: "20px" }}
          />
          <Button variant="contained" color="primary">
            Pridėti
          </Button>
        </form>
      </Box>
    </FormWrapper>
  );
}
