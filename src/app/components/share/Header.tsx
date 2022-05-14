import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Stack, ThemeProvider, Toolbar, AppBar, Link, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import headerTheme from '../../theme/Theme';
import CustomizedButtons from '../Button/CustomizedButtons';

const scrollThreshold = 40;

export default function Header() {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const scrollHandle = useCallback(() => {
    window.scrollY > scrollThreshold ? setIsScroll(true) : setIsScroll(false);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandle);

    return () => {
      document.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

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

              <Stack
                component="ul"
                padding={0}
                direction="row"
                divider={<Divider sx={{ borderColor: '#fff' }} orientation="vertical" flexItem />}
              >
                <CustomizedButtons />
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
