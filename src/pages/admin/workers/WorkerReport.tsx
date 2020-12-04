import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const WorkerReport = ({ worker }: any) =>
  worker ? (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell style={{ color: "white" }}>
            <b>Rezervacijų kiekis</b>
          </TableCell>
          <TableCell style={{ color: "white" }}>
            <b>Priimtų klientų kiekis</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={worker.id}>
          <TableCell style={{ color: "white" }}>
            {worker.report.amountOfRezervations}
          </TableCell>
          <TableCell style={{ color: "white" }}>
            {worker.report.amountOfClients}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <h3>Nėra ataskaitos</h3>
  );

export default WorkerReport;
