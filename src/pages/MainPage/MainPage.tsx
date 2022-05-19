import { Container, Box, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Footer from '../../app/components/share/Footer/Footer';
import Header from '../../app/components/share/Header';
import { useAppSelector } from '../../app/hooks';
import Boards from './Boards';

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
        <Typography component="h2" variant="h4">
          Sign in is required
        </Typography>
        <Link component={NavLink} to="/" variant="body1">
          Home page
        </Link>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          paddingTop: '120px',
          paddingBottom: '20px',
          minHeight: 'calc(100vh - 50px)',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Boards />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
