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
import { useSliceMainPage } from '../../app/store/reducers/useSliceMainPage';
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

function ModalWindowMain() {
  const classes = useStyles();

  const { tittleOfCurrentBoard, DescriptionOfCurrentBoard } = useAppSelector(
    (state) => state.mainPage
  );
  const { nameModalWindow } = useAppSelector((state) => state.mainPage);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { openModalWindow } = useAppSelector((state) => state.mainPage);
  const { indexOfCurrentBoard } = useAppSelector((state) => state.mainPage);
  const reducers = useSliceMainPage.actions;
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

  const addNewBoard = () => {
    if (title.trim()) {
      dispatch(
        reducers.addNewBoard({
          index: indexOfCurrentBoard,
          boardTittle: title,
          boardDescription: description,
        })
      );
      closeModalWindow();
      clearTextModal();
    }
  };

  const deleteBoard = () => {
    const deleteBoardIndex = {
      indexBoard: indexOfCurrentBoard,
      boardTittle: indexOfCurrentBoard,
      boardDescription: indexOfCurrentBoard,
    };
    dispatch(reducers.deleteBoard(Number(deleteBoardIndex)));
    // dispatch(reducers.deleteBoard(Number(indexOfCurrentBoard)));
    closeModalWindow();
    clearTextModal();
  };

  return (
    <>
      {nameModalWindow === 'addBoard' && (
        <Modal open={openModalWindow} onClose={closeModalWindow}>
          <Box className={classes.modalWindow}>
            <Box className={classes.modalWindow}>
              <Stack direction="column" spacing={3}>
                <Typography gutterBottom variant="h5">
                  Add new board
                </Typography>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="filled-basic"
                    label="Change tittle of this board"
                    variant="filled"
                    onChange={handleTitle}
                    defaultValue={tittleOfCurrentBoard}
                  />
                  <TextField
                    id="filled-basic"
                    label="Change description of this board"
                    variant="filled"
                    multiline
                    rows={4}
                    onChange={handleDescription}
                    defaultValue={DescriptionOfCurrentBoard}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={addNewBoard}>
                    Add board
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
      {nameModalWindow === 'deleteBoard' && (
        <Dialog
          open={openModalWindow}
          onClose={closeModalWindow}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Are you sure want to delete this board?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              The description that was inside this board will be permanently deleted along with it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteBoard}>Delete board</Button>
            <Button variant="contained" onClick={closeModalWindow}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
export default ModalWindowMain;
