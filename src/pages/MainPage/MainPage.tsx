import { Box, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import { useAppSelector } from '../../app/hooks';

export default function MainPage() {
  const { auth } = useAppSelector((state) => state.userAuthReducer);

  if (!auth.isAuth) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Typography component="h1" variant="h3">
          Access denied
        </Typography>
        <Link component={NavLink} to="/" variant="body1">
          {'Home page'}
        </Link>
      </Box>
    );
  }

  return (
    <>
      <Header />

      <div style={{ color: 'white', marginTop: '100px' }}>MainPage</div>
    </>
  );
}
