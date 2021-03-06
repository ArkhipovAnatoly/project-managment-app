import { useState, useEffect, useCallback, ChangeEvent, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../../hooks';

import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import {
  Container,
  Stack,
  Toolbar,
  AppBar,
  Link,
  Button,
  FormControlLabel,
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

import { alpha, useTheme } from '@mui/material/styles';
import { blue } from '@material-ui/core/colors';
import { createBoardModalSlice } from '../../store/reducers/CreateBoardModalSlice';
import CreateBoardModal from '../modal/CreateBoardModal';
import ColorSwitch from '../Switch/ColorSwitch';

const scrollThreshold = 40;

export default function Header() {
  const [checked, setChecked] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { setUserAuthData } = userAuthSlice.actions;
  const { showCreateBoardModal } = createBoardModalSlice.actions;
  const theme = useTheme();
  const { t, i18n } = useTranslation('header');
  const navigator = useNavigate();
  const scrollHandle = useCallback(() => {
    window.scrollY > scrollThreshold ? setIsScroll(true) : setIsScroll(false);
  }, []);

  useEffect(() => {
    if (i18n.resolvedLanguage === 'Ru') {
      setChecked(true);
    }
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandle);

    return () => {
      document.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

  const changeLanguageHandle = (event: ChangeEvent<HTMLInputElement>) => {
    handleCloseNavMenu();
    const { checked } = event.target as HTMLInputElement;
    setChecked(event.target.checked);
    checked ? i18n.changeLanguage('Ru') : i18n.changeLanguage('En');
  };

  const editProfile = () => {
    handleCloseNavMenu();
    navigator('/edit');
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
    i18n.resolvedLanguage === 'En'
      ? (i18n.changeLanguage('Ru'), setChecked(true))
      : (i18n.changeLanguage('En'), setChecked(false));
  };
  const createBoard = () => {
    handleCloseNavMenu();
    dispatch(showCreateBoardModal(true));
  };

  const editLink = () => {
    handleCloseNavMenu();
    navigator('/edit');
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: isScroll
            ? `${alpha(theme.palette.mode === 'dark' ? '#151719' : '#fff', 0.6)}`
            : 'background.default',
          backgroundImage: 'none',
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
            <Typography component="h1" variant="h5">
              <Link component={NavLink} underline="none" color={'text.primary'} to="/">
                TEMPER
              </Link>
            </Typography>
            <Box
              sx={{
                display: { md: 'none', xs: 'flex' },
                color: theme.palette.mode === 'dark' ? 'common.white' : 'common.black',
              }}
            >
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
                id="account-menu"
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
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem onClick={createBoard}>
                  <ListItemIcon>
                    <AddIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <Typography>{t('newBoard')}</Typography>
                </MenuItem>
                <MenuItem onClick={editLink}>
                  <ListItemIcon>
                    <EditIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <Typography>{t('profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={changeLanguage}>
                  <ListItemIcon>
                    <LanguageIcon color="warning" fontSize="small" />
                  </ListItemIcon>
                  <Typography>
                    {t('lng')}: {i18n.resolvedLanguage}
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={signOutHandle}>
                  <ListItemIcon>
                    <Logout color="warning" fontSize="small" />
                  </ListItemIcon>
                  <Typography> {t('out')}</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Stack direction="row" spacing={3} sx={{ display: { md: 'flex', xs: 'none' } }}>
              <FormControlLabel
                control={
                  <ColorSwitch
                    checked={checked}
                    onChange={changeLanguageHandle}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={i18n.resolvedLanguage}
                labelPlacement="end"
                sx={{ color: blue[600] }}
              />
              <Button
                onClick={createBoard}
                variant="contained"
                color="warning"
                startIcon={<AddBoxIcon />}
              >
                {t('newBoard')}
              </Button>
              <Button variant="contained" endIcon={<ModeEditIcon />} onClick={editProfile}>
                {t('profile')}
              </Button>

              <Button onClick={signOutHandle} variant="contained" endIcon={<LogoutIcon />}>
                {t('out')}
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <CreateBoardModal />
    </>
  );
}
