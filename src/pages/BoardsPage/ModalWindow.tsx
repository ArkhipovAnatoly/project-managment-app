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
    height: '50%',
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

  const [titleColumn, setTitleColumn] = useState('');
  const { openModalWindow } = useAppSelector((state) => state.boardsPage);
  const reducers = useSliceBoardsPage.actions;
  const dispatch = useAppDispatch();

  const clearTextModal = () => setTitleColumn('');

  const closeModalWindow = () => {
    dispatch(reducers.openModalWindow(false));
    clearTextModal();
  };

  const handleTitle = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setTitleColumn(target.value as string);
  };

  const addNewColumn = () => {
    if (titleColumn) {
      dispatch(reducers.addNewColumn(titleColumn));
      closeModalWindow();
      clearTextModal();
    }
  };

  return (
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
                label="Tittle"
                variant="filled"
                onChange={handleTitle}
                defaultValue={titleColumn}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={addNewColumn}>
                Apply
              </Button>
              <Button variant="outlined" onClick={closeModalWindow}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
export default ModalWindow;
