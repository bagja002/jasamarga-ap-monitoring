import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
} from "@mui/material";
import JSMR from "../../src/app/component/assets/gambar1.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useRouter();
  const [token, setToken] = useState(""); // State untuk menyimpan token
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/login",
        formData
      );
      //cek jika berhasil
      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        //Simpan data token di redist

        localStorage.setItem("tokenJwt", token);
        const jwtToken = localStorage.getItem("tokenJwt");
     

        if (jwtToken) {
        
          navigate.push("/admin/dashboard");
        }
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

    // Di sini Anda dapat menambahkan logika autentikasi atau pengiriman data ke server.
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
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
              sx={{ padding: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {msg}
                </Alert>
              )}
              <Box display="flex" alignItems="center" justifyContent="center">
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
                Login Admin Monitoring
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
                    Password
                  </Typography>
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
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
                  <Typography
                    component={Link}
                    href="/"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Forgot Password ?
                  </Typography>
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

export default Login;
