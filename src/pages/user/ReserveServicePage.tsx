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
import { NavLink, useLocation } from "react-router-dom";

import { FormWrapper } from "components";
import { paths } from "router/paths";

export default function ReserveServicesPage() {
  const location = useLocation();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  useEffect(() => {
    location.pathname === paths.myServices
      ? setIsButtonVisible(false)
      : setIsButtonVisible(true);
  }, [location]);
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
                      pathname: paths.myServices,
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
                    {isButtonVisible && (
                      <Button variant="contained" color="primary">
                        Pirkti paslaugą
                      </Button>
                    )}
                  </NavLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FormWrapper>
  );
}
