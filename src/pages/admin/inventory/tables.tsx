import React, { useEffect, useState } from "react";
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
import { api } from "global/variables";
import { selectUserId } from "modules/userType/userData.selector";
import { useSelector } from "react-redux";

export const ReservationsTable = () => {
  const userId: any = useSelector(selectUserId());
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await api.get(
      `/InventorReservation/getAllInventorReservations/${userId}`
    );
  };
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
  const [inventory, setInventory] = useState<any>();

  useEffect(() => {
    fetchInventory();
    console.log("Refreshed my reservations");
  }, []);

  const fetchInventory = async () => {
    const resp = await api.get("/Inventor/getAllInventor");
    setInventory(resp.data);
  };

  const handleDeleteInventory = async (id: number) => {
    const resp = await api
      .delete(`/Inventor/DeleteInventor/${id}`)
      .then((resp) => {
        alert("Pasirinktas inventorius pašalintas sėkmingai");
        window.location.reload();
      })
      .catch((err) => alert("Serverio klaida"));
  };

  return (
    <>
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
            {inventory &&
              inventory.map((e: any) => (
                <TableRow key={e.id}>
                  <TableCell align="center">{e.name}</TableCell>
                  <TableCell align="center">{e.amount}</TableCell>
                  <TableCell align="center">{e.room}</TableCell>
                  <TableCell align="center">{e.free}</TableCell>
                  <TableCell align="center">{e.goodFrom}</TableCell>
                  <TableCell align="center">{e.goodUntil}</TableCell>
                  <TableCell align="center">
                    <NavLink
                      to={{
                        pathname: paths.editInventory,
                        state: {
                          props: {
                            id: e.id,
                            name: e.name,
                            quantity: e.amount,
                            cabinet: e.room,
                            free: e.free,
                            from: e.goodFrom,
                            to: e.goodUntil,
                          },
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
                    <Fab
                      size="small"
                      onClick={() => handleDeleteInventory(e.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <NavLink
                      to={{
                        pathname: paths.reserveInventory,
                        state: {
                          props: {
                            id: e.id,
                          },
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary" size="small">
                        Rezervuoti
                      </Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
