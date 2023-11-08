import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(keterangan, komitmen, realisasi, rtk) {
  return { keterangan, komitmen, realisasi, rtk };
}

const rows = [
  createData("Anggaran Belanja PDN & TKDN", 800000, 500000, 24),
  createData("Anggaran Belanja Import", 800000, 500000, 24),
  createData("Anggaran Belanja Keseluruhan", 800000, 500000, 24),
];

function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1250 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Keterangan</TableCell>
            <TableCell align="right">Komitmen</TableCell>
            <TableCell align="right">Realisasi</TableCell>
            <TableCell align="right">% Realisasi Terhadap Komitmen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.keterangan}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.keterangan}
              </TableCell>
              <TableCell align="right">{row.komitmen}</TableCell>
              <TableCell align="right">{row.realisasi}</TableCell>
              <TableCell align="right">{row.rtk}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;
