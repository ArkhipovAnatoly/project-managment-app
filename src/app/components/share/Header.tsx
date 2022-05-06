import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
  AppBar,
  styled,
  Link,
  Divider,
  alpha,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import headerTheme from '../../theme/Theme';

const Item = styled('li')(() => ({
  listStyle: 'none',
  cursor: 'pointer',
  '&>a': { padding: '5px 15px', color: '#fff' },
  '&>a:hover': { color: alpha(headerTheme.palette.common.white, 0.7), transition: 'color 0.6s' },
}));

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
      <CssBaseline />
      <ThemeProvider theme={headerTheme}>
        <AppBar
          position="fixed"
          color={isScroll ? 'appBarColorScroll' : 'appBarColor'}
          sx={{
            backdropFilter: 'blur(5px)',
            transition: 'background-color 1s',
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
                TEMPER
              </Typography>

              <Stack
                component="ul"
                padding={0}
                direction="row"
                divider={<Divider sx={{ borderColor: '#fff' }} orientation="vertical" flexItem />}
              >
                <Item>
                  <Link component={NavLink} to="/signin" underline="hover">
                    SIGN IN
                  </Link>
                </Item>
                <Item>
                  <Link component={NavLink} to="/signup" underline="hover">
                    SIGN UP
                  </Link>
                </Item>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
        <p style={{ marginTop: '200px' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In vero, autem voluptatem quod
          laborum dicta accusantium sequi nobis neque? Distinctio, blanditiis! Blanditiis similique
          natus nisi, labore facere illo velit commodi.
        </p>
      </ThemeProvider>
    </>
  );
}
