import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Toggles({ isFormActive, toggleForm }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isFormActive}
          onChange={() => toggleForm(!isFormActive)}
          name="toggleForm"
        />
      }
      label={isFormActive ? "Form Aktif" : "Form Tidak Aktif"}
    />
  );
}

export default Toggles