import { Backdrop, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/store/reducers/useSliceBoardsPage';
import { useTranslation } from 'react-i18next';
import { boardAPI } from '../.././services/BoardService';
import { CurrentBoardProps, task } from '../.././types';

const useStyles = makeStyles({
  firstModalWindowForNewColumn: {
    minWidth: 300,
    maxWidth: 800,
    width: '70%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10,
    outline: 'none',
  },
  secondModalWindowForNewColumn: {
    width: '80%',
    height: '60%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
  firstModalWindowForTask: {
    minWidth: 300,
    maxWidth: 800,
    minHeight: 450,
    width: '70%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'paper',
    borderRadius: 10,
    outline: 'none',
  },
  secondModalWindowForTask: {
    width: '80%',
    height: '65%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
});

function ModalWindow(props: CurrentBoardProps) {
  const classes = useStyles();
  const { t } = useTranslation('modalWindowBoardsPage');
  const { currentBoard } = props;
  const { nameModalWindow } = useAppSelector((state) => state.boardsPage);
  const { valueForTitleToSaveCheckbox } = useAppSelector((state) => state.boardsPage);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const { openModalWindow } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentColumn } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentTask } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const [createColumn] = boardAPI.useCreateColumnMutation();
  const [createTask] = boardAPI.useCreateTaskMutation();
  const [updateTask] = boardAPI.useUpdateTaskMutation();
  const { dataBoard } = useAppSelector((state) => state.editBoardReducer);

  const clearTextModal = () => {
    setTitle('');
    setDescription('');
    dispatch(reducers.changeIndexOfCurrentColumn(''));
  };

  const closeModalWindow = () => {
    dispatch(reducers.openModalWindow(false));
    clearTextModal();
  };

  useEffect(() => {
    if (nameModalWindow === 'editTask') {
      const indexColumn = currentBoard?.columns.findIndex(
        (column) => column.id === indexOfCurrentColumn
      );
      if (indexColumn !== undefined) {
        const dataCurrentTask = currentBoard?.columns[indexColumn].tasks?.find(
          (item: task) => item.id === indexOfCurrentTask
        );
        if (dataCurrentTask !== undefined) {
          setTitle(dataCurrentTask?.title);
          setDescription(dataCurrentTask?.description);
          setCheckboxChecked(
            dataCurrentTask.title.indexOf(valueForTitleToSaveCheckbox) !== -1 ? true : false
          );
        }
      }
    }
  }, []);

  const handleTitle = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value as string);
  };

  const handleDescription = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setDescription(target.value as string);
  };

  const addNewColumn = async () => {
    if (title.trim()) {
      if (currentBoard?.columns !== undefined) {
        let biggestOrder = -1;
        currentBoard?.columns.map((item) => {
          if (item.order > biggestOrder) biggestOrder = item.order;
        });
        const newOrderForNewColumn = biggestOrder + 1;
        if (newOrderForNewColumn >= 0) {
          await createColumn({
            idBoard: dataBoard.id,
            title: title,
            order: newOrderForNewColumn,
          });
        }
      }
      closeModalWindow();
      clearTextModal();
    }
  };

  const addNewTask = async () => {
    const indexColumn = currentBoard?.columns.findIndex(
      (column) => column.id === indexOfCurrentColumn
    );
    if (title.trim() && description.trim() && indexColumn !== undefined) {
      if (currentBoard?.columns[indexColumn].tasks !== undefined) {
        let biggestOrder = -1;
        currentBoard?.columns[indexColumn].tasks.map((item) => {
          if (item.order > biggestOrder) biggestOrder = item.order;
        });
        const newOrderForNewTask = biggestOrder + 1;
        if (newOrderForNewTask >= 0) {
          await createTask({
            boardId: dataBoard.id,
            columnId: indexOfCurrentColumn,
            title: title,
            order: newOrderForNewTask,
            description: description,
            userId: `${localStorage.getItem('userId')}`,
          });
        }
      }
      closeModalWindow();
      clearTextModal();
    }
  };

  const changeCurrentTask = async () => {
    const indexColumn = currentBoard?.columns.findIndex(
      (column) => column.id === indexOfCurrentColumn
    );
    if (title?.trim() && description?.trim() && indexColumn !== undefined) {
      const currentTaskData = currentBoard?.columns[indexColumn].tasks?.find(
        (item: task) => item.id === indexOfCurrentTask
      );
      closeModalWindow();
      await updateTask({
        userId: currentTaskData?.userId,
        boardId: dataBoard.id,
        columnId: indexOfCurrentColumn,
        currentColumn: indexOfCurrentColumn,
        taskId: indexOfCurrentTask,
        title:
          checkboxChecked === true
            ? `${title}${valueForTitleToSaveCheckbox}`
            : title.split(valueForTitleToSaveCheckbox).join(''),
        description: description,
        order: currentTaskData?.order,
      });
      clearTextModal();
    }
  };

  return (
    <>
      {nameModalWindow === 'addColumn' && (
        <Modal
          open={openModalWindow}
          onClose={closeModalWindow}
          BackdropComponent={Backdrop}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalWindow}>
            <Box
              className={classes.firstModalWindowForNewColumn}
              sx={{ bgcolor: 'background.paper' }}
            >
              <Box className={classes.secondModalWindowForNewColumn}>
                <Stack direction="column" spacing={5}>
                  <Typography gutterBottom variant="h5">
                    {t('addNewColumn')}
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      color="info"
                      id="filled-basic"
                      label={t('tittleOfColumn')}
                      variant="standard"
                      onChange={handleTitle}
                      inputProps={{ maxLength: 20 }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={addNewColumn}>
                      {t('addColumnButton')}
                    </Button>
                    <Button variant="outlined" onClick={closeModalWindow}>
                      {t('cancelColumnButton')}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
      {nameModalWindow === 'addTask' && (
        <Modal
          open={openModalWindow}
          onClose={closeModalWindow}
          BackdropComponent={Backdrop}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalWindow}>
            <Box className={classes.firstModalWindowForTask} sx={{ bgcolor: 'background.paper' }}>
              <Box className={classes.secondModalWindowForTask}>
                <Stack direction="column" spacing={3}>
                  <Typography gutterBottom variant="h5">
                    {t('addNewTask')}
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      color="info"
                      id="filled-basic"
                      label={t('tittleOfTask')}
                      variant="standard"
                      onChange={handleTitle}
                    />
                    <TextField
                      color="info"
                      id="filled-basic"
                      label={t('descriptionOfTask')}
                      variant="standard"
                      multiline
                      rows={4}
                      onChange={handleDescription}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={addNewTask}>
                      {t('addTaskButton')}
                    </Button>
                    <Button variant="outlined" onClick={closeModalWindow}>
                      {t('cancelTaskButton')}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
      {nameModalWindow === 'editTask' && (
        <Modal
          open={openModalWindow}
          onClose={closeModalWindow}
          BackdropComponent={Backdrop}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalWindow}>
            <Box className={classes.firstModalWindowForTask} sx={{ bgcolor: 'background.paper' }}>
              <Box className={classes.secondModalWindowForTask}>
                <Stack direction="column" spacing={3}>
                  <Typography gutterBottom variant="h5">
                    {t('changeTask')}
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      color="info"
                      id="filled-basic"
                      label={t('changeTittleOfTask')}
                      variant="standard"
                      value={title.split(valueForTitleToSaveCheckbox).join('')}
                      onChange={handleTitle}
                    />
                    <TextField
                      color="info"
                      id="filled-basic"
                      label={t('changeDescriptionOfTask')}
                      variant="standard"
                      multiline
                      rows={4}
                      value={description}
                      onChange={handleDescription}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={changeCurrentTask}>
                      {t('editTaskButton')}
                    </Button>
                    <Button variant="outlined" onClick={closeModalWindow}>
                      {t('cancelEditTaskButton')}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
export default ModalWindow;
