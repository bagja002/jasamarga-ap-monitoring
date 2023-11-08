import Navbar from "../../../src/app/component/navbar";
import SidebarUser from "../../../src/app/component/sidebarUser";
import { useRouter } from "next/router";

import jwt from "jsonwebtoken";
import axios from "axios";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  DatePicker,
  IconButton,
  Collapse,
  Alert,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

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

function Komitmen() {
  const [id_admin, setId_admin] = useState(0);
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [severenty, setSeverenty] = useState("success");


  const [token, setToken] = useState("");
  const [data, setData] = useState("");
  const [namaUnit, setNamaUnit] = useState();

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

  useEffect(() => {
    const id_user = id_admin.toString();
    const nama_ap = namaUnit;

    setFormData({ ...formData, id_user, nama_ap });
  }, [id_admin, namaUnit]);

  const [formData, setFormData] = useState({
    id_user: "",
    nama_ap: "",
    nama_pekerjaan: "",
    jenis_pekerjaan: "",
    jenis_anggaran: "",
    komitmen_anggaran_2023: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:4000",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(formData);

      const response = await axiosInstance.post(
        "/users/buat_komitmen",
        formData
      );

      const responseData = response.data;
      console.log(formData);
      console.log(responseData);
      setFormData({
        id_user: "",
        nama_ap: "",
        nama_pekerjaan: "",
        jenis_pekerjaan: "",
        jenis_anggaran: "",
        komitmen_anggaran_2023: "",
      });
      
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setSeverenty("error");
      setOpen(true);
      
    }
  };

  // Memindahkan pemanggilan sendData() ke luar fungsi handleSubmit
  const sendData = (event) => {
    event.preventDefault();
    handleSubmit();
    setSeverenty("success");
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    if (severenty === "success") {
      navigate.push("/users/komitmen/komitmen"); // Ganti dengan URL tujuan yang sesuai
    }
  }
  const izin = true;

  return (
    <div style={styles.root}>
      {token ? (
        <>
          <Navbar />

          <SidebarUser />
          <div style={styles.conten}>
            <Container maxWidth="xl">
              <Grid style={{ alignContent: "center", textAlign: "center" }}>
                {namaUnit}
              </Grid>
              <Grid>
                <Collapse in={open}>
                  <Alert
                    severity={severenty}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ width: "100%" }}
                  >
                    Berhasil Membuat data
                  </Alert>
                </Collapse>
              </Grid>
              <form onSubmit={sendData}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Nama Pekerjaan"
                          name="nama_pekerjaan"
                          value={formData.nama_pekerjaan}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>Jenis Pekerjaan</InputLabel>
                        <Select
                          name="jenis_pekerjaan"
                          value={formData.jenis_pekerjaan}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Option 1">Option 1</MenuItem>
                          <MenuItem value="Option 2">Option 2</MenuItem>
                          <MenuItem value="Option 3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>Jenis Anggaran</InputLabel>
                        <Select
                          name="jenis_anggaran"
                          value={formData.jenis_anggaran}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Option A">Option A</MenuItem>
                          <MenuItem value="Option B">Option B</MenuItem>
                          <MenuItem value="Option C">Option C</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Komitmen Anggaran 2023"
                          name="komitmen_anggaran_2023"
                          value={formData.komitmen_anggaran_2023}
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
            </Container>
          </div>
        </>
      ) : (
        <div
          style={{
            backgroundColor: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            width: "100%",
            height: "100vh",
          }}
        ></div>
      )}
    </div>
  );
}

export default Komitmen;
