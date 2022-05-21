import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userAPI } from '../../services/UserService';
import { userAuthSlice } from '../../app/store/reducers/UserAuthSlice';
import { EditUserProfileData, EditUserProfileResponse } from '../../types';
import { modalSlice } from '../../app/store/reducers/ModalSlice';
import ConfirmModal from '../../app/components/modal/ConfirmModal';

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

export default function EditProfile() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const [updateProfile, { isLoading: isUpdating, isError, isSuccess }] =
    userAPI.useUserUpdateMutation();
  const { showModal } = modalSlice.actions;
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');
  const navigator = useNavigate();
  const theme = useTheme();
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
      setMessage(t('update'));
      setTimeout(() => {
        dispatch(showModal(false));
      }, 1500);
    }
  };
  const handleOpen = () => {
    dispatch(showModal(true));
  };

  const clickHandler = () => {
    navigator('/main');
  };

  return (
    <Box
      sx={{
        height: '94%',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="section"
        sx={{
          ...style,
          padding: { xs: 1, sm: 4 },
          width: { xs: 320, sm: 400 },
        }}
      >
        <CloseIcon
          sx={{
            m: 1,
            marginLeft: 'auto',
            cursor: 'pointer',
            color: theme.palette.mode == 'dark' ? 'common.white' : 'primary.main',
          }}
          onClick={clickHandler}
        />
        <Avatar
          sx={{
            m: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'warning.main' : 'primary.main',
          }}
        >
          <ManageAccountsIcon />
        </Avatar>
        <Typography id="modal-modal-title" component="h2" variant="h5">
          {t('title')}
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
                  {t('nameError')}
                </FormHelperText>
              )}
              {errors.name?.type === 'pattern' && (
                <FormHelperText component="span" error>
                  {t('nameErrorLetters')}
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
                  pattern: /^[A-Za-zА-Яа-я0-9]+$/i,
                })}
              />
              {errors.login?.type === 'required' && (
                <FormHelperText component="span" error>
                  {t('loginError')}
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
                  {t('passwordError')}
                </FormHelperText>
              )}
              {errors.password?.type === 'minLength' && (
                <FormHelperText component="span" error>
                  {t('passwordLengthError')}
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

          <Button
            disabled={isDisabled}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('update')}
          </Button>
          <Divider sx={{ my: 0.5 }} />
        </Box>
        <Button sx={{ mt: 2 }} onClick={handleOpen} variant="outlined" color="error">
          {t('delete')}
        </Button>
        <ConfirmModal />
      </Box>
    </Box>
  );
}
