import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const UserPets = ({ pets }) =>
  pets.length !== 0 ? (
    <>
      <h2 style={{ textAlign: "center" }}>Kliento gyvūnai</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>
              <b>Vardas</b>
            </TableCell>
            <TableCell style={{ color: "white" }}>
              <b>Rusis</b>
            </TableCell>
            <TableCell style={{ color: "white" }}>
              <b>Veisle</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell style={{ color: "white" }}>{pet.vardas}</TableCell>
              <TableCell style={{ color: "white" }}>{pet.rusis}</TableCell>
              <TableCell style={{ color: "white" }}>{pet.veisle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : (
    <h3>Neužregistruoti jokie gyvūnai</h3>
  );

export default UserPets;
