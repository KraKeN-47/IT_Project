import React from "react";
import {
  Box,
  TableContainer,
  TableHead,
  TableCell,
  Fab,
  Button,
} from "@material-ui/core";
import { Paper, Table, TableRow, TableBody } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { paths } from "router/paths";

export const ReservationsTable = () => {
  return (
    <Box
      style={{ background: "tan" }}
      borderRadius="20px"
      padding="20px"
      textAlign="center"
    >
      <h2>Mano rezervacijos</h2>
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
                <Fab size="small">
                  <RemoveIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const InventoryTable = () => {
  return (
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
            <TableCell align="center" size="small">
              <Button variant="contained" color="primary" size="small">
                Rezervuoti
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
