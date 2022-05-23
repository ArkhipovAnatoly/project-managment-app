import { Button, InputBase, Paper } from '@mui/material';
import BoardColumns from './BoardColumns/BoardColumns';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  container: {
    margin: '0 auto',
    maxWidth: 1200,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px',
    paddingBottom: '10px',
    minHeight: 'calc(100vh - 52px)',
    overflowY: 'hidden',
    // ['@media (max-width:800px)']: { paddingTop: '1000px' },
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
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
  },
  projectNameInput: {
    margin: '10px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '170px',
  },
});

function BoardsPage() {
  const classes = useStyles();
  const { t, i18n } = useTranslation('boardsPage');

  return (
    <Box>
      <Header />
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Box sx={{ display: 'flex', alignItems: 'center', m: '20px 0 10px 0' }}>
            <Box className={classes.header}>
              <NavLink to="/main" style={{ textDecoration: 'none' }}>
                <Button variant="contained">{t('onMainPage')}</Button>
              </NavLink>
            </Box>
            <Paper component="form" className={classes.projectNameInput}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                defaultValue="My Project Name"
                inputProps={{ maxLength: 15 }}
              />
            </Paper>
          </Box>
          <BoardColumns></BoardColumns>
        </Box>
      </Box>
    </Box>
  );
}
export default BoardsPage;
