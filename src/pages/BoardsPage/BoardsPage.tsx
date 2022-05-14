import { Button, InputBase, Paper, TextField, Typography } from '@mui/material';
import { createRef, useEffect, useState } from 'react';
import BoardColumns from './BoardColumns/BoardColumns';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  inputSwap: {
    margin: '0 40px',
    color: '#000',
    cursor: 'pointer',
    textAlign: 'center',
    outline: 0,
    border: 0,
    padding: '0 12px',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: '#d6eeee',
      transition: 'all 0.2s',
    },
  },

  inputSwapFalse: {
    margin: '0 40px',
    width: '100%',
    color: '#000',
    cursor: 'pointer',
    textAlign: 'center',
    outline: 0,
    border: 0,
    padding: '0 12px',
  },

  content: {
    display: 'flex',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
});

function BoardsPage() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.header} sx={{ m: '20px 10px' }}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Main Page</Button>
        </NavLink>
      </Box>
      <Paper
        component="form"
        sx={{
          m: '20px 10px 10px 10px',
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '265px',
        }}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} defaultValue="My Project Name" />
      </Paper>
      <Box className={classes.content}>
        <BoardColumns></BoardColumns>
      </Box>
    </Box>
  );
}
export default BoardsPage;
