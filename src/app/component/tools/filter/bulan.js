import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterBulan({ styless, onValueChange }) {
  const [filter, setfilter] = React.useState("");

  // Define the array of months in English
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
        <InputLabel id="month-select-label">Select Month</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={filter}
          onChange={handleChange}
          autoWidth
          label="Select Month"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {months.map((monthName, index) => (
            <MenuItem key={index} value={monthName}>
              {monthName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
