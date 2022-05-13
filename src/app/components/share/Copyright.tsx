import { Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link component={NavLink} to="/" color="inherit">
        TEMPER
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
