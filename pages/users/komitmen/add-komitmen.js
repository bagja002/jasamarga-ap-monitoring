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
import { NumericFormat } from "react-number-format";

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
    komitmen_anggaran_thn_berjalan: "",
    status_pencatatan: "",
    komitmen_keseluruhan_anggaran_thn_berjalan: "",
    status_padi: "",
    rencana_kualifikasi_penyedia: "",
    rencana_waktu_mulai_pekerjaan: "",
    rencana_tahun_berakhir: "",
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
      const id_user = id_admin.toString();
      const nama_ap = namaUnit;
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
 

      const response = await axiosInstance.post(
        //"/users/buat_komitmen",
        "/testBuat",
        formData
      );

      const responseData = response.data;

      setFormData({
        id_user: id_user,
        nama_ap: nama_ap,
        nama_pekerjaan: "",
        jenis_pekerjaan: "",
        jenis_anggaran: "",
        komitmen_anggaran_thn_berjalan: "",
        status_pencatatan: "",
        komitmen_keseluruhan_anggaran_thn_berjalan: "",
        status_padi: "",
        rencana_kualifikasi_penyedia: "",
        rencana_waktu_mulai_pekerjaan: "",
        rencana_tahun_berakhir: "",
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
  };

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
                          <MenuItem value="Barang">Barang</MenuItem>
                          <MenuItem value="Jasa Konsultasi">
                            Jasa Konsultasi
                          </MenuItem>
                          <MenuItem value="Kontruksi">Kontruksi</MenuItem>
                          <MenuItem value="Jasa Lain">Jasa Lain</MenuItem>
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
                          <MenuItem value="Opex">Opex</MenuItem>
                          <MenuItem value="Capex">Capex</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>Status Pencatatan</InputLabel>
                        <Select
                          name="status_pencatatan"
                          value={formData.status_pencatatan}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="TKDN">TKDN</MenuItem>
                          <MenuItem value="PDN">PDN</MenuItem>
                          <MenuItem value="IMPOR">IMPOR</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>Rencana Kualifikasi Penyedia </InputLabel>
                        <Select
                          name="rencana_kualifikasi_penyedia"
                          value={formData.rencana_kualifikasi_penyedia}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="UMKM">UMKM</MenuItem>
                          <MenuItem value="Non UMKM">Non UMKM</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>
                          Melalui PaDi UMKM/Non PaDi UMKM{" "}
                        </InputLabel>
                        <Select
                          name="status_padi"
                          value={formData.status_padi}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="PaDi UMKM">PaDi UMKM</MenuItem>
                          <MenuItem value="Non PaDi UMKM">
                            Non PaDi UMKM
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>
                          {" "}
                          Rencana Waktu Mulai Pengerjaan Tahun{2024}{" "}
                        </InputLabel>
                        <Select
                          name="rencana_waktu_mulai_pekerjaan"
                          value={formData.rencana_waktu_mulai_pekerjaan}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="January">January</MenuItem>
                          <MenuItem value="February">February</MenuItem>
                          <MenuItem value="March">March</MenuItem>
                          <MenuItem value="April">April</MenuItem>
                          <MenuItem value="May">May</MenuItem>
                          <MenuItem value="June">June</MenuItem>
                          <MenuItem value="July">July</MenuItem>
                          <MenuItem value="August">August</MenuItem>
                          <MenuItem value="September">September</MenuItem>
                          <MenuItem value="October">October</MenuItem>
                          <MenuItem value="November">November</MenuItem>
                          <MenuItem value="December">December</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>
                          {" "}
                          Rencana Tahun Berakhir Pekerjaan{" "}
                        </InputLabel>
                        <Select
                          name="rencana_tahun_berakhir"
                          value={formData.rencana_tahun_berakhir}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="2029">2029</MenuItem>
                          <MenuItem value="2028">2028</MenuItem>
                          <MenuItem value="2027">2027</MenuItem>
                          <MenuItem value="2026">2026</MenuItem>
                          <MenuItem value="2025">2025</MenuItem>
                          <MenuItem value="2024">2024</MenuItem>
                          <MenuItem value="2023">2023</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>

        
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <NumericFormat
                          customInput={TextField}
                          prefix="Rp. "
                          thousandSeparator
                          label="Komitmen Keseluruhan"
                          name="komitmen_keseluruhan_anggaran_thn_berjalan"
                          value={
                            formData.komitmen_keseluruhan_anggaran_thn_berjalan
                          }
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <NumericFormat
                          customInput={TextField}
                          prefix="Rp. "
                          thousandSeparator
                          value={formData.komitmen_anggaran_thn_berjalan}
                          label="Komitmen Tahun Berjalan"
                          name="komitmen_anggaran_thn_berjalan"
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
