import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const UserPets = ({ pets }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell><b>Vardas</b></TableCell>
        <TableCell><b>Rusis</b></TableCell>
        <TableCell><b>Veisle</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {pets.map((pet) => (
        <TableRow key={pet.id}>
          <TableCell>{pet.vardas}</TableCell>
          <TableCell>{pet.rusis}</TableCell>
          <TableCell>{pet.veisle}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default UserPets;
