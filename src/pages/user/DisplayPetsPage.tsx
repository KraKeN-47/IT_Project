import {
  Box,
  Fab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";
import { useSelector } from "react-redux";
import { selectUserId } from "modules/userType/userData.selector";
import { api } from "global/variables";

export default function DisplayPetsPage() {
  const history = useHistory();
  const handleRedirectAddPet = () => {
    history.push(paths.addPet);
  };
  const [pets, setPets] = useState<any>([]);
  const id: any = useSelector(selectUserId());
  const getPets = () => {
    api
      .get(`/Pet/${id}`)
      .then((resp: any) => {
        const data: any = resp.data;
        setPets(data);
      })
      .catch((x) => alert(x.response.data));
  };
  useEffect(() => {
    getPets();
  }, []);

  const removePet = (id: any) => {
    api
      .delete(`/Pet/${id}`)
      .then(() => {
        alert("Gyvunas istrintas");
        getPets();
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
        <h2>Mano augintiniai</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vardas</TableCell>
                <TableCell align="right">Rūšis</TableCell>
                <TableCell align="right">Veislė</TableCell>
                <TableCell align="right">Lytis</TableCell>
                <TableCell align="right">Amžius</TableCell>
                <TableCell align="right">Svoris</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet.id}>
                  {console.log(pet)}
                  <TableCell>{pet.vardas}</TableCell>
                  <TableCell align="right">{pet.rusis}</TableCell>
                  <TableCell align="right">{pet.veisle}</TableCell>
                  <TableCell align="right">
                    {pet.lytis === 1 ? "Patinas" : "Patelė"}
                  </TableCell>
                  <TableCell align="right">{pet.amzius}</TableCell>
                  <TableCell align="right">{pet.svoris}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removePet(pet.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
