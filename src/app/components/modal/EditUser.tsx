import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography,
  Backdrop,
  Fade,
} from '@mui/material';
import { modalSlice } from '../../store/reducers/ModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditUserProfileData, EditUserProfileResponse } from '../../../types';
import { useEffect, useState } from 'react';
import { userAPI } from '../../../services/UserService';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChildModal from './ChildModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 200,
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

export default function EditUser() {
  const { showModal } = modalSlice.actions;
  const { open } = useAppSelector((state) => state.modalReducer);
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [updateProfile, { isLoading: isUpdating, isError, isSuccess }] =
    userAPI.useUserUpdateMutation();
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted, isSubmitSuccessful, touchedFields },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });
  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

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
  }, [touchedFields.name, touchedFields.login, touchedFields.password, touchedFields, isSubmitted]);

  const onSubmit: SubmitHandler<EditUserProfileData> = async (formData) => {
    setMessage('');
    const updateData = { ...formData, userId: auth.userId };
    const response = (await updateProfile(updateData)) as EditUserProfileResponse;
    if (response.error?.status) {
      setMessage(response.error.data.message);
    } else {
      const userId = response.data?.id as string;
      localStorage.setItem('userId', userId);
      dispatch(setUserAuthData({ userId }));
      setMessage('Successful update');
      setTimeout(() => {
        dispatch(showModal(false));
      }, 1500);
    }
  };
  const handleClose = () => {
    setMessage('');
    dispatch(showModal(false));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              padding: { xs: 1, sm: 4 },
              width: { xs: 320, sm: 400 },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <ManageAccountsIcon />
            </Avatar>
            <Typography id="modal-modal-title" component="h2" variant="h5">
              Edit Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.name && true}
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    {...register('name', { required: true, pattern: /^[A-Za-zА-Яа-я]+$/i })}
                  />
                  {errors.name?.type === 'required' && (
                    <FormHelperText component="span" error>
                      Name is required
                    </FormHelperText>
                  )}
                  {errors.name?.type === 'pattern' && (
                    <FormHelperText component="span" error>
                      Name should include letters only
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={errors.login && true}
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    autoComplete="login"
                    {...register('login', {
                      required: true,
                    })}
                  />
                  {errors.login?.type === 'required' && (
                    <FormHelperText component="span" error>
                      Login is required
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && true}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password', { required: true, minLength: 8 })}
                  />
                  {errors.password?.type === 'required' && (
                    <FormHelperText component="span" error>
                      Password is required
                    </FormHelperText>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <FormHelperText component="span" error>
                      Password length should be more than 8 characters
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
                      color: { isSuccess } && '#00FF00',
                      fontSize: '18px',
                    }}
                  >
                    {message}
                  </FormHelperText>
                }
              </Box>

              <Button
                disabled={isDisabled}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
            <Typography color="#ff0000" component="h2" variant="h5">
              Delete Profile
            </Typography>
            <ChildModal />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
