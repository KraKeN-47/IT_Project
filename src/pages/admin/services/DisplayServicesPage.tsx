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
import { api } from "global/variables";
import { selectUserTypeLevel } from "modules/userType/userData.selector";
import { useSelector } from "react-redux";

export default function DisplayServicesPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addService);
  };
  const userLevel = useSelector(selectUserTypeLevel());

  const [services, setServices] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await api
      .get(`/Service/Getservices`)
      .then((resp) => {
        console.log(resp.data);
        setServices(resp.data);
      })
      .catch((err) => alert("Serverio klaida."));
  };
  const handleDeleteService = async (id: number) => {
    const resp = await api
      .delete(`/Service/DeleteService/${id}`)
      .then((resp) => {
        alert("Paslauga pašalinta sėkmingai");
        fetchData();
      })
      .catch((err) => alert("Serverio klaida"));
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
                <TableCell align="center">Darbuotojas</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services &&
                services.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell align="center">{o.pavadinimas}</TableCell>
                    <TableCell align="center">{o.rizika}</TableCell>
                    <TableCell align="center">{o.kaina}</TableCell>
                    <TableCell align="center">{o.aprasymas}</TableCell>
                    <TableCell align="center">
                      {o.narkoze === true ? "taip" : "ne"}
                    </TableCell>
                    <TableCell align="center">{o.trukme}</TableCell>
                    <TableCell align="center">{o.darbutojoVarPav}</TableCell>
                    <TableCell align="center">
                      <NavLink
                        to={{
                          pathname: paths.editService,
                          state: {
                            props: {
                              id: o.id,
                              name: o.pavadinimas,
                              risk: o.rizika,
                              cost: o.kaina,
                              description: o.aprasymas,
                              anesthesia: o.narkoze,
                              time: o.trukme,
                              workerId: o.fkDarbuotojaiidDarbuotojai,
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
                    {userLevel === 3 && (
                      <TableCell align="center">
                        <Fab
                          size="small"
                          onClick={() => handleDeleteService(o.id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </TableCell>
                    )}{" "}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {userLevel === 3 && (
          <Box mt="20px">
            <Fab color="primary" onClick={handleRedirectAddWorker}>
              <AddIcon />
            </Fab>
          </Box>
        )}
      </Box>
    </FormWrapper>
  );
}
