import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { blue } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <NavLink to="/logIn" className="nav">
        <ColorButton variant="contained" className="logInBtn">
          Log in
        </ColorButton>
      </NavLink>
      <NavLink to="/singUp" className="nav">
        <ColorButton variant="contained" className="singUpBtn">
          Sing up
        </ColorButton>
      </NavLink>
    </Stack>
  );
}
