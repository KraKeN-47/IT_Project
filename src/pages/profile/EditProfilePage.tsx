import { Box, Button, Fab, TextField } from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import jwt from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "modules/userType/userData.selector";
import { setImagePath } from "modules/image/image.slice";
import { FormWrapper } from "components";
import { api } from "global/variables";

export default function EditProfilePage() {
  const userId = useSelector(selectUserId());
  const dispatch = useDispatch();

  const initialState = (stateName: string) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const tokenData: any = jwt(token);
      if (stateName === "email") {
        return tokenData.email;
      }
      if (stateName === "adresas") {
        return tokenData.adresas;
      }
      if (stateName === "telefonoNumeris") {
        return tokenData.phoneNumber;
      }
    }
  };
  const [email, setEmail] = useState(initialState("email"));
  const [adresas, setAdresas] = useState(initialState("adresas"));
  const [telefonoNumeris, setTelefonoNumeris] = useState(
    initialState("telefonoNumeris")
  );
  const [file, setFile] = useState<any>(undefined);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };

  const handlePictureDelete = async () => {
    const resp = await api.delete(`/Picture/delete/${userId}`);
    alert(resp.data.message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      var formData = new FormData();
      formData.append("image", file);
      formData.append("userId", `${userId}`);
      const resp = await api.post("/Picture/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setImagePath({ imagePath: resp.data.imagePath }));
    }
    if (email !== initialState("email")) {
      const resp = await api.post("/Auth/changeEmail", {
        userId: userId.toString(),
        email,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    if (adresas !== initialState("adresas")) {
      const resp = await api.post("/Auth/changeAddress", {
        userId: userId.toString(),
        address: adresas,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    if (telefonoNumeris !== initialState("telefonoNumeris")) {
      const resp = await api.post("/Auth/changePhoneNumber", {
        userId: userId.toString(),
        phoneNumber: telefonoNumeris,
      });
      const newToken = await api.get(`/Auth/generateNewToken/${userId}`);
      localStorage.setItem("token", newToken.data.token);
      alert(resp.data.message);
    }
    window.location.reload();
  };

  return (
    <FormWrapper>
      <Box
        width="30%"
        style={{ background: "tan" }}
        borderRadius="20px"
        padding="20px"
        textAlign="center"
      >
        <h2>Profilio redagavimas</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid" }}>
          <TextField
            id="outlined-basic"
            label="El.Paštas"
            name="email"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
          <TextField
            id="outlined-basic"
            label="Adresas"
            name="adresas"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setAdresas(e.target.value)}
            defaultValue={adresas}
          />
          <TextField
            id="outlined-basic"
            label="Telefono Numeris"
            name="telNr"
            style={{ paddingBottom: "20px" }}
            onChange={(e) => setTelefonoNumeris(e.target.value)}
            defaultValue={telefonoNumeris}
          />
          <Box display="flex" marginBottom="20px">
            <Box margin="auto" display="grid">
              <label style={{ fontWeight: "bolder", marginBottom: "10px" }}>
                Įkelti nuotrauką
              </label>
              <input type="file" onChange={handleImageUpload} />
              <Box mt="20px">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handlePictureDelete}
                >
                  Pašalinti profilio nuotrauką
                </Button>
              </Box>
            </Box>
          </Box>
          <Button variant="contained" color="secondary" type="submit">
            Patvirtinti
          </Button>
        </form>
        <h4 style={{ paddingTop: "20px" }}>Šalinti paskyrą</h4>
        <Fab>
          <DeleteIcon />
        </Fab>
      </Box>
    </FormWrapper>
  );
}
