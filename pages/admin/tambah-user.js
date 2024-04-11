import Navbar from "../../src/app/component/navbar";
import jwt from "jsonwebtoken";
//import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Container,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Modal,
  Box,
  Typography,
  SvgIcon,
} from "@mui/material";
import axios from "axios";
import styled from "styled-components";

import { useRouter } from "next/router";
import Sidebar from "../../src/app/component/sidebar";

const styles = {
  root: {
    display: "flex",
  },
  sidebar: {
    backgroundColor: "#333",
    color: "#fff",
    width: "220px",
    position: "fixed",
    marginTop: "120px",
    marginLeft: "50px",
    height: "70%",
  },
  conten: {
    marginTop: "120px",
    flex: 1,
    marginLeft: "320px",
    padding: "10px",
  },
};

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

const SuccessMessage = styled(Typography)({
  color: "green",
  marginBottom: "16px",
});

const ErrorMessage = styled(Typography)({
  color: "red",
  marginBottom: "16px",
});

// Define a styled component for the checkmark animation

function Komitmen() {
  const [formRegister, setFormRegister] = React.useState({
    username: "",
    password: "",
    nama_ap: "",
    email: "",
    pic: "",
    no_pic: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    message: "",
    success: false,
  });
  const [id_admin, setId_admin] = useState(0);
  const [namaUnit, setNamaUnit] = useState();
  const [token, setToken] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const tokenjwt = localStorage.getItem("tokenJwt");
    setToken(tokenjwt);

    if (!tokenjwt) {
      alert("Anda harus login terlebih dahulu");
      navigate.push("/users/login");
    } else {
      const decodedToken = jwt.decode(tokenjwt);
      setId_admin(decodedToken.id_admin);
      setNamaUnit(decodedToken.name);
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan data formulir yang disubmit
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      // Await the async call to post the data
      const response = await axiosInstance.post(
        "/admin/registerUsers",
        formRegister
      );

      // Check if the response status is 200
      if (response.status === 200) {
        setModalContent({
          message: "Successfully, click OK to continue.",
          success: true,
        });
      } else {
        // Handle any status code that is not 200
        console.error("Response status is not 200", response.status);
        setModalContent({
          message: "Unexpected response, please try again.",
          success: false,
        });
      }
    } catch (error) {
      // Log the error object for debugging purposes
      console.error("Error during the registration process:", error);
      setModalContent({
        message: "Failed to send data, please try again.",
        success: false,
      });
    }

    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <div style={styles.root}>
      <Navbar />
      <Sidebar />
      <div style={styles.conten}>
        <Container maxWidth="xl">
          <Grid style={{ alignContent: "center", textAlign: "center" }}>
            {"Nama Unit"}
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="Masukan Username"
                      name="username"
                      value={formRegister.username}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="Masukan Nama AP"
                      name="nama_ap"
                      value={formRegister.nama_ap}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="Masukan Email"
                      name="email"
                      value={formRegister.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="Masukan Nama PIC"
                      name="pic"
                      value={formRegister.pic}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="Masukan No PIC"
                      name="no_pic"
                      value={formRegister.no_pic}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      type="password"
                      label="Masukan Password"
                      name="password"
                      value={formRegister.password}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <StyledModal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalBox>
              {modalContent.success ? (
                <>
                  <SuccessMessage id="modal-modal-title">
                    {modalContent.message}
                  </SuccessMessage>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center" // Pusatkan elemen secara vertikal
                    flexDirection="column" // Tambahkan ini agar elemen berada di tengah
                  >
                    <Image
                      src="/succes.svg" // Path gambar di dalam folder 'public'
                      alt="Checkmark"
                      width={48} // Lebar gambar
                      height={48} // Tinggi gambar
                    />

                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="primary"
                    >
                      OK
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                <ErrorMessage id="modal-modal-title">
                  {modalContent.message}
                </ErrorMessage>
                 <Box
                 display="flex"
                 justifyContent="center"
                 alignItems="center" // Pusatkan elemen secara vertikal
                 flexDirection="column"
                  // Tambahkan ini agar elemen berada di tengah
               >
                 <Image
                   src="/failed.svg" // Path gambar di dalam folder 'public'
                   alt="Checkmark"
                  style={{marginBottom:"10px"}}
                   width={48} // Lebar gambar
                   height={48} // Tinggi gambar
                 />

                 <Button
                   onClick={handleClose}
                   variant="contained"
                   color="primary"
                 >
                   OK
                 </Button>
               </Box>
               </>
              )}
            </ModalBox>
          </StyledModal>
        </Container>
      </div>
    </div>
  );
}

export default Komitmen;
