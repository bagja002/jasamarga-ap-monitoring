import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Sidebar from "../../src/app/component/sidebar";
import Navbar from "../../src/app/component/navbar";
import { Button, Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import AddIcon from "@mui/icons-material/Edit"; // Import AddIcon
import { useRouter } from "next/router";
import Link from "next/link";
import Select from "../../src/app/component/tools/select";

import jwt from "jsonwebtoken";
import axios from "axios";
import FilterBulan from "../../src/app/component/tools/filter/bulan";
import FilterTahun from "../../src/app/component/tools/filter/tahun";

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

  // Adjust the left margin as needed
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
];

function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useRouter();
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [namaUnit, setNamaUnit] = React.useState();
  const [token, setToken] = React.useState("");
  const [id_admin, setId_admin] = React.useState(0);
  const [dataAp, setDataAp] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [filterTahun, setFilterTahun] = React.useState(2024);
  const [filterBulan, setFilterBulan] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const tokenjwt = localStorage.getItem("tokenJwt");
      setToken(tokenjwt);

      if (!tokenjwt) {
        alert("Anda harus login terlebih dahulu");
        navigate.push("/admin/login");
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
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        const response = await axiosInstance.get(
          `/users/getKomitmen?id_user=${selectedValue}&is_active=1&status=1&bulanBuat=${filterBulan}&tahunBuat=${filterTahun}`
        );

        if (response.data && response.data.data) {
          const extractedData = response.data.data.map((item) => ({
            IdKontrak: item.IdKontrak,
            NamaAP: item.NamaAP,
            NamaPekerjaan: item.NamaPekerjaan,
            JenisPekerjaan: item.JenisPekerjaan,
            JenisAnggaran: item.JenisAnggaran,
            KomitmenAnggaranTahunBerjalan: item.KomitmenAnggaranTahunBerjalan,
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

        const response1 = await axiosInstance.get(
          `/users/getKomitmen?id_user=${selectedValue}&is_active=1&status=2&bulanBuat=${filterBulan}&tahunBuat=${filterTahun}`
        );

        if (response1.data && response1.data.data) {
          const extractedData1 = response1.data.data.map((item) => ({
            IdKontrak: item.IdKontrak,
            NamaAP: item.NamaAP,
            NamaPekerjaan: item.NamaPekerjaan,
            JenisPekerjaan: item.JenisPekerjaan,
            JenisAnggaran: item.JenisAnggaran,
            KomitmenAnggaranTahunBerjalan: item.KomitmenAnggaranTahunBerjalan,
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

          setData2(extractedData1);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    // Bersihkan interval ketika komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, [navigate, token, filterBulan, filterTahun, selectedValue]);

  React.useEffect(() => {
    const GetDataAp = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axiosInstance.get("admin/all_user");

        setDataAp(
          response.data.data.map((item) => ({
            id: item.IdUser,
            name: item.NamaAP,
          }))
        );
      } catch (error) {
        console.error("Terjadi kesalahasn:", error);
      }
    };
    GetDataAp();

    // Clean up interval when the component is unmounted
  }, [token]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleValueChangeBulan = (value) => {
    setFilterBulan(value);
  };
  const handleValueChangeThun = (value) => {
    setFilterTahun(value);
  };

  const hanlderTarik = ()=>{
    navigate.push(process.env.NEXT_PUBLIC_BACKEND_URL+"/admin/download")
  }


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
                  List Komitmen Yang Belum Terealisasi
                </Grid>
                <Button onClick={hanlderTarik} >Tarik Data</Button>
                <Select dataAP={dataAp} onValueChange={handleValueChange} />
                <FilterBulan onValueChange={handleValueChangeBulan}/>
                <FilterTahun onValueChange={handleValueChangeThun} />
                <Paper sx={{ marginTop:"10px", width: "100%", overflow: "hidden" }}>
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
                                  Rp. {row.KomitmenAnggaranTahunBerjalan.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  Rp. {row.NilaiKontrakKeseluruhan.toLocaleString()}
                                </TableCell>
                                <TableCell>Rp. {row.NilaiKontrakTahun.toLocaleString()}</TableCell>
                                <TableCell>
                                  {row.NamaPenyediaBarangDanJasa}
                                </TableCell>
                                <TableCell>{row.KualifikasiPenyedia}</TableCell>
                                <TableCell>{row.StatusPencatatan}</TableCell>
                                <TableCell>{row.PersentasePDN}%</TableCell>
                                <TableCell>{row.PersentaseTKDN}%</TableCell>
                                <TableCell>{row.PersentaseImpor}%</TableCell>
                                <TableCell>{row.TotalBobot}%</TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuMulaiKontrak}
                                </TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuBerakhirKontrak}
                                </TableCell>
                                <TableCell>{row.KeteranganLainnya}</TableCell>
                               
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
                <Grid
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignContent: "center",
                    padding:"30px",
                    width: "100%",
                    height: "40px",
                    fontSize: "30px",
                    fontFamily: "Poppins",
                  }}
                >
                  List Komitmen Yang Telah Terealisasi
                </Grid>
                <Paper sx={{ marginTop:"30px", width: "100%", overflow: "hidden" }}>
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
                        {data2
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
                                  Rp. {row.KomitmenAnggaranTahunBerjalan.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  Rp. {row.NilaiKontrakKeseluruhan.toLocaleString()}
                                </TableCell>
                                <TableCell>Rp. {row.NilaiKontrakTahun.toLocaleString()}</TableCell>
                                <TableCell>
                                  {row.NamaPenyediaBarangDanJasa}
                                </TableCell>
                                <TableCell>{row.KualifikasiPenyedia}</TableCell>
                                <TableCell>{row.StatusPencatatan}%</TableCell>
                                <TableCell>{row.PersentasePDN}%</TableCell>
                                <TableCell>{row.PersentaseTKDN}%</TableCell>
                                <TableCell>{row.PersentaseImpor}%</TableCell>
                                <TableCell>{row.TotalBobot}%</TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuMulaiKontrak}
                                </TableCell>
                                <TableCell>
                                  {row.RealisasiWaktuBerakhirKontrak}
                                </TableCell>
                                <TableCell>{row.KeteranganLainnya}</TableCell>
                                
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
