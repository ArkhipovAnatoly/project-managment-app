import { useState, useEffect, useCallback, ChangeEvent, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import headerTheme from '../../theme/Theme';
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

const scrollThreshold = 40;

export default function Header() {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('En');
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { showModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const { setUserAuthData } = userAuthSlice.actions;
  const navigator = useNavigate();

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
  };
  const createBoard = () => {
    handleCloseNavMenu();
  };

  const pages = [
    {
      title: 'Create New Board',
      handler: createBoard,
    },
    {
      title: 'Edit profile',
      handler: openModal,
    },
    {
      title: 'Log Out',
      handler: signOutHandle,
    },
    {
      title: `Language: ${language}`,
      handler: changeLanguage,
    },
  ];

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
                  {pages.map((page, i) => (
                    <MenuItem key={i} onClick={page.handler}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  ))}
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
                  Create new board
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<ModeEditIcon />}
                  onClick={openModal}
                >
                  Edit profile
                </Button>

                <Button
                  onClick={signOutHandle}
                  variant="contained"
                  color="info"
                  endIcon={<LogoutIcon />}
                >
                  Sign Out
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
