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
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import jwt from "jsonwebtoken";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";

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
  { id: "no", label: "No", minWidth: 70 },
  { id: "namaAP", label: "Nama AP", minWidth: 100 },
  {
    id: "PIC",
    label: "Nama PIC",
    minWidth: 100,

   
  },
  {
    id: "noPIC",
    label: "Nomor PIC",
    minWidth: 170,

   
  },
  {
    id: "username",
    label: "Username",
    minWidth: 170,


  },
  {
    id: "email",
    label: "Email PIC ",
    minWidth: 170,


  },{
    id: "status",
    label: "Status ",
    minWidth: 170,


  },
];

function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [id_admin, setId_admin] = React.useState(0);
  const [namaUnit, setNamaUnit] = React.useState();
  const [token, setToken] = React.useState("");
  const navigate = useRouter();
  const [dataAP, setDataAp] = React.useState([]);

  React.useEffect(() => {
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

    const getData = async () => {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        const respon = await axiosInstance.get("/admin/all_user");
        if (respon.status === 200) {
          setDataAp(respon.data.data.map((item)=>({
            id_user:item.IdUsers,
            NamaAP:item.NamaAP,
            Pic :item.Pic,
            No_pic:item.No_pic,
            Username:item.Username,
            Email:item.Email,
            Status:item.Status
          })));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [navigate, token]);

  //GET DATA DAN TAMPILKAN DATA KE DALAM TABLE

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={styles.root}>
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
              Management Account
            </Grid>

            <Grid>
              <Link href={"tambah-user"}>
                <Button>Tambahkan Akun</Button>
              </Link>
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
                    {dataAP
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((dataAP, index) => {
                        return (
                          <TableRow hover key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{dataAP.NamaAP}</TableCell>
                            <TableCell>{dataAP.Pic}</TableCell>
                            <TableCell>{dataAP.No_pic}</TableCell>
                            <TableCell>{dataAP.Username}</TableCell>
                            <TableCell>{dataAP.Email}</TableCell>
                            <TableCell>{dataAP.Status}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={dataAP.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default UsersPage;
