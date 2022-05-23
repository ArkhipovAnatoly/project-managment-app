import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceMainPage } from '../../app/store/reducers/useSliceMainPage';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import ModalWindowMain from './ModalWindowMain';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  boards: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '100%',
    padding: 0,
  },
  board: {
    minWidth: 265,
    maxHeight: '100%',
    maxWidth: 'fit-content',
    backgroundClip: 'content-box',
    margin: '10px',
    listStyle: 'none',
  },
  boardOptions: {
    backgroundColor: '#ebecf0',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60vh',
    position: 'relative',
    whiteSpace: 'normal',
    width: '100%',
  },
  boardAddOptions: {
    backgroundColor: '#ebecf0b8',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '50vh',
    minHeight: '50px',
    position: 'relative',
    whiteSpace: 'normal',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
  boardAddOptionsText: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  boardTitle: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 3,
    cursor: 'pointer',
  },
  columnBoards: {
    padding: 2,
  },
  columnBoard: {
    minWidth: '100%',
    maxWidth: '200px',
    height: 'auto',
    borderRadius: 3,
    cursor: 'pointer',
  },
  columnSettings: {
    margin: 5,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnAdd: {
    margin: 5,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    minWidth: '50%',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
  buttonsSetting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f7f7f8',
    borderRadius: 3,
  },
});

export default function Boards() {
  const classes = useStyles();
  const { dataMainPage } = useAppSelector((state) => state.mainPage);
  const reducers = useSliceMainPage.actions;
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const openModalWindowAddBoard = (targetButtonModal: HTMLElement) => {
    const currentIndexBoard = String(targetButtonModal?.dataset.boardindex);
    dispatch(reducers.changeIndexOfCurrentBoard(currentIndexBoard));
  };

  const openModalWindowDeleteBoard = (targetButtonModal: HTMLElement) => {
    const currentIndexBoard = String(targetButtonModal?.dataset.boardindex);
    dispatch(reducers.changeIndexOfCurrentBoard(currentIndexBoard));
  };

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetButtonModal = target.closest('.buttonModal') as HTMLElement;
    const nameForModalWindow = String(targetButtonModal?.dataset.modalname);
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));

    switch (nameForModalWindow) {
      case 'addBoard':
        openModalWindowAddBoard(targetButtonModal);
        break;

      case 'deleteBoard':
        openModalWindowDeleteBoard(targetButtonModal);
        break;
    }
  };

  return (
    <Box className={classes.boards}>
      {dataMainPage.map((board, indexBoard) => {
        return (
          <Box className={classes.board} key={`${board.tittle} ${indexBoard}`}>
            <Box className={classes.boardOptions}>
              <Box
                className={`${classes.boardTitle} boxForTitle`}
                data-boardindex={indexBoard}
                data-onopen={board.tittle}
                data-onclose={board.tittle}
              >
                Board
                <Paper
                  key={`${board.tittle} ${indexBoard}`}
                  className={classes.columnBoard}
                  elevation={3}
                >
                  <Accordion elevation={0}>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                      <Typography>{board.tittle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {board.boardDescription}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
                <Button
                  className={'buttonApply'}
                  variant="contained"
                  size="small"
                  startIcon={<SendIcon />}
                  sx={{ mt: '2px', display: 'none' }}
                ></Button>
                <Button
                  className={'buttonCancel'}
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon sx={{ color: 'common.black' }} />}
                  sx={{ mb: '2px', mt: '4px', display: 'none' }}
                ></Button>
              </Box>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className={classes.columnBoards}
              />
              <Box className={classes.buttonsSetting}>
                <Box
                  className="buttonModal"
                  data-modalname="deleteBoard"
                  data-boardindex={indexBoard}
                  onClick={handleModalWindow}
                >
                  <Button color="secondary">
                    <DeleteIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'common.black' : 'action.active',
                      }}
                    />
                  </Button>
                </Box>
                <Link component={NavLink} underline="none" color="#397c42" to="/board">
                  Open board
                </Link>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box className={classes.board}>
        <Box
          data-modalname="addBoard"
          className={`${classes.boardAddOptions} buttonModal`}
          onClick={handleModalWindow}
        >
          <Box className={classes.boardAddOptionsText}>
            <AddIcon color={'action'} />
            <Typography color="text.secondary">Add new board</Typography>
          </Box>
        </Box>
      </Box>
      <ModalWindowMain />
    </Box>
  );
}
