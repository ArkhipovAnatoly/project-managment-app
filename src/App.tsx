import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/homePage';
import BoardsPage from './pages/BoardsPage/BoardsPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

{
  /* <Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
</Box>
<Autocomplete
disablePortal
id="combo-box-demo"
options={top100Films}
sx={{ width: 300 }}
renderInput={(params) => <TextField {...params} label="Movie" />}
/>
<Stack direction="row" spacing={2}>
<Button variant="contained">Primary</Button>
<Button variant="contained" disabled>
  Disabled
</Button>
<Button variant="contained" href="#text-buttons">
  Link
</Button>
</Stack>
<IconButton aria-label="delete">
<DeleteIcon />
</IconButton>
<Stack direction="row" spacing={2}>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
</Stack>
<Stack spacing={1}>
<Skeleton variant="text" />
<Skeleton variant="text" />
<Skeleton variant="text" />
<Skeleton variant="rectangular" width={210} height={118} />
<Skeleton variant="circular" width={40} height={40} />
</Stack>
<div>
<Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography>Accordion 1</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
      ex, sit amet blandit leo lobortis eget.
    </Typography>
  </AccordionDetails>
</Accordion>
<Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel2a-content"
    id="panel2a-header"
  >
    <Typography>Accordion 2</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
      ex, sit amet blandit leo lobortis eget.
    </Typography>
  </AccordionDetails>
</Accordion>
<Accordion disabled>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel3a-content"
    id="panel3a-header"
  >
    <Typography>Disabled Accordion</Typography>
  </AccordionSummary>
</Accordion> 
</div> */
}
