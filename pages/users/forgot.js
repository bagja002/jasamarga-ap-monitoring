import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  Alert,
  Modal,
  AlertTitle,

} from "@mui/material";
import styled from "styled-components"
import JSMR from "../../src/app/component/assets/gambar1.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  backgroundColor: "white",
  padding: "16px 32px",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  position: "relative", // Add this for positioning the checkmark
});

function Forgot() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });


  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    message: "",
    success: false,
  });
  const navigate = useRouter();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("")
  const [Pesan, SetPesan] = useState<string>("")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/users/forgetPassword",
        formData
      );
      // Check if successful
      if (response.status === 200) {
  
        setNewPassword(response.data.NewPassword);
        SetPesan(response.data.Pesan)
        setModalContent({
          message: Pesan+" Password Baru anda yaitu :" +newPassword,
          success: true,
        });
        // Save token data in localStorage

      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.pesan);
        setError(true);
      } else {
        alert(
          "Terjadi kesalahan server atau jaringan. Silakan coba lagi nanti."
        );
      }
    }

    // Here you can add authentication logic or send data to the server.
  };

  return (
  
      
    <Container maxWidth="xl">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background:
              "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.4",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={4}
              sx={{
                padding: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
              }}
            >
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {msg}
                </Alert>
              )}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={JSMR}
                  alt="Ini Gmbar"
                />
              </Box>

              <Box
                fontWeight={600}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <br/>
                LUPA PASSWORD
              </Box>
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                  >
                    Username
                  </Typography>
                  <TextField
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box mt="25px">
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="password"
                    mb="5px"
                  >
                    Email
                  </Typography>
                  <TextField
                    type="password"
                    id="teks"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  my={2}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember this Device"
                    />
                  </FormGroup>

                </Stack>
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    Masuk
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
    </Container>

  );
}

export default Forgot;
