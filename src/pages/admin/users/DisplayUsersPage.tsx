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
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";
import { useSelector } from "react-redux";
import { selectUserId } from "modules/userType/userData.selector";
import { api } from "global/variables";

export default function DisplayUsersPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addWorker);
  };
  const [users, setUsers] = useState<any>([]);
  const id: any = useSelector(selectUserId());
  const getUsers = () => {
    api
      .get("/Client")
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
      .delete(`/User/${id}`)
      .then(() => {
        alert("Gyvunas istrintas");
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
                <TableCell align="center">Asmens kodas</TableCell>
                <TableCell align="center">Telefono nr.</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.vardas}</TableCell>
                  <TableCell align="center">Pavardė</TableCell>
                  <TableCell align="center">Adresas</TableCell>
                  <TableCell align="center">El. paštas</TableCell>
                  <TableCell align="center">Asmens kodas</TableCell>
                  <TableCell align="center">Telefono nr.</TableCell>
                  <TableCell align="center">
                    <NavLink
                      to={{
                        pathname: paths.editWorker,
                        state: {
                          props: {
                            name: "Vardas",
                            surname: "Pavardė",
                            email: "El. Paštas",
                            address: "Adresas",
                            phone: "Telefono nr",
                            socialNr: "Asmens kodas",
                            position: "Tevas",
                            isAdmin: true,
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
              ))}
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
