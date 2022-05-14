import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/store/reducers/useSliceBoardsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  InputBase,
} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import ModalWindow from './ModalWindow';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';

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
    maxWidth: 'fit-content',
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
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 3,
    cursor: 'pointer',
  },
  columnTasks: {
    padding: 2,
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
    justifyContent: 'space-between',
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
  const showAllSettingsColumnTitle = (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;

    const target = event.target as HTMLElement;
    buttonsForTitle.style.display = 'block';
    inputTitleChange.style.display = 'block';
    target.style.display = 'none';
    const inputForTitleColumn = inputTitleChange.querySelector('input') as HTMLInputElement;
    inputForTitleColumn.focus();
  };

  const onFocusButtonColumnTitle = (event: React.FocusEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText');
    mainBox.dataset.onopen = '';
    mainBox.dataset.onclose = someBoardTitleText?.textContent as string;
  };

  const onBlurButtonColumnTitle = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.value = ``;
  };

  const onChangeButtonColumnTitle = (event: React.ChangeEvent) => {
    const mainBox = (event.target as HTMLInputElement).closest('.boxForTitleColumn') as HTMLElement;
    mainBox.dataset.onopen = (event.target as HTMLInputElement).value;
  };

  const buttonApplyColumnTitle = (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText') as HTMLElement;
    if ((mainBox.dataset.onopen as string) !== '') {
      buttonsForTitle.style.display = 'none';
      inputTitleChange.style.display = 'none';
      someBoardTitleText.style.display = 'block';
      dispatch(
        reducers.changeTitleOfCurrentColumn({
          indexColumn: mainBox.dataset.columnindex as string,
          columnTittle: mainBox.dataset.onopen as string,
        })
      );
    }
  };
  const buttonCloseColumnTitle = (event: React.MouseEvent) => {
    const mainBox = (event.target as HTMLElement).closest('.boxForTitleColumn') as HTMLElement;
    const buttonsForTitle = mainBox.querySelector('.buttonsForTitle') as HTMLElement;
    const inputTitleChange = mainBox.querySelector('.inputTitleChange') as HTMLElement;
    const someBoardTitleText = mainBox.querySelector('.someBoardTitleText') as HTMLElement;
    buttonsForTitle.style.display = 'none';
    inputTitleChange.style.display = 'none';
    someBoardTitleText.style.display = 'block';
    dispatch(
      reducers.changeTitleOfCurrentColumn({
        indexColumn: mainBox.dataset.columnindex as string,
        columnTittle: mainBox.dataset.onclose as string,
      })
    );
  };

  return (
    <Box className={classes.columns}>
      {dataBoardsPage.map((column, indexColumn) => {
        return (
          <Box className={classes.column} key={`${column.tittle} ${indexColumn}`}>
            <Box className={classes.columnOptions}>
              <Box
                className={`${classes.columnTitle} boxForTitleColumn`}
                data-columnindex={indexColumn}
                data-onopen={column.tittle}
                data-onclose={column.tittle}
              >
                <Typography className={'someBoardTitleText'} onClick={showAllSettingsColumnTitle}>
                  {column.tittle}
                </Typography>
                <Paper
                  className={'inputTitleChange'}
                  sx={{ mb: '2px', mt: '4px', display: 'none' }}
                >
                  <InputBase
                    onFocus={onFocusButtonColumnTitle}
                    onBlur={onBlurButtonColumnTitle}
                    onChange={onChangeButtonColumnTitle}
                  />
                </Paper>
                <Stack
                  className={'buttonsForTitle'}
                  sx={{ mt: '4px', display: 'none' }}
                  spacing={1}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Button
                    onClick={buttonApplyColumnTitle}
                    className={'buttonApply'}
                    variant="contained"
                    size="small"
                    startIcon={<SendIcon />}
                  ></Button>
                  <Button
                    onClick={buttonCloseColumnTitle}
                    className={'buttonCancel'}
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Stack>
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
                    <Paper
                      key={`${tasks.taskTittle} ${indexTask}`}
                      className={classes.columnTask}
                      elevation={3}
                    >
                      <Box className={classes.buttonsSetting}>
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
                      <Accordion elevation={0}>
                        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                          <Typography>{tasks.taskTittle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" color="text.secondary">
                            {tasks.taskOption}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Paper>
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
