import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterStatus({ styless, onValueChange }) {
  const [filter, setfilter] = React.useState("");

  // Define the array of months in English
  const status = [
    "TKDN","PDN", "IMPOR"
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setfilter(selectedValue);

    // Call the onValueChange function passed as a prop with the selected value
    onValueChange(selectedValue);
  };

  return (
    <div style={styless}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="status-select-label">Pilih Pencatatan</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={filter}
          onChange={handleChange}
          autoWidth
          label="Status Select"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {status.map((monthName, index) => (
            <MenuItem key={index} value={monthName}>
              {monthName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
