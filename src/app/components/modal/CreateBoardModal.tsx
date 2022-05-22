import { useState } from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  TextField,
  Typography,
  Grid,
  TextareaAutosize,
  Stack,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createBoardModalSlice } from '../../store/reducers/CreateBoardModalSlice';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateBoardModal() {
  const { open } = useAppSelector((state) => state.createBoardModalReducer);
  const { showCreateBoardModal } = createBoardModalSlice.actions;
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('board');

  const modalClose = () => {
    setMessage('');
    dispatch(showCreateBoardModal(false));
  };

  const createNewBoard = () => {};
  return (
    <Modal
      open={open}
      onClose={modalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography padding={0} id="modal-modal-title" variant="h6" component="h2">
            {t('title')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  autoFocus
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Description" variant="standard" multiline />
              </Grid>
            </Grid>
            <Stack marginTop={4} direction="row" spacing={2}>
              <Button variant="contained" onClick={createNewBoard}>
                {t('add')}
              </Button>
              <Button variant="outlined" onClick={modalClose}>
                {t('cancel')}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
