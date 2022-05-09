import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
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
    minWidth: '95%',
    maxWidth: '200px',
    height: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    cursor: 'pointer',
    margin: 5,
    display: 'flex',
    flexWrap: 'wrap',
  },
  columnTaskTitle: {
    flex: 1,
  },
  task: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
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
});

function BoardColumns() {
  const classes = useStyles();
  const { dataBoardsPage } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

  const openModalWindowAddTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
  };

  const openModalWindowDeleteTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
  };

  const openModalWindowEditTask = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    const currentIndexTask = String(targetButtonModal?.dataset.taskindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
    dispatch(reducers.changeIndexOfCurrentTask(currentIndexTask));
    dispatch(reducers.changeTitleOfCurrentTask());
  };

  const openModalWindowDeleteColumn = (targetButtonModal: HTMLElement) => {
    const currentIndexColumn = String(targetButtonModal?.dataset.columnindex);
    dispatch(reducers.changeIndexOfCurrentColumn(currentIndexColumn));
  };

  const handleModalWindow = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const targetButtonModal = target.closest('.buttonModal') as HTMLElement;
    const nameForModalWindow = String(targetButtonModal?.dataset.modalname);
    dispatch(reducers.openModalWindow(true));
    dispatch(reducers.addNameForModalWindow(nameForModalWindow));

    switch (nameForModalWindow) {
      case 'addTask':
        openModalWindowAddTask(targetButtonModal);
        break;

      case 'deleteTask':
        openModalWindowDeleteTask(targetButtonModal);
        break;

      case 'editTask':
        openModalWindowEditTask(targetButtonModal);
        break;

      case 'deleteColumn':
        openModalWindowDeleteColumn(targetButtonModal);
        break;
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
                      <Box className={classes.columnTaskTitle}>
                        <Typography variant="subtitle1" gutterBottom pl={2}>
                          {tasks.taskTittle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" pl={2}>
                          {tasks.taskOption}
                        </Typography>
                      </Box>
                      <Box className={classes.task}>
                        <Box
                          className="buttonModal"
                          data-modalname="deleteTask"
                          data-columnindex={indexColumn}
                          data-taskindex={indexTask}
                          onClick={handleModalWindow}
                        >
                          <Button color="secondary">
                            <ClearIcon fontSize="small" color="action" />
                          </Button>
                        </Box>
                        <Box
                          className="buttonModal"
                          data-modalname="editTask"
                          data-columnindex={indexColumn}
                          data-taskindex={indexTask}
                          onClick={handleModalWindow}
                        >
                          <Button color="secondary">
                            <CreateIcon fontSize="small" color="action" />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
              <Box className={classes.columnSettings}>
                <Box
                  data-modalname="addTask"
                  data-columnindex={indexColumn}
                  onClick={handleModalWindow}
                  className={`${classes.columnAdd} buttonModal`}
                >
                  <AddIcon color="action" />
                  <Typography color="text.secondary">Add task</Typography>
                </Box>
                <Box
                  className={`buttonModal`}
                  data-modalname="deleteColumn"
                  data-columnindex={indexColumn}
                >
                  <Tooltip title="Delete Column" onClick={handleModalWindow}>
                    <IconButton>
                      <DeleteIcon color="action" />
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
          data-modalname="addColumn"
          className={`${classes.columnAddOptions} buttonModal`}
          onClick={handleModalWindow}
        >
          <Box className={classes.columnAddOptionsText}>
            <AddIcon color={'action'} />
            <Typography color="text.secondary">Add new column</Typography>
          </Box>
        </Box>
      </Box>
      <ModalWindow />
    </Box>
  );
}
export default BoardColumns;