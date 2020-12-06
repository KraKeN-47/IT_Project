import { Box, Fab } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

import { FormWrapper } from "components";
import { useHistory } from "react-router";
import { paths } from "router/paths";

import { ReservationsTable, InventoryTable } from "./tables";
import { useSelector } from "react-redux";
import { selectUserTypeLevel } from "modules/userType/userData.selector";

export default function DisplayInventoryPage() {
  const history = useHistory();
  const handleRedirectAddWorker = () => {
    history.push(paths.addInventory);
  };
  const userLevel = useSelector(selectUserTypeLevel());
  return (
    <FormWrapper>
      <Box
        width="50%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Inventoriaus lentelė</h2>
        <InventoryTable />
        {userLevel === 3 && (
          <Box mt="20px">
            <Fab color="primary" onClick={handleRedirectAddWorker}>
              <AddIcon />
            </Fab>
          </Box>
        )}
        <ReservationsTable />
      </Box>
    </FormWrapper>
  );
}
