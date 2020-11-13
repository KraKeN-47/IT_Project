import {
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";

export default function DisplayServicesPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addService);
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
        <h2>Paslaugų lentelė</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Pavadinimas</TableCell>
                <TableCell align="center">Rizika</TableCell>
                <TableCell align="center">Kaina</TableCell>
                <TableCell align="center">Aprašymas</TableCell>
                <TableCell align="center">Narkozė</TableCell>
                <TableCell align="center">Trukmė</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Pavadinimas</TableCell>
                <TableCell align="center">Rizika</TableCell>
                <TableCell align="center">Kaina</TableCell>
                <TableCell align="center">Aprašymas</TableCell>
                <TableCell align="center">Narkozė</TableCell>
                <TableCell align="center">Trukmė</TableCell>
                <TableCell align="center">
                  <NavLink
                    to={{
                      pathname: paths.editService,
                      state: {
                        props: {
                          name: "Pavadinimas",
                          risk: "Rizika",
                          cost: "Kaina",
                          description: "Aprašymas",
                          anesthesia: "Narkozė",
                          time: "Trukmė",
                        },
                        loading: true,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Fab size="small">
                      <EditIcon />
                    </Fab>
                  </NavLink>
                </TableCell>
                <TableCell align="center">
                  <Fab size="small">
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            </TableBody>
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
