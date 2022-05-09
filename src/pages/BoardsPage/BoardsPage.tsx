import { Button, Typography } from '@mui/material';
import { createRef, useEffect, useState } from 'react';
import BoardColumns from './BoardColumns';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100%',
    margin: 20,
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

  const [count, setCount] = useState(true);
  const [text, setText] = useState('My Project');
  const [prevText, setPrevText] = useState('My Project');

  useEffect(() => {
    inputSearch?.current?.focus();
  }, [count]);

  const inputSearch = createRef<HTMLInputElement>();

  function handle(еvent: React.MouseEvent) {
    const target = еvent.target as HTMLElement;
    console.log(target);
    setCount(false);
  }

  function onInputBlur(event: React.FocusEvent) {
    setCount(true);
  }

  function setNewText(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    if ((target as HTMLInputElement).value) {
      setText((target as HTMLInputElement).value);
    } else {
      setText(prevText);
    }
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <NavLink to="/main" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Main Page</Button>
        </NavLink>
        <Box>
          {count ? (
            <Box className={classes.inputSwap} onClick={handle}>
              <Typography>{text}</Typography>
            </Box>
          ) : (
            <input
              type="text"
              className={classes.inputSwapFalse}
              onBlur={onInputBlur}
              onChange={setNewText}
              ref={inputSearch}
              defaultValue={text}
            />
          )}
        </Box>
      </Box>
      <Box className={classes.content}>
        <BoardColumns></BoardColumns>
      </Box>
    </Box>
  );
}
export default BoardsPage;
