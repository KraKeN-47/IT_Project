import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { api } from "global/variables";

export default function AllReportsPage() {
  const [positions, setPositions] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await api
      .post(`/Reports/getPositionsReport`)
      .then((resp) => {
        setPositions(resp.data);
      })
      .catch((err) => alert("Serverio klaida."));
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
        <h2>Esamų darbuotojų pozicijų kiekis</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Pozicija</TableCell>
                <TableCell align="center">Kiekis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions &&
                positions.map((o: any) => (
                  <TableRow key={o.positionName}>
                    <TableCell align="center">{o.positionName}</TableCell>
                    <TableCell align="center">{o.amount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FormWrapper>
  );
}
