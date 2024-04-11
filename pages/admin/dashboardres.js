import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DenseTable({ data }) {
  // Tambahkan penanganan jika data tidak terdefinisi

  const [data1, setdata] = React.useState({});

  React.useEffect(() => {
    setdata(data);
  }, [data]);
  if (!data1) {
    return <div>Data tidak tersedia</div>;
  }


  function createData(keterangan, komitmen, realisasi, rtk) {
    return { keterangan, komitmen, realisasi, rtk };
  }

  let persentaseRealisasiPDNTKDN =
    data1 && typeof data1.Persentase_Realisasi_PDN_TKDN === "number"
      ? `${data1.Persentase_Realisasi_PDN_TKDN.toFixed(2)}%`
      : "Data not available";

  let persentaseRealisasiBelanjaImpor =
    data1 && typeof data1.Persentase_Realisasi_belanja_impor === "number"
      ? `${data1.Persentase_Realisasi_belanja_impor.toFixed(2)}%`
      : "Data not available";
  let persentaseRealisasi =
    data1 && typeof data1.Persentase_Realisasi === "number"
      ? `${data1.Persentase_Realisasi.toFixed(2)}%`
      : "Data not available";

  const rows = [
    createData(
      "Anggaran Belanja PDN & TKDN",
      data1.KomitmenTKDN,
      data1.Realisasi_TKDNPDN,
      persentaseRealisasiPDNTKDN
    ),
    createData(
      "Anggaran Belanja Import",
      data1.KomitmenImpor,
      data1.Import,
      persentaseRealisasiBelanjaImpor
    ),
    createData(
      "Anggaran Belanja Keseluruhan",
      data1.Komitmen,
      data1.Realisasi,
      persentaseRealisasi
    ),
  ];

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
              <TableCell align="right">
               Rp. {row.komitmen !== undefined
                  ? row.komitmen.toLocaleString()
                  : ""}
              </TableCell>

              <TableCell align="right">
               Rp. {row.realisasi !== undefined
                  ? row.realisasi.toLocaleString()
                  : ""}
              </TableCell>
              <TableCell align="right">
                {row.rtk !== undefined ? row.rtk.toLocaleString() : ""} 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;
