import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FormWrapper } from "components";
import { paths } from "router/paths";
import {
  selectUserId,
  selectUserTypeLevel,
} from "modules/userType/userData.selector";
import { api } from "global/variables";

export default function ReserveServicesPage() {
  const location = useLocation();
  const userLevel = useSelector(selectUserTypeLevel());
  const userId: any = useSelector(selectUserId());
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const history = useHistory();
  const [services, setServices] = useState<any>([]);
  const [myServices, setMyServices] = useState<any>([]);
  useEffect(() => {
    location.pathname === paths.myServices
      ? setIsButtonVisible(false)
      : setIsButtonVisible(true);
    fetchServices();
    fetchMyReservations();
  }, [location]);

  const fetchServices = async () => {
    const resp = await api
      .get("/Service/GetServices")
      .then((resp) => setServices(resp.data))
      .catch((err) => alert("Serverio klaida"));
  };

  const fetchMyReservations = async () => {
    const resp = await api
      .get(`/ServiceReg/getRegServices/${userId}`)
      .then((resp) => setMyServices(resp.data));
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
        <h2>
          {isButtonVisible ? "Paslaugų lentelė" : "Užsakytų paslaugų istorija"}
        </h2>
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
                      {isButtonVisible && userLevel > 0 && (
                        <NavLink
                          to={{
                            pathname: paths.reserveService,
                            state: {
                              props: {
                                id: o.id,
                                darbuotojoId: o.fkDarbuotojaiidDarbuotojai,
                              },
                            },
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="contained" color="primary">
                            Pirkti paslaugą
                          </Button>
                        </NavLink>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h2 style={{ marginTop: "50px" }}>Užsakytos paslaugos</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Laikas nuo</TableCell>
                <TableCell align="center">Laikas iki</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myServices &&
                myServices.map((service) => (
                  <TableRow>
                    <TableCell align="center">{service.data}</TableCell>
                    <TableCell align="center">{service.laikasNuo}</TableCell>
                    <TableCell align="center">{service.laikasIki}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FormWrapper>
  );
}
