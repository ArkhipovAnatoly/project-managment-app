import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ModalWindow from './ModalWindow';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

const useStyles = makeStyles({
  columns: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    maxHeight: '100%',
    padding: 0,
    '&::-webkit-scrollbar': {
      backgroundColor: '#dadada',
      height: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e3e3e3',
      height: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#bbbbbb',
      height: 7,
      borderRadius: 5,
    },
  },
  column: {
    minWidth: 265,
    maxHeight: '100%',
    backgroundClip: 'content-box',
    margin: '10px',
    listStyle: 'none',
  },
  columnOptions: {
    backgroundColor: '#ebecf0',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60vh',
    position: 'relative',
    whiteSpace: 'normal',
    width: '100%',
  },
  columnAddOptions: {
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
  columnAddOptionsText: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: '#5e6c84',
  },
  columnTitle: {
    margin: 5,
    padding: 3,
    cursor: 'pointer',
  },
  columnTasks: {
    overflowX: 'auto',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      backgroundColor: '#dadada',
      width: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e3e3e3',
      width: 7,
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#bbbbbb',
      width: 7,
      borderRadius: 5,
    },
  },
  columnTask: {
    position: 'relative',
    minWidth: '95%',
    maxWidth: '200px',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    cursor: 'pointer',
    margin: 5,
    display: 'flex',
    flexWrap: 'wrap',
  },
  deleteTask: {
    position: 'absolute',
    left: '90%',
    zIndex: 1000,
  },
  editTask: {
    position: 'absolute',
    top: '55%',
    left: '90%',
    zIndex: 1000,
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
    color: '#5e6c84',
    minWidth: '50%',
    '&:hover': {
      backgroundColor: '#c2c2c28f',
      borderRadius: 3,
      cursor: 'pointer',
    },
  },
});

function BoardColumns() {
  const classes = useStyles();

  const { dataBoardsPage } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const nameForModalWindow = String(
      (target.closest('#buttonModal') as HTMLElement)?.dataset.modalname
    );
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));

    if (nameForModalWindow === 'addTask') {
      const currentIndexColumn = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.columnindex
      );
      dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    }

    if (nameForModalWindow === 'deleteTask') {
      const currentIndexColumn = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.columnindex
      );
      const currentIndexTask = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.taskindex
      );

      dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
      dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
    }

    if (nameForModalWindow === 'editTask') {
      const currentIndexColumn = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.columnindex
      );
      const currentIndexTask = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.taskindex
      );

      dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
      dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
      dispatch(reducers.changeTitleOfCurrentTask());
    }

    if (nameForModalWindow === 'deleteColumn') {
      const currentIndexColumn = String(
        (target.closest('#buttonModal') as HTMLElement)?.dataset.columnindex
      );
      dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    }
  };

  return (
    <Box className={classes.columns}>
      {dataBoardsPage.map((column, indexColumn) => {
        return (
          <Box className={classes.column} key={`${column.tittle} ${indexColumn}`}>
            <Box className={classes.columnOptions}>
              <Box className={classes.columnTitle}>
                <Typography>{column.tittle}</Typography>
              </Box>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className={classes.columnTasks}
              >
                {column.tasks?.map((tasks, indexTask) => {
                  return (
                    <Box className={classes.columnTask} key={`${tasks.taskTittle} ${indexTask}`}>
                      <Box
                        className={classes.deleteTask}
                        data-modalname="deleteTask"
                        data-columnindex={indexColumn}
                        data-taskindex={indexTask}
                        id="buttonModal"
                        onClick={handleModalWindow}
                      >
                        <ClearIcon fontSize="small" color="action" />
                      </Box>
                      <Box
                        className={classes.editTask}
                        data-modalname="editTask"
                        data-columnindex={indexColumn}
                        data-taskindex={indexTask}
                        id="buttonModal"
                        onClick={handleModalWindow}
                      >
                        <CreateIcon fontSize="small" color="action" />
                      </Box>
                      <CardActionArea>
                        <Typography gutterBottom variant="h5">
                          {tasks.taskTittle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tasks.taskOption}
                        </Typography>
                      </CardActionArea>
                    </Box>
                  );
                })}
              </Stack>
              <Box className={classes.columnSettings}>
                <Box
                  className={classes.columnAdd}
                  data-modalname="addTask"
                  data-columnindex={indexColumn}
                  onClick={handleModalWindow}
                  id="buttonModal"
                >
                  <AddIcon /> <Typography>Add task</Typography>
                </Box>
                <Box id="buttonModal" data-modalname="deleteColumn" data-columnindex={indexColumn}>
                  <Tooltip title="Delete Column" onClick={handleModalWindow}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box className={classes.column}>
        <Box
          className={classes.columnAddOptions}
          data-modalname="addColumn"
          id="buttonModal"
          onClick={handleModalWindow}
        >
          <Box className={classes.columnAddOptionsText}>
            <AddIcon /> <Typography>Add new column</Typography>
          </Box>
        </Box>
      </Box>
      <ModalWindow />
    </Box>
  );
}
export default BoardColumns;
