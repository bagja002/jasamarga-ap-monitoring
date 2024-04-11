import Navbar from "../../../src/app/component/navbar";
import SidebarUser from "../../../src/app/component/sidebarUser";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NumericFormat } from "react-number-format";
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
    KomitmenAnggaranTahunBerjalan: 0,
    nilai_kontrak_keseluruhan: 0,
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
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sendData = async () => {
      try {
        const response = await axiosInstance.post(
          `/users/add_realisasi`,
          formData
        );

        // Cek status respons, biasanya status 200 adalah sukses
        if (response.status === 200) {

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
    navigate.push('/users/realisasi-belanja/realisasi-belanja')
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
                          label="Nama Pekerjaan"
                          name="NamaPekerjaan"
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
                          name="JenisPekerjaan"
                          value={formData.JenisPekerjaan}
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
                          name="JenisAnggaran"
                          value={formData.JenisAnggaran}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Capex">Capex</MenuItem>
                          <MenuItem value="Opex">Opex</MenuItem>
                       
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <FormGroup>
                      <FormControl>
                        <TextField
                          label="Komitmen Anggaran Tahun Berjalan"
                          type="number"
                          name="KomitmenAnggaranTahunBerjalan"
                          value={formData.KomitmenAnggaranTahunBerjalan}
                          onChange={handleInputChange}
                          InputProps={{
                            readOnly:true,
                          }}
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
                          label="Nilai Kontrak Keseluruhan"
                          name="nilai_kontrak_keseluruhan"
                          value={
                            formData.nilai_kontrak_keseluruhan
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
                          label="Nilai Kontrak Tahun Berjalan"
                          name="nilai_kontrak_tahun"
                          value={
                            formData.nilai_kontrak_tahun
                          }
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
                          name="nama_penyedia_barang_dan_jasa"
                          value={formData.nama_penyedia_barang_dan_jasa}
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
                        <InputLabel>
                          {" "}
                          Realisasi Waktu Mulai Pekerjaan{" "}
                        </InputLabel>
                        <Select
                          name="realisasi_waktu_mulai_kontrak"
                          value={formData.realisasi_waktu_mulai_kontrak}
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
                          name="realisasi_waktu_berakhir_kontrak"
                          value={formData.realisasi_waktu_berakhir_kontrak}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="">None</MenuItem>
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
