import {
  Box,
  Fab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import jwt from "jwt-decode";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";
import { api } from "global/variables";
import { IUserData } from "types/types";

export default function DisplayPetsPage() {
  const history = useHistory();
  const handleRedirectAddPet = () => {
    history.push(paths.addPet);
  };
  const [myPets, setMyPets] = useState<any>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const tokenData: IUserData = jwt(token);
      const resp = await api.get(`/Auth/getMyPets/${tokenData.id}`);
      console.log(resp.data.myPets);
      setMyPets(resp.data.myPets);
    }
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
        <h2>Mano augintiniai</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vardas</TableCell>
                <TableCell>Rūšis</TableCell>
                <TableCell>Veislė</TableCell>
                <TableCell>Lytis</TableCell>
                <TableCell>Amžius</TableCell>
                <TableCell>Svoris</TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              {myPets &&
                myPets.map((o: any) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.vardas}</TableCell>
                    <TableCell>{o.rusis}</TableCell>
                    <TableCell>{o.veisle}</TableCell>
                    <TableCell>{o.lytis}</TableCell>
                    <TableCell>{o.amzius}</TableCell>
                    <TableCell>{o.svoris}</TableCell>
                  </TableRow>
                ))}
            </TableHead>
          </Table>
        </TableContainer>
        <Box mt="20px">
          <Fab color="primary" onClick={handleRedirectAddPet}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </FormWrapper>
  );
}
