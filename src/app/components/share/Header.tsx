import { useState, useEffect, useCallback, ChangeEvent, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { headerTheme } from '../../theme/Theme';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import { modalSlice } from '../../store/reducers/ModalSlice';
import { useAppDispatch } from '../../hooks';
import EditUser from '../modal/EditUser';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Container,
  Stack,
  ThemeProvider,
  Toolbar,
  AppBar,
  Link,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
const scrollThreshold = 40;

export default function Header() {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('En');
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { showModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const { setUserAuthData } = userAuthSlice.actions;
  const navigator = useNavigate();
  const { t, i18n } = useTranslation('header');

  const scrollHandle = useCallback(() => {
    window.scrollY > scrollThreshold ? setIsScroll(true) : setIsScroll(false);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandle);

    return () => {
      document.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

  const changeHandle = (e: ChangeEvent) => {
    handleCloseNavMenu();
    const { checked } = e.target as HTMLInputElement;
    checked ? setLanguage('Ru') : setLanguage('En');
    checked ? i18n.changeLanguage('Ru') : i18n.changeLanguage('En');
  };

  const openModal = () => {
    handleCloseNavMenu();
    dispatch(showModal(true));
  };

  const signOutHandle = () => {
    handleCloseNavMenu();
    localStorage.removeItem('token');
    dispatch(setUserAuthData({ token: '', isAuth: false }));
    navigator('/');
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeLanguage = () => {
    language === 'En' ? setLanguage('Ru') : setLanguage('En');
    language === 'En' ? i18n.changeLanguage('Ru') : i18n.changeLanguage('En');
  };
  const createBoard = () => {
    handleCloseNavMenu();
  };

  return (
    <>
      <ThemeProvider theme={headerTheme}>
        <AppBar
          position="fixed"
          color={isScroll ? 'appBarColorScroll' : 'appBarColor'}
          sx={{
            backdropFilter: 'blur(5px)',
            transition: 'background-color 1s',
            boxShadow: isScroll
              ? '0px 2px 4px -1px rgb(0, 0, 0 / 20%) ,0px 4px 5px 0px rgb(0, 0 ,0 / 14%), 0px 1px 10px 0px rgb(0, 0 ,0 / 12%)'
              : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignTtems: 'center',
              }}
              variant="dense"
            >
              <Typography component="h1" variant="h6">
                <Link component={NavLink} underline="none" color="#fff" to="/">
                  TEMPER
                </Link>
              </Typography>

              <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    display: { md: 'none', xs: 'block' },
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  <MenuItem onClick={createBoard}>
                    <Typography textAlign="center">{t('newBoard')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={openModal}>
                    <Typography textAlign="center">{t('profile')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={changeLanguage}>
                    <Typography textAlign="center">
                      {t('lng')}: {language}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={signOutHandle}>
                    <Typography textAlign="center">{t('out')}</Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Stack direction="row" spacing={3} sx={{ display: { md: 'flex', xs: 'none' } }}>
                <FormControlLabel
                  control={<Switch onChange={changeHandle} color="primary" />}
                  label={language}
                  labelPlacement="end"
                />
                <Button
                  onClick={createBoard}
                  variant="contained"
                  color="warning"
                  startIcon={<AddBoxIcon />}
                >
                  {t('newBoard')}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<ModeEditIcon />}
                  onClick={openModal}
                >
                  {t('profile')}
                </Button>

                <Button
                  onClick={signOutHandle}
                  variant="contained"
                  color="info"
                  endIcon={<LogoutIcon />}
                >
                  {t('out')}
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <EditUser />
    </>
  );
}
