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

import Link from "next/link";

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
  { id: "name", label: "No", minWidth: 170 },
  { id: "code", label: "AP", minWidth: 100 },
  {
    id: "population",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "PIC",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "No PIC",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  }, {
    id: "status",
    label: "Status ",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size, status) {
  const density = population / size;
  return { name, code, population, size, density, status };
}

const rows = [
  createData("1", "Jasamarga Bali Tol", 1324171354, 3287263, "aktif"),
  createData("2", "Jasamarga Cinere Serpong", 1403500365, 9596961, "aktif" ),
  createData("3", "JMTO", 60483973, 301340, "aktif"),
  createData(" 4", "JMRB", 327167434, 9833520, "aktif"),
  createData("5", "Jagorawi", 37602103, 9984670, "aktif"),
  createData("6", "Transjawa", 25475400, 7692024, "aktif"),
  createData("7", "Japek1", 83019200, 357578, "aktif"),
  createData("8", "Japek 2", 4857000, 70273, "aktif"),
  createData("9", "MX", 126577691, 1972550, "aktif"),
  createData("10", "JP", 126317000, 377973, "aktif"),
  createData("11", "FR", 67022000, 640679, "aktif"),
  createData("12", "Gg", 67545757, 242495, "aktif"),
  createData("13", "RU", 146793744, 17098246, "aktif"),
  createData("14a", "NG", 200962417, 923768, "aktif"),
  createData("15", "BR", 210147125, 8515767),
];

function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                <Button >
                  Tambahkan Akun
                </Button>
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
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
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
