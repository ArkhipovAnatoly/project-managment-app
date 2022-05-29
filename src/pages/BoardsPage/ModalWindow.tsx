import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/store/reducers/useSliceBoardsPage';
import DialogContent from '@mui/material/DialogContent';
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
    backgroundColor: '#ffff',
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
    backgroundColor: '#ffff',
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { openModalWindow } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentColumn } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentTask } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();
  const [createColumn] = boardAPI.useCreateColumnMutation();
  const [deleteColumn] = boardAPI.useDeleteColumnMutation();
  const [createTask] = boardAPI.useCreateTaskMutation();
  const [deleteTask] = boardAPI.useDeleteTaskMutation();
  const [updateTask] = boardAPI.useUpdateTaskMutation();

  const clearTextModal = () => {
    setTitle('');
    setDescription('');
    dispatch(reducers.changeIndexOfCurrentColumn(''));
  };

  const closeModalWindow = () => {
    dispatch(reducers.openModalWindow(false));
    clearTextModal();
  };

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
            idBoard: `${localStorage.getItem('idBoard')}`,
            title: title,
            order: newOrderForNewColumn,
          });
        }
      }
      closeModalWindow();
      clearTextModal();
    }
  };

  const deleteCurrentColumn = async () => {
    await deleteColumn({
      boardId: `${localStorage.getItem('idBoard')}`,
      deleteColumnId: indexOfCurrentColumn,
    });
    closeModalWindow();
    clearTextModal();
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
            boardId: `${localStorage.getItem('idBoard')}`,
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

  const deleteCurrentTask = async () => {
    await deleteTask({
      boardId: `${localStorage.getItem('idBoard')}`,
      deleteColumnId: indexOfCurrentColumn,
      deleteTaskId: indexOfCurrentTask,
    });
    closeModalWindow();
    clearTextModal();
  };

  const changeCurrentTask = async () => {
    const indexColumn = currentBoard?.columns.findIndex(
      (column) => column.id === indexOfCurrentColumn
    );
    if (title?.trim() && description?.trim() && indexColumn !== undefined) {
      closeModalWindow();
      await updateTask({
        userId: `${localStorage.getItem('userId')}`,
        boardId: `${localStorage.getItem('idBoard')}`,
        columnId: indexOfCurrentColumn,
        currentColumn: indexOfCurrentColumn,
        taskId: indexOfCurrentTask,
        title: title,
        description: description,
        order: currentBoard?.columns[indexColumn].tasks?.find(
          (item: task) => item.id === indexOfCurrentTask
        )?.order,
      });
      clearTextModal();
    }
  };

  return (
    <>
      {nameModalWindow === 'addColumn' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.firstModalWindowForNewColumn}>
            <Box className={classes.secondModalWindowForNewColumn}>
              <Stack direction="column" spacing={5}>
                <Typography gutterBottom variant="h5">
                  {t('addNewColumn')}
                </Typography>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="filled-basic"
                    label={t('tittleOfColumn')}
                    variant="filled"
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
        </Modal>
      )}
      {nameModalWindow === 'deleteColumn' && (
        <Dialog
          open={openModalWindow}
          onClose={closeModalWindow}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{t('deleteColumnQuest')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t('deleteColumnText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteCurrentColumn}>{t('deleteColumnButton')}</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              {t('cancelColumnButton')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {nameModalWindow === 'addTask' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.firstModalWindowForTask}>
            <Box className={classes.secondModalWindowForTask}>
              <Stack direction="column" spacing={3}>
                <Typography gutterBottom variant="h5">
                  {t('addNewTask')}
                </Typography>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="filled-basic"
                    label={t('tittleOfTask')}
                    variant="filled"
                    onChange={handleTitle}
                  />
                  <TextField
                    id="filled-basic"
                    label={t('descriptionOfTask')}
                    variant="filled"
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
        </Modal>
      )}
      {nameModalWindow === 'deleteTask' && (
        <Dialog
          open={openModalWindow}
          onClose={closeModalWindow}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{t('deleteTaskQuest')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t('deleteTaskText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteCurrentTask}>{t('deleteColumnButton')}</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              {t('cancelTaskButton')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {nameModalWindow === 'editTask' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.firstModalWindowForTask}>
            <Box className={classes.secondModalWindowForTask}>
              <Stack direction="column" spacing={3}>
                <Typography gutterBottom variant="h5">
                  {t('changeTask')}
                </Typography>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="filled-basic"
                    label={t('changeTittleOfTask')}
                    variant="filled"
                    onChange={handleTitle}
                  />
                  <TextField
                    id="filled-basic"
                    label={t('changeDescriptionOfTask')}
                    variant="filled"
                    multiline
                    rows={4}
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
        </Modal>
      )}
    </>
  );
}
export default ModalWindow;
