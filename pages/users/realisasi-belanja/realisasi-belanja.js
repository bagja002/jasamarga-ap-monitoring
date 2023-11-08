import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Sidebar from "../../../src/app/component/sidebarUser";
import Navbar from "../../../src/app/component/navbar";
import { Button, Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import AddIcon from "@mui/icons-material/Edit"; // Import AddIcon
import { useRouter } from "next/router";
import Link from "next/link";

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

const columns = [
  {
    id: "no",
    label: "no",
    minWidth: 100,
  },

  { id: "namaPekerjaan", label: "Nama Pekerjaan", minWidth: 170 },
  { id: "jenisPekerjaan", label: "Jenis Pekerjaan", minWidth: 170 },
  { id: "jenisAnggaran", label: "Jenis Anggaran", minWidth: 170 },
  { id: "komitmenAnggaran", label: "Komitmen Anggaran", minWidth: 170 },
  {
    id: "nilaiKontrakKeseluruhan",
    label: "Nilai Kontrak Keseluruhan",
    minWidth: 170,
  },
  {
    id: "nilaiKontrakTahun2023",
    label: "Nilai Kontrak Tahun 2023",
    minWidth: 170,
  },
  {
    id: "namaPenyediaBarangJasa",
    label: "Nama Penyedia Barang dan Jasa",
    minWidth: 170,
  },
  {
    id: "kualifikasiPenyedia",
    label: "Kualifikasi Penyedia (UMKK/Menengah/Besar)",
    minWidth: 170,
  },
  {
    id: "statusPencatatan",
    label: "Status Pencatatan (PDN/TKDN/IMPOR)",
    minWidth: 170,
  },
  { id: "persentasePDN", label: "(%) Persentase PDN", minWidth: 170 },
  { id: "persentaseTKDN", label: "(%) Persentase TKDN", minWidth: 170 },
  { id: "persentaseImpor", label: "Persentase Impor", minWidth: 170 },
  { id: "totalBobot", label: "(%) Total Bobot", minWidth: 170 },
  {
    id: "realisasiWaktuMulaiKontrak",
    label: "(%) Realisasi Waktu Mulai Kontrak",
    minWidth: 170,
  },
  {
    id: "realisasiWaktuBerakhirKontrak",
    label: "(%) Realisasi Waktu Berakhir Kontrak",
    minWidth: 170,
  },
  { id: "keteranganLainnya", label: "Keterangan Lainnya", minWidth: 100 },
  { id: "Action", label: "Action", minWidth: 100 },
];

function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useRouter();
  const [data, setData] = React.useState([]);
  const [namaUnit, setNamaUnit] = React.useState();
  const [token, setToken] = React.useState("");
  const [id_admin, setId_admin] = React.useState(0);
  React.useEffect(() => {
    const fetchData = async () => {
      const tokenjwt = localStorage.getItem("tokenJwt");
      setToken(tokenjwt);
  
      if (!tokenjwt) {
        alert("Anda harus login terlebih dahulu");
        navigate.push("/users/login");
        return;
      }
  
      const decodedToken = jwt.decode(tokenjwt);
      setId_admin(decodedToken.id_admin);
      setNamaUnit(decodedToken.name);
      /*
      const id_user = decodedToken.id_admin.toString();
      const nama_ap = decodedToken.name;
      */
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:4000",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      try {
        const response = await axiosInstance.get(
          `/users/getKomitmen?id_user=${id_admin}`
        );
  
        if (response.data && response.data.data) {
          const extractedData = response.data.data.map((item) => ({
            IdKontrak: item.IdKontrak,
            NamaAP: item.NamaAP,
            NamaPekerjaan: item.NamaPekerjaan,
            JenisPekerjaan: item.JenisPekerjaan,
            JenisAnggaran: item.JenisAnggaran,
            KomitmenAnggaran2023: item.KomitmenAnggaran2023,
            NilaiKontrakKeseluruhan: item.NilaiKontrakKeseluruhan,
            NilaiKontrakTahun: item.NilaiKontrakTahun,
            NamaPenyediaBarangDanJasa: item.NamaPenyediaBarangDanJasa,
            KualifikasiPenyedia: item.KualifikasiPenyedia,
            StatusPencatatan: item.StatusPencatatan,
            PersentasePDN: item.PersentasePDN,
            PersentaseTKDN: item.PersentaseTKDN,
            PersentaseImpor: item.PersentaseImpor,
            TotalBobot: item.TotalBobot,
            RealisasiWaktuMulaiKontrak: item.RealisasiWaktuMulaiKontrak,
            RealisasiWaktuBerakhirKontrak: item.RealisasiWaktuBerakhirKontrak,
            KeteranganLainnya: item.KeteranganLainnya,
          }));
  
          setData(extractedData);
        } 
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
  

  
    const interval = setInterval(fetchData, 1000);
  
    // Bersihkan interval ketika komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, [navigate, token]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTambah = (row) => {
    // Logika untuk menambahkan data
    // Anda dapat mengimpl ementasikan logika sesuai kebutuhan
    navigate.push(`update?id_kontrak=${row.IdKontrak}`);
  };

  const handleHapus = (row) => {
    // Logika untuk menghapus data
    // Anda dapat mengimplementasikan logika sesuai kebutuhan
    console.log("Hapus: ", row);
  };

  const tambahRealisasi = (row) => {
    // Logika untuk menambahkan keterangan
    // Anda dapat mengimplementasikan logika sesuai kebutuhan
    navigate.push("/users/komitmen/add-komitmen");
  };

  const handleHapusKeterangan = (row) => {
    // Logika untuk menghapus keterangan
    // Anda dapat mengimplementasikan logika sesuai kebutuhan
    console.log("Hapus Keterangan: ", row);
  };

  return (
    <div style={styles.root}>
      {token ? (
        <>
          <Navbar />
          <Sidebar />
          <div style={styles.conten}>
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                    height: "40px",
                    fontSize: "30px",
                    fontFamily: "Poppins",
                  }}
                >
                  List Pekerjaan
                </Grid>
                <Grid>
                  <Button onClick={tambahRealisasi}>Tambah Realisasi</Button>
                </Grid>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.NamaPekerjaan}</TableCell>
                                <TableCell>{row.JenisPekerjaan}</TableCell>
                                <TableCell>{row.JenisAnggaran}</TableCell>
                                <TableCell>
                                  {row.KomitmenAnggaran2023}
                                </TableCell>
                                <TableCell>
                                  {row.NilaiKontrakKeseluruhan}
                                </TableCell>
                                <TableCell>{row.NilaiKontrakTahun}</TableCell>
                                <TableCell>
                                  {row.NamaPenyediaBarangDanJasa}
                                </TableCell>
                                <TableCell>{row.KualifikasiPenyedia}</TableCell>
                                <TableCell>{row.StatusPencatatan}</TableCell>
                                <TableCell>{row.PersentasePDN}</TableCell>
                                <TableCell>{row.PersentaseTKDN}</TableCell>
                                <TableCell>{row.PersentaseImpor}</TableCell>
                                <TableCell>{row.TotalBobot}</TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuMulaiKontrak}
                                </TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuBerakhirKontrak}
                                </TableCell>
                                <TableCell>{row.KeteranganLainnya}</TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    color="primary"
                                    onClick={()=>handleTambah(row)} // Handle the edit action
                                  >
                                    <AddIcon />
                                  </IconButton>
                                  <IconButton
                                    color="secondary"
                                    onClick={handleHapus}// Handle the delete action
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
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

export default UsersPage;
