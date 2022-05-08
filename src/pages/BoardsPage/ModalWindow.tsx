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
import { useSliceBoardsPage } from '../../app/reducers/useSliceBoardsPage';
import DialogContent from '@mui/material/DialogContent';

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
    if (title) {
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
    if (title && description) {
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

  const changeCurrentTask = () => {
    const newTitle = title === '' ? titleOfCurrentTask : title;
    const newDescription = description === '' ? DescriptionOfCurrentTask : description;
    if (newTitle || newDescription) {
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
          <Box className={classes.modalWindow}>
            <Box className={classes.modalWindow}>
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
            <Button onClick={deleteColumn}>Agree</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {nameModalWindow === 'addTask' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.modalWindow}>
            <Box className={classes.modalWindow}>
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
            </Box>
          </Box>
        </Modal>
      )}
      {nameModalWindow === 'editTask' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.modalWindow}>
            <Box className={classes.modalWindow}>
              <Stack direction="column" spacing={3}>
                <Typography gutterBottom variant="h5">
                  Edit your task
                </Typography>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="filled-basic"
                    label="Change tittle of this task"
                    variant="filled"
                    onChange={handleTitle}
                    defaultValue={titleOfCurrentTask}
                  />
                  <TextField
                    id="filled-basic"
                    label="Change description of this task"
                    variant="filled"
                    multiline
                    rows={4}
                    onChange={handleDescription}
                    defaultValue={DescriptionOfCurrentTask}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={changeCurrentTask}>
                    Edit task
                  </Button>
                  <Button variant="outlined" onClick={closeModalWindow}>
                    Cancel
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
