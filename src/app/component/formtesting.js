import React from 'react';
import { TextField, Button } from '@mui/material';

const UserForm = ({ email, password, onChange }) => {
  return (
    <div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => onChange('password', e.target.value)}
      />
    </div>
  );
};

export default UserForm;
