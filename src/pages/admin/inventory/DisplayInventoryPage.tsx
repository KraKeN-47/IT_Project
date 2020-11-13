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

export default function DisplayInventoryPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addInventory);
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
        <h2>Inventoriaus lentelė</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Pavadinimas</TableCell>
                <TableCell align="center">Kiekis</TableCell>
                <TableCell align="center">Kabineto nr.</TableCell>
                <TableCell align="center">Laisvi vnt.</TableCell>
                <TableCell align="center">Galioja nuo</TableCell>
                <TableCell align="center">Galioja iki</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Pavadinimas</TableCell>
                <TableCell align="center">Kiekis</TableCell>
                <TableCell align="center">Kabineto nr.</TableCell>
                <TableCell align="center">Laisvi vnt.</TableCell>
                <TableCell align="center">Galioja nuo</TableCell>
                <TableCell align="center">Galioja iki</TableCell>
                <TableCell align="center">
                  <NavLink
                    to={{
                      pathname: paths.editInventory,
                      state: {
                        props: {
                          name: "Pavadinimas",
                          quantity: "Kiekis",
                          cabinet: "Kabineto nr.",
                          free: "Laisvi vnt",
                          from: "Galioja nuo",
                          to: "Galioja iki",
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
