import { Container, Card, Box, Link, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';

export default function MainPage() {
  if (!localStorage.getItem('token')) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          minHeight: 'calc(100vh - 50px)',
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
        <Card
          sx={{
            width: '275px',
            height: '80px',
            textAlign: 'center',
            padding: '22px 0',
            backgroundColor: '#ebecf0b8',
          }}
        >
          <Box
            component="span"
            sx={{
              p: 2,
              border: '1px dashed grey',
            }}
          >
            <Button
            // onClick={handleModal}
            >
              Add board
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
