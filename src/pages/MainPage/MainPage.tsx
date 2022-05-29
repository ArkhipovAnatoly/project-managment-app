import { Container, Box, Link, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import Boards from '../../app/components/Board/Boards';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function MainPage() {
  const { t } = useTranslation('main');
  const [searchTitle, setSearchTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setSearchTitle(target.value as string);
  };

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

          <Paper
            component="form"
            sx={{ p: '2px 4px', mt: '10px', display: 'flex', alignItems: 'center', maxWidth: 280 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('search')}
              value={searchTitle}
              onChange={handleInputChange}
            />
            <SearchIcon />
          </Paper>

          <Boards searchTitle={searchTitle} />
        </Container>
      </Box>
    </>
  );
}
