import { Container, Box, Link, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import Boards from '../../app/components/Board/Boards';

export default function MainPage() {
  const { t } = useTranslation('main');

  if (!localStorage.getItem('token')) {
    return (
      <Box className="app" sx={{ bgcolor: 'background.default' }}>
        <Container
          sx={{
            minHeight: 'calc(100vh - 78px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Typography padding={1} component="h2" variant="h3">
              Access denied
            </Typography>
            <Typography padding={1} component="h2" variant="h4">
              Sign in is required
            </Typography>
            <Link component={NavLink} to="/" variant="body1">
              Home page
            </Link>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box className="app" sx={{ bgcolor: 'background.default' }}>
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: 15,
            paddingBottom: 3,
            minHeight: 'calc(100vh - 78px)',
          }}
        >
          <Link component={NavLink} to="/" underline="none">
            <Button startIcon={<HomeIcon />} variant="contained">
              {t('home')}
            </Button>
          </Link>

          <Boards />
        </Container>
      </Box>
    </>
  );
}
