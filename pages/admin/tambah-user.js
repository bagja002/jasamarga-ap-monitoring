import Navbar from "../../src/app/component/navbar";
import SidebarUser from "../../src/app/component/sidebar";

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
    Ap:"",
    Email:"",
    PIC:"",
    NoPIC:"",
    Status:"1",
  });

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
                      label="Anak Perusahaan"
                      name="Ap"
                      value={formData.Ap}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="email"
                      name="email"
                      value={formData.Email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="pic"
                      name="pic"
                      value={formData.PIC}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="No Pic"
                      name="NoPic"
                      value={formData.NoPIC}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControl>
                    <TextField
                      label="No Pic"
                      name="NoPic"
                      value={formData.NoPIC}
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
    </div>
  );
}

export default Komitmen;
