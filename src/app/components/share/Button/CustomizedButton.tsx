import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

type CustomizedButtonProps = {
  innerText: ReactNode;
  link?: string;
};

export default function CustomizedButton({ innerText, link = '/' }: CustomizedButtonProps) {
  return (
    <NavLink to={link} className="nav">
      <Button variant="contained" className="logInBtn">
        {innerText}
      </Button>
    </NavLink>
  );
}
