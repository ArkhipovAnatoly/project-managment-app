import {
  Container,
  Box,
  Link,
  Typography,
  Button,
  InputBase,
  Paper,
  IconButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import Boards from '../../app/components/Board/Boards';

export default function MainPage() {
  const { t } = useTranslation('main');

  const search = () => {
    console.log('search');
  };

  if (!localStorage.getItem('token')) {
    return (
      <Box className="app" sx={{ bgcolor: 'background.default' }}>
        <Container
          sx={{
            minHeight: 'calc(100vh - 58px)',
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
            paddingTop: '80px',
            paddingBottom: '20px',
            minHeight: 'calc(100vh - 58px)',
          }}
        >
          <Box
            sx={{
              m: '20px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              rowGap: '10px',
            }}
          >
            <Link component={NavLink} to="/" underline="none">
              <Button color="primary" startIcon={<HomeIcon />} variant="contained">
                {t('home')}
              </Button>
            </Link>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '265px',
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
              <IconButton
                // type="submit"
                sx={{ p: '10px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Boards />
          </Box>
        </Container>
      </Box>
    </>
  );
}
