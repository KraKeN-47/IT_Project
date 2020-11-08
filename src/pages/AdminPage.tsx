import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { paths } from "router/paths";

const AdminPage = () => {
  const history = useHistory();
  return (
    <Box
      width="30%"
      style={{ background: "tan" }}
      borderRadius="20px"
      padding="20px"
      margin="auto"
      marginTop="20%"
      textAlign="center"
    >
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push(paths.users)}
      >
        Vartotojai
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => history.push(paths.reservedTimes)}
      >
        Užsakymai
      </Button>
    </Box>
  );
};

export default AdminPage;
