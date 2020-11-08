import {
  Box,
  Fab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";

export default function DisplayPetsPage() {
  const history = useHistory();
  const handleRedirectAddPet = () => {
    history.push(paths.addPet);
  };
  return (
    <FormWrapper>
      <Box
        width="50%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Mano augintiniai</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vardas</TableCell>
                <TableCell align="right">Rūšis</TableCell>
                <TableCell align="right">Veislė</TableCell>
                <TableCell align="right">Lytis</TableCell>
                <TableCell align="right">Amžius</TableCell>
                <TableCell align="right">Svoris</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Box mt="20px">
          <Fab color="primary" onClick={handleRedirectAddPet}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </FormWrapper>
  );
}
