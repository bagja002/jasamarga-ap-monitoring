import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectAutoWidth({ styless, dataAP, onValueChange }) {
  const [filter, setfilter] = React.useState("");

  const AP = dataAP
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setfilter(selectedValue);

    // Memanggil fungsi onValueChange yang diteruskan sebagai prop dengan nilai yang dipilih
    onValueChange(selectedValue);
  };

  return (
    <div style={styless}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Pilih Ap
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filter}
          onChange={handleChange}
          autoWidth
          label="Pilih AP"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {AP.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
