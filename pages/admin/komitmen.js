import React, { useState, useEffect,  useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";


import { Button, Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import AddIcon from "@mui/icons-material/Edit"; // Import AddIcon
import { useRouter } from "next/router";
import Link from "next/link";

import jwt from "jsonwebtoken";
import axios from "axios";
import FilterBulan from "../../src/app/component/tools/filter/bulan";
import FilterTahun from "../../src/app/component/tools/filter/tahun";

import Sidebar from "../../src/app/component/sidebar";
import Navbar from "../../src/app/component/navbar";
import SelectAutoWidth from "../../src/app/component/tools/select";



import { LockContext } from '../../src/app/lock';
import Switch from '@mui/material/Switch';

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
  { id: "StatusPencataan", label: "Status Pencataan", minWidth: 170 },
  { id: "RencanaKualifikasiPednyedia", label: "Rencana Kualifikasi Penyedia", minWidth: 170 },
  { id: "RencanaMulaiTahunPengerjaan", label: "Rencana Mulai Tahun Pekerjaan", minWidth: 170 },
  { id: "RencanaBerakhirTahunPengerjaan", label: "Rencana Berakhir Tahun Pekerjaan", minWidth: 170 },

];

function KomitmenPage() {
  const [page, setPage] = React.useState(0);
  const [id_admin, setId_admin] = useState(0);
  const [namaUnit, setNamaUnit] = useState();
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useRouter();
  const [dataAp, setDataAp]=useState([])

  const [table, setTable] = useState([]);
  

  const [filterTahun, setFilterTahun] = useState(2024)
  const [filterBulan, setFilterBulan] = useState("")

  useEffect(() => {
    const tokenjwt = localStorage.getItem("tokenJwt");
    setToken(tokenjwt);

    if (!tokenjwt) {
      alert("Anda harus login terlebih dahulu");
      navigate.push("/admin/login");
    } else {
      const decodedToken = jwt.decode(tokenjwt);
      setId_admin(decodedToken.id_admin);
      setNamaUnit(decodedToken.name);
    }
  }, [navigate]);
  
  useEffect(() => {
    const id_user = id_admin.toString();
    const nama_ap = namaUnit;

    const getdata = async () => {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      try {

        const response = await axiosInstance.get(`/users/getKomitmen?id_user=${selectedValue}&is_active=1&bulanBuat=${filterBulan}&tahunBuat=${filterTahun}`);
        const extractedData = response.data.data.map((item) => ({
          NamaAP: item.NamaAP,
          NamaPekerjaan: item.NamaPekerjaan,
          JenisPekerjaan: item.JenisPekerjaan,
          JenisAnggaran: item.JenisAnggaran,
          KomitmenAnggaranTahunBerjalan: item.KomitmenAnggaranTahunBerjalan,
          StatusPencataan:item.StatusPencatatan,
          RencanaKualifikasiPenyedua:item.RencanaKualifikasiPenyedia,
          RencanaMulaiTahunPengerjaan:item.RencanaWaktuMulaiPekerjaan,
          RencanaBerakhirTahunPekerjaan:item.RencanaTahunBerakhir
        }));

        setData(extractedData);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    const interval = setInterval(getdata, 1000);

    // Bersihkan interval ketika komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, [id_admin, namaUnit, token, filterTahun, filterBulan, selectedValue]);

  useEffect(()=>{
    
    const GetDataAp = async ()=>{

      try{
        const axiosInstance = axios.create({
          baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axiosInstance.get('admin/all_user')

      setDataAp(
        response.data.data.map((item) => ({
          id: item.IdUser,
          name: item.NamaAP,
        }))
        )
      }catch(error){
        console.error("Terjadi kesalahassn:", error);
      }

    }
    GetDataAp()
    
  },[token])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tambahRealisasi = (row) => {
    // Logika untuk menambahkan keterangan
    // Anda dapat mengimplementasikan logika sesuai kebutuhan
    navigate.push("/users/komitmen/add-komitmen");
  };

  const handleValueChangeBulan = (value) => {
    setFilterBulan(value);
  };
  const handleValueChangeThun = (value) => {
    setFilterTahun(value);
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };



  const handleToggle = (event) => {
    setLock(event.target.checked);
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
                  <SelectAutoWidth dataAP={dataAp} onValueChange={handleValueChange}/>
                </Grid>
                
                <Grid >
                  <FilterBulan onValueChange={handleValueChangeBulan} /> 
            
                </Grid>
                <Grid >
                <FilterTahun onValueChange={handleValueChangeThun} />
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
                          .map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{row.NamaPekerjaan}</TableCell>
                              <TableCell>{row.JenisPekerjaan}</TableCell>
                              <TableCell>{row.JenisAnggaran}</TableCell>
                              <TableCell>{row.KomitmenAnggaranTahunBerjalan}</TableCell>
                              <TableCell>{row.StatusPencataan}</TableCell>
                              <TableCell>{row.RencanaKualifikasiPenyedua}</TableCell>
                              <TableCell>{row.RencanaMulaiTahunPengerjaan}</TableCell>
                              <TableCell>{row.RencanaBerakhirTahunPekerjaan}</TableCell>
                            </TableRow>
                          ))}
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

export default  KomitmenPage;
