import {
  Box,
  Fab,
  IconButton,
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
import { api } from "global/variables";

export default function DisplayWorkersPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addWorker);
  };
  const [workers, setWorkers] = useState<any>([]);
  const getWorkers = () => {
    api
      .get("/Client/workers")
      .then((resp: any) => {
        const data: any = resp.data;
        setWorkers(data);
      })
      .catch((x) => alert(x.response.data));
  };
  useEffect(() => {
    getWorkers();
  }, []);

  const removeWorker = (id: any) => {
    api
      .delete(`/Auth/deleteWorker/${id}`)
      .then(() => {
        alert("Darbuotojas istrintas");
        getWorkers();
      })
      .catch((x) => alert(x.response.data));
  };
  return (
    <FormWrapper>
      <Box
        width="60%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Darbuotojų lentelė</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Vardas</TableCell>
                <TableCell align="center">Pavardė</TableCell>
                <TableCell align="center">Adresas</TableCell>
                <TableCell align="center">Asmens kodas</TableCell>
                <TableCell align="center">El. paštas</TableCell>
                <TableCell align="center">Telefono nr.</TableCell>
                <TableCell align="center">Pozicija</TableCell>
                <TableCell align="center">Administratorius</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell align="center">{worker.vardas}</TableCell>
                  <TableCell align="center">{worker.pavarde}</TableCell>
                  <TableCell align="center">{worker.adresas}</TableCell>
                  <TableCell align="center">{worker.asmensKodas}</TableCell>
                  <TableCell align="center">{worker.pastas}</TableCell>
                  <TableCell align="center">{worker.telefonoNr}</TableCell>
                  <TableCell align="center">{worker.pozicija}</TableCell>
                  <TableCell align="center">
                    {worker.isAdmin ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <NavLink
                      to={{
                        pathname: paths.editWorker,
                        state: {
                          props: {
                            id: worker.id,
                            name: worker.vardas,
                            surname: worker.pavarde,
                            email: worker.pastas,
                            address: worker.adresas,
                            socialNr: worker.asmensKodas,
                            phoneNr: worker.telefonoNr,
                            position: worker.pozicija,
                            isAdmin: worker.isAdmin,
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
                    <IconButton onClick={() => removeWorker(worker.id)}>
                      <DeleteIcon />
                    </IconButton>
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
