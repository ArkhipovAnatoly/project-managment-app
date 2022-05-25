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

function ModalWindow() {
  const classes = useStyles();
  const { t, i18n } = useTranslation('modalWindowBoardsPage');

  const { titleOfCurrentTask, DescriptionOfCurrentTask } = useAppSelector(
    (state) => state.boardsPage
  );
  const { nameModalWindow } = useAppSelector((state) => state.boardsPage);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { openModalWindow } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentColumn } = useAppSelector((state) => state.boardsPage);
  const { indexOfCurrentTask } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

  const clearTextModal = () => {
    setTitle('');
    setDescription('');
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

  const addNewColumn = () => {
    if (title.trim()) {
      dispatch(reducers.addNewColumn(title));
      closeModalWindow();
      clearTextModal();
    }
  };

  const deleteColumn = () => {
    dispatch(reducers.deleteColumn(Number(indexOfCurrentColumn)));
    closeModalWindow();
    clearTextModal();
  };

  const addNewTask = () => {
    if (title.trim()) {
      dispatch(
        reducers.addNewTask({
          index: indexOfCurrentColumn,
          taskTittle: title,
          taskOption: description,
        })
      );
      closeModalWindow();
      clearTextModal();
    }
  };

  const deleteTask = () => {
    const deleteTaskIndex = {
      indexColumn: indexOfCurrentColumn,
      indexTask: indexOfCurrentTask,
    };
    dispatch(reducers.deleteTask(deleteTaskIndex));
    closeModalWindow();
    clearTextModal();
  };

  const changeCurrentTask = () => {
    const newTitle = title === '' ? titleOfCurrentTask : title;
    const newDescription = description === '' ? DescriptionOfCurrentTask : description;
    if (newTitle?.trim() || newDescription?.trim()) {
      dispatch(
        reducers.changeTask({
          indexColumn: indexOfCurrentColumn,
          indexTask: indexOfCurrentTask,
          taskTittle: newTitle,
          taskOption: newDescription,
        })
      );
      closeModalWindow();
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
          <DialogTitle>{'Are you sure want to delete this column?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              All tasks that were inside of this column are permanently deleted along with it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteColumn}>Delete Column</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              Cancel
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
          <DialogTitle>{'Are you sure want to delete this task?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              The description that was inside this task will be permanently deleted along with it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteTask}>Delete Task</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              Cancel
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
                    defaultValue={titleOfCurrentTask}
                  />
                  <TextField
                    id="filled-basic"
                    label={t('changeDescriptionOfTask')}
                    variant="filled"
                    multiline
                    rows={4}
                    onChange={handleDescription}
                    defaultValue={DescriptionOfCurrentTask}
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
