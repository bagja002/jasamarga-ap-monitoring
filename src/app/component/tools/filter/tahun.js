import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterTahun({ styless, onValueChange }) {
  const [filter, setfilter] = React.useState("");

  // Dapatkan tahun saat ini dan hitung 5 tahun ke belakang
  const currentYear = 2024; // asumsikan tahun saat ini adalah 2024
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setfilter(selectedValue);

    // Memanggil fungsi onValueChange yang diteruskan sebagai prop dengan nilai yang dipilih
    onValueChange(selectedValue);
  };

  return (
    <div style={styless}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="year-select-label">Select Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={filter}
          onChange={handleChange}
          autoWidth
          label="Select Year"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
