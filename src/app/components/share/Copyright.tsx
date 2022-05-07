import { Link, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        TEMPER
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
