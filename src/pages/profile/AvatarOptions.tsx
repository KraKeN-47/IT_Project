import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "modules/userType/userData.selector";
import { setImagePath } from "modules/image/image.slice";
import { FormWrapper } from "components";
import { api } from "global/variables";

export default function AvatarOptionsPage() {
  const userId = useSelector(selectUserId());
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(undefined);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };
  const handlePictureDelete = async () => {
    try {
      const resp = await api.delete(`/Picture/delete/${userId}`);
      alert(resp.data.message);
      window.location.reload();
    } catch (error) {
      alert("Serverio klaida");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      var formData = new FormData();
      formData.append("image", file);
      formData.append("userId", `${userId}`);
      try {
        const resp = await api.post("/Picture/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(setImagePath({ imagePath: resp.data.imagePath }));
        alert("Nuotrauka patalpinta.");
      } catch (error) {
        alert("Serverio klaida.");
      }
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
        <h2>Profilio nuotraukos nustatymai</h2>
        <form onSubmit={handleSubmit}>
          <Box display="flex" marginBottom="20px">
            <Box margin="auto" display="grid">
              <label
                style={{
                  fontWeight: "bolder",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
              >
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
      </Box>
    </FormWrapper>
  );
}
