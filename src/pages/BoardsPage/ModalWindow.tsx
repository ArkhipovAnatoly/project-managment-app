import { Button, Modal, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSliceBoardsPage } from '../../app/reducers/useSliceBoardsPage';

const useStyles = makeStyles({
  modalWindow: {
    width: '70%',
    height: '75%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffff',
    borderRadius: 3,
    outline: 'none',
  },
});

function ModalWindow() {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { openModalWindow } = useAppSelector((state) => state.boardsPage);
  const { nameModalWindow } = useAppSelector((state) => state.boardsPage);
  const { idxOfColumnForNewTask } = useAppSelector((state) => state.boardsPage);
  const { idxOfTaskForNewTask } = useAppSelector((state) => state.boardsPage);
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
    if (title) {
      dispatch(reducers.addNewColumn(title));
      closeModalWindow();
      clearTextModal();
    }
  };

  const addNewTask = () => {
    if (title && description) {
      dispatch(
        reducers.addNewTask({
          index: idxOfColumnForNewTask,
          taskTittle: title,
          taskOption: description,
        })
      );
      closeModalWindow();
      clearTextModal();
    }
  };

  const changeCurrentTask = () => {
    if (title && description) {
      console.log(idxOfTaskForNewTask);

      dispatch(
        reducers.changeTask({
          indexColumn: idxOfColumnForNewTask,
          indexTask: idxOfTaskForNewTask,
          taskTittle: title,
          taskOption: description,
        })
      );
      closeModalWindow();
      clearTextModal();
    }
  };

  return (
    <Modal open={openModalWindow} onClose={closeModalWindow}>
      <Box className={classes.modalWindow}>
        <Box className={classes.modalWindow}>
          {nameModalWindow === 'column' && (
            <Stack direction="column" spacing={5}>
              <Typography gutterBottom variant="h5">
                Add new column
              </Typography>
              <Stack direction="column" spacing={2}>
                <TextField
                  id="filled-basic"
                  label="Tittle of new column"
                  variant="filled"
                  onChange={handleTitle}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={addNewColumn}>
                  Add column
                </Button>
                <Button variant="outlined" onClick={closeModalWindow}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
          {nameModalWindow === 'addtask' && (
            <Stack direction="column" spacing={3}>
              <Typography gutterBottom variant="h5">
                Add new task
              </Typography>
              <Stack direction="column" spacing={2}>
                <TextField
                  id="filled-basic"
                  label="Tittle of new task"
                  variant="filled"
                  onChange={handleTitle}
                />
                <TextField
                  id="filled-basic"
                  label="Description of new task"
                  variant="filled"
                  multiline
                  rows={4}
                  onChange={handleDescription}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={addNewTask}>
                  Add task
                </Button>
                <Button variant="outlined" onClick={closeModalWindow}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
          {nameModalWindow === 'task' && (
            <Stack direction="column" spacing={3}>
              <Typography gutterBottom variant="h5">
                Current Task
              </Typography>
              <Stack direction="column" spacing={2}>
                <TextField
                  id="filled-basic"
                  label="Change tittle of this task"
                  variant="filled"
                  onChange={handleTitle}
                />
                <TextField
                  id="filled-basic"
                  label="Change description of this task"
                  variant="filled"
                  multiline
                  rows={4}
                  onChange={handleDescription}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={changeCurrentTask}>
                  Add task
                </Button>
                <Button variant="outlined" onClick={closeModalWindow}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
export default ModalWindow;
