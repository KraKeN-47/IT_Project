import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import { FormWrapper } from "components";
import { api } from "global/variables";
import UserPets from "./UserPets";

export default function DisplayUsersPage() {
  const [users, setUsers] = useState<any>([]);
  const getUsers = () => {
    api
      .get("/Client/clients")
      .then((resp: any) => {
        const data: any = resp.data;
        setUsers(data);
      })
      .catch((x) => alert(x.response.data));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const removeUser = (id: any) => {
    api
      .delete(`/Auth/deleteUser/${id}`)
      .then(() => {
        alert("Klientas istrintas");
        getUsers();
      })
      .catch((x) => alert(x.response.data));
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
        <h2>Klientų lentelė</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Vardas</TableCell>
                <TableCell align="center">Pavardė</TableCell>
                <TableCell align="center">Adresas</TableCell>
                <TableCell align="center">El. paštas</TableCell>
                <TableCell align="center">Telefono nr.</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <Tooltip key={user.id} placement="left" arrow title={<UserPets pets={user.pets} />}>
                  <TableRow>
                    <TableCell align="center">{user.vardas}</TableCell>
                    <TableCell align="center">{user.pavarde}</TableCell>
                    <TableCell align="center">{user.adresas}</TableCell>
                    <TableCell align="center">{user.pastas}</TableCell>
                    <TableCell align="center">{user.telefonoNr}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => removeUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FormWrapper>
  );
}
