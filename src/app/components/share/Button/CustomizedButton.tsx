import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
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
