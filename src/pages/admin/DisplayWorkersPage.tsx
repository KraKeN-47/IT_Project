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

export default function DisplayWorkersPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addWorker);
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
        <h2>Darbuotojų lentelė</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vardas</TableCell>
                <TableCell>Pavardė</TableCell>
                <TableCell>Adresas</TableCell>
                <TableCell>El. paštas</TableCell>
                <TableCell>Asmens kodas</TableCell>
                <TableCell>Telefono nr.</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Box mt="20px">
          <Fab color="primary" onClick={handleRedirectAddWorker}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </FormWrapper>
  );
}
