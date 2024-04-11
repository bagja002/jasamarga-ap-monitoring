import Navbar from "../../src/app/component/navbar";
import SidebarUser from "../../src/app/component/sidebarUser";
import Toogle from "./toolge"
import React, { useState } from "react";
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
} from "@mui/material";

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
  const [formData, setFormData] = useState({
    namaPekerjaan: "",
    jenisPekerjaan: "",
    jenisAnggaran: "",
    komitmenAnggaran2023: "",
    nilaiKontrakKeseluruhan: "",
    nilaiKontrakTahun2023: "",
    namaPenyedia: "",
    kualifikasiPenyedia: "",
    statusPencatatan: "",
    persentasePDN: "",
    persentaseTKDN: "",
    persentaseImpor: "",
    totalBobot: "",
    realisasiMulaiKontrak: "",
    realisasiBerakhirKontrak: "",
    keteranganLainnya: "",
  });
  const [isFormActive, setIsFormActive] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan data formulir yang disubmit
    console.log(formData);
  };
  return (
    <div style={styles.root}>
      <Navbar />
      <SidebarUser />
      <div style={styles.conten}>
      <Toogle isFormActive={isFormActive} toggleForm={setIsFormActive} />
      {isFormActive && (
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
                      label="namaPekerjaan"
                      name="namaPekerjaan"
                      value={formData.namaPekerjaan}
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
                      name="jenisPekerjaan"
                      value={formData.jenisPekerjaan}
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
                      name="jenisAnggaran"
                      value={formData.jenisAnggaran}
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
                      name="komitmenAnggaran2023"
                      value={formData.komitmenAnggaran2023}
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
        )}
      </div>
    </div>
  );
}

export default Komitmen;
