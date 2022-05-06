import Typography from '@mui/material/Typography';
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
import appTheme from '../../theme/Theme';
import { NavLink } from 'react-router-dom';

const Item = styled('li')(() => ({
  listStyle: 'none',
  cursor: 'pointer',
  '&>a': { padding: '5px 15px', color: '#fff' },
  '&>a:hover': { color: alpha(appTheme.palette.common.white, 0.7), transition: 'color 0.6s' },
}));

export default function Header() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <AppBar position="static" color="appBarColor">
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
      </ThemeProvider>
    </>
  );
}
