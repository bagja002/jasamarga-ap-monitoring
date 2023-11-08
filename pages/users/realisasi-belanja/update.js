import Navbar from "../../../src/app/component/navbar";
import SidebarUser from "../../../src/app/component/sidebarUser";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  const navigate = useRouter();
  const router = useRouter();
  const { id_kontrak } = router.query;
  const [id_admin, setId_admin] = useState(0);
  const [namaUnit, setNamaUnit] = useState();
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const [formData, setFormData] = useState({
    NamaPekerjaan: "",
    JenisPekerjaan: "",
    JenisAnggaran: "",
    KomitmenAnggaran2023: "",
    nilai_kontrak_keseluruhan: "",
    nilai_kontrak_tahun: "",
    nama_penyedia_barang_dan_jasa: "",
    kualifikasi_penyedia: "",
    status_pencatatan: "",
    persentase_pdn: "",
    persentase_tkdn: "",
    persentase_impor: "",
    total_bobot: "",
    realisasi_waktu_mulai_kontrak: "",
    realisasi_waktu_berakhir_kontrak: "",
    keterangan_lainnya: "",
  });

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

      const id_user = decodedToken.id_admin.toString();
      const nama_ap = decodedToken.name;

      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:4000",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getdata = async () => {
        try {
          const response = await axiosInstance.get(
            `/users/getKomitmen?id_kontrak=${id_kontrak}`
          );

          if (response.data && response.data.data) {
            const extractedData = response.data.data;
            setData(extractedData);
            setFormData({
              NamaPekerjaan: extractedData.NamaPekerjaan,
              JenisPekerjaan: extractedData.JenisPekerjaan,
              JenisAnggaran: extractedData.JenisAnggaran,
              KomitmenAnggaran2023: extractedData.KomitmenAnggaran2023,
              nilai_kontrak_keseluruhan: "",
              nilai_kontrak_tahun: "",
              nama_penyedia_barang_dan_jasa: "",
              kualifikasi_penyedia: "",
              status_pencatatan: "",
              persentase_pdn: "",
              persentase_tkdn: "",
              persentase_impor: "",
              total_bobot: "",
              realisasi_waktu_mulai_kontrak: "",
              realisasi_waktu_berakhir_kontrak: "",
              keterangan_lainnya: "",
            });
          }
        } catch (error) {
          console.error("Terjadi kesalahan:", error);
        }
      };
      getdata();
    }
  }, [id_admin, namaUnit, token, navigate, id_kontrak]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Lakukan sesuatu dengan data formulir yang disubmit

    console.log(formData);
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:4000",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sendData = async () => {
      try {
        const response = await axiosInstance.put(
          `/users/update?id_kontrak=${id_kontrak}`,
          formData
        );

        // Cek status respons, biasanya status 200 adalah sukses
        if (response.status === 200) {
          console.log("Berhasil mengirim data:", response.data);
          setOpenSuccessDialog(true); // Buka dialog sukses
          
          // Handle respons sukses di sini
        } else {
          console.error(
            "Gagal mengirim data. Respons status:",
            response.status
          );
          setOpenErrorDialog(true); // Buka dialog kesalahan
          // Handle respons gagal di sini
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setOpenErrorDialog(true)
        // Handle kesalahan jika permintaan gagal sepenuhnya, misalnya jaringan bermasalah.
      }
    };
    sendData();
  };

  const handlerCloseDialog = ()=>{
    setOpenSuccessDialog(false)
    navigate.push('realisasi-belanja')
  }
  return (
    <div style={styles.root}>
      {token ? (
        <>
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
                          label="namaPekerjaan"
                          name="namaPekerjaan"
                          value={formData.NamaPekerjaan}
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
                          value={formData.JenisPekerjaan}
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
                          value={formData.JenisAnggaran}
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
                          type="number"
                          name="komitmenAnggaran2023"
                          value={formData.KomitmenAnggaran2023}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Nilai Kontrak Keseluruhan"
                          name="nilai_kontrak_keseluruhan"
                          type="number"
                          value={formData.nilai_kontrak_keseluruhan}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Nilai Kontrak Tahun 2023"
                          name="nilai_kontrak_tahun"
                          type="number"
                          value={formData.nilai_kontrak_tahun}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Nama Penyedia Barang dan Jasa"
                          name="nama_penyedia"
                          value={formData.nama_penyedia}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <InputLabel>Kualifikasi Penyedia</InputLabel>
                        <Select
                          name="kualifikasi_penyedia"
                          value={formData.kualifikasi_penyedia}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="UMKK">UMKK</MenuItem>
                          <MenuItem value="Menengah">Menengah</MenuItem>
                          <MenuItem value="Besar">Besar</MenuItem>
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Status Pencatatan"
                          name="status_pencatatan"
                          value={formData.status_pencatatan}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Persentase PDN"
                          type="number"
                          name="persentase_pdn"
                          value={formData.persentase_pdn}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Persentase TKDN"
                          name="persentase_tkdn"
                          type="number"
                          value={formData.persentase_tkdn}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Persentase Impor"
                          name="persentase_impor"
                          type="number"
                          value={formData.persentase_impor}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Total Bobot"
                          name="total_bobot"
                          type="number"
                          value={formData.total_bobot}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Realisasi Waktu Mulai Kontrak"
                          name="realisasi_waktu_mulai_kontrak"
                          value={formData.realisasi_waktu_mulai_kontrak}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Realisasi Waktu Berakhir Kontrak"
                          name="realisasi_waktu_berakhir_kontrak"
                          value={formData.realisasi_waktu_berakhir_kontrak}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Keterangan Lainnya"
                          name="keterangan_lainnya"
                          value={formData.keterangan_lainnya}
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
              <Dialog
                open={openSuccessDialog}
                onClose={() => setOpenSuccessDialog(false)
                }
              >
                <DialogTitle>Sukses!</DialogTitle>
                <DialogContent>Data berhasil dikirim.</DialogContent>
                <Button
                  onClick={handlerCloseDialog}
                  color="primary"
                >
                  Tutup
                </Button>
              </Dialog>

              <Dialog
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
              >
                <DialogTitle>Gagal!</DialogTitle>
                <DialogContent>HARAP MASUKAN DATA YANG BENAR</DialogContent>
                <Button
                  onClick={() => setOpenErrorDialog(false)}
                  color="primary"
                >
                  Tutup
                </Button>
              </Dialog>
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
