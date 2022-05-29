import { Button, Paper, Typography } from '@mui/material';
import BoardColumns from './BoardColumns/BoardColumns';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Header from '../../app/components/share/Header';
import { useTranslation } from 'react-i18next';
import { boardAPI } from '../.././services/BoardService';
import ConfirmModal from '../../app/components/modal/ConfirmModal';
import { useAppSelector } from '../../app/hooks';

const useStyles = makeStyles({
  container: {
    margin: '0 auto',
    maxWidth: 1200,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px',
    paddingBottom: '10px',
    minHeight: 'calc(100vh - 78px)',
    overflowY: 'hidden',
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
  projectName: {
    margin: '10px',
    padding: '6px 9px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '170px',
    cursor: 'pointer',
  },
});

function BoardsPage() {
  const classes = useStyles();
  const { t } = useTranslation(['boardsPage', 'modalWindowBoardsPage']);
  const { data: currentBoard } = boardAPI.useGetBoardQuery(`${localStorage.getItem('idBoard')}`);
  const { what } = useAppSelector((state) => state.confirmModalReducer);

  return (
    <>
      <Box className="app" sx={{ bgcolor: 'background.default' }}>
        <Header />
        <Box className={classes.container}>
          <Box className={classes.content}>
            <Box sx={{ display: 'flex', alignItems: 'center', m: '20px 0 10px 0' }}>
              <Box className={classes.header}>
                <NavLink to="/main" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">{t('boardsPage:onMainPage')}</Button>
                </NavLink>
              </Box>
              <Paper component="form" className={classes.projectName}>
                <Typography>{currentBoard?.title}</Typography>
              </Paper>
            </Box>
            <BoardColumns currentBoard={currentBoard} />
          </Box>
        </Box>
      </Box>
      {what === 'column' && (
        <ConfirmModal
          title={`${t('modalWindowBoardsPage:deleteColumnQuest')}`}
          subtitle={`${t('modalWindowBoardsPage:deleteColumnText')}`}
          type="column"
        />
      )}
      {what === 'task' && (
        <ConfirmModal
          title={`${t('modalWindowBoardsPage:deleteTaskQuest')}`}
          subtitle={`${t('modalWindowBoardsPage:deleteTaskText')}`}
          type="task"
        />
      )}
    </>
  );
}
export default BoardsPage;
