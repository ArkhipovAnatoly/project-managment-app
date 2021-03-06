import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  TextField,
  Typography,
  Grid,
  Stack,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { BoardData, BoardDataResponse, StatusCode } from '../../../types';
import { boardAPI } from '../../../services/BoardService';
import { useNavigate } from 'react-router-dom';
import { updateBoardModalSlice } from '../../store/reducers/UpdateBoardModalSlice';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import { editBoardSlice } from '../../store/reducers/EditBoardSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 310, sm: 400 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};

export default function CreateBoardModal() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { open } = useAppSelector((state) => state.updateBoardModalReducer);
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  const { setUserAuthData } = userAuthSlice.actions;
  const { t } = useTranslation('board');
  const [updateBoard, { isLoading: isUpdating, isError, isSuccess }] =
    boardAPI.useUpdateBoardMutation();
  const { showUpdateBoardModal } = updateBoardModalSlice.actions;
  const { dataBoard } = useAppSelector((state) => state.editBoardReducer);
  const { setBoardData } = editBoardSlice.actions;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitted, isSubmitSuccessful, touchedFields },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const navigator = useNavigate();

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    dataBoard.title && setValue('title', dataBoard.title);
    dataBoard.description && setValue('description', dataBoard.description);
  }, [dataBoard.title, dataBoard.description, setValue]);

  const onSubmit: SubmitHandler<BoardData> = async (formData) => {
    setMessage('');
    const { title, description } = formData;
    const updateData = {
      description: description.trim(),
      title: title.trim() || ' ',
      id: dataBoard.id,
    };
    const response = (await updateBoard(updateData)) as BoardDataResponse;
    const status = response.error?.status;

    if (status === StatusCode.Unauthorized) {
      setMessage(t('authError'));
      setTimeout(() => {
        setMessage('');
        modalClose();
        localStorage.removeItem('token');
        dispatch(setUserAuthData({ token: '', isAuth: false }));
        navigator('/');
      }, 1500);
      return;
    }

    if (status === StatusCode.BadRequest) {
      setMessage(t('statusErrorBoardUpdate'));
      return;
    }

    setMessage(t('statusUpdateOk'));
    setTimeout(() => {
      dispatch(setBoardData({ title: '', description: '' }));
      setMessage('');
      modalClose();
    }, 1500);
  };
  useEffect(() => {
    if (!isSubmitted || Object.entries(errors).length) {
      setIsDisabled(true);
    } else if (isValid) {
      setIsDisabled(false);
    }
  }, [isSubmitted, isValid, errors]);

  useEffect(() => {
    if (Object.values(touchedFields).some((v) => v === true) && !isSubmitted) {
      setIsDisabled(false);
    }
  }, [touchedFields.title, touchedFields.description, touchedFields, isSubmitted]);

  const modalClose = () => {
    dispatch(setBoardData({ title: '', description: '' }));
    setMessage('');
    reset();
    dispatch(showUpdateBoardModal(false));
  };

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
            {t('titleEdit')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  color="info"
                  error={errors.title && true}
                  autoComplete="given-title"
                  required
                  fullWidth
                  id="title"
                  label="New Title"
                  autoFocus
                  variant="standard"
                  {...register('title', { required: true })}
                />
                {errors.title?.type === 'required' && (
                  <FormHelperText component="span" error>
                    {t('titleEmpty')}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="info"
                  error={errors.description && true}
                  fullWidth
                  label="New Description"
                  id="description"
                  variant="standard"
                  multiline
                  {...register('description', {
                    required: true,
                  })}
                />
                {errors.description?.type === 'required' && (
                  <FormHelperText component="span" error>
                    {t('descriptionEmpty')}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {isUpdating && <CircularProgress size={26} color="info" />}
              {
                <FormHelperText
                  error={isError}
                  component="span"
                  sx={{
                    color: { isSuccess } && 'success.main',
                    fontSize: '18px',
                  }}
                >
                  {message}
                </FormHelperText>
              }
            </Box>
            <Stack marginTop={4} direction="row" spacing={2}>
              <Button disabled={isDisabled} type="submit" variant="contained">
                {t('update')}
              </Button>
              <Button variant="contained" onClick={modalClose}>
                {t('cancel')}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
