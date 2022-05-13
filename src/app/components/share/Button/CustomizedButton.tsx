import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: indigo[500],
  '&:hover': {
    backgroundColor: indigo[700],
  },
}));

type CustomizedButtonProps = {
  innerText: ReactNode;
  link?: string;
};

export default function CustomizedButton({ innerText, link = '' }: CustomizedButtonProps) {
  return (
    <NavLink to={link} className="nav">
      <ColorButton variant="contained" className="logInBtn">
        {innerText}
      </ColorButton>
    </NavLink>
  );
}
