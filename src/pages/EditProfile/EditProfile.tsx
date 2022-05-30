import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Link,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userAPI } from '../../services/UserService';
import { userAuthSlice } from '../../app/store/reducers/UserAuthSlice';
import { EditUserProfileData, EditUserProfileResponse, StatusCode } from '../../types';
import { confirmModalSlice } from '../../app/store/reducers/ConfirmModalSlice';
import ConfirmModal from '../../app/components/modal/ConfirmModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: 300, sm: 400 },
  transform: 'translate(-50%, -50%)',
  marginRight: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bgcolor: 'background.paper',
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),0px 1px 10px 0px rgb(0 0 0 / 90%)',

  padding: { xs: 1, sm: 3 },
};

export default function EditProfile() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const [updateProfile, { isLoading: isUpdating, isError, isSuccess }] =
    userAPI.useUserUpdateMutation();
  const { showConfirmModal } = confirmModalSlice.actions;
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');
  const theme = useTheme();
  const navigator = useNavigate();
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
    const { name, login, password } = formData;
    const updateData = { name: name.trim(), login: login.trim(), password, userId: auth.userId };
    const response = (await updateProfile(updateData)) as EditUserProfileResponse;
    const status = response.error?.status;

    if (status === StatusCode.Unauthorized) {
      setMessage(t('authError'));
      setTimeout(() => {
        setMessage('');
        localStorage.removeItem('token');
        dispatch(setUserAuthData({ token: '', isAuth: false }));
        dispatch(showConfirmModal({ open: false, what: '' }));
        navigator('/');
      }, 1500);
      return;
    }
    if (status !== StatusCode.OK) {
      setMessage(t('statusErrorUserUpdate'));
      return;
    }

    const userId = response.data?.id as string;
    localStorage.setItem('userId', userId);
    dispatch(setUserAuthData({ userId }));
    setMessage(t('statusUpdateOk'));
    setTimeout(() => {
      setMessage('');
      dispatch(showConfirmModal({ open: false, what: '' }));
    }, 1500);
  };
  const openModal = () => {
    dispatch(showConfirmModal({ open: true, what: '' }));
  };

  return (
    <>
      <Box
        className="app"
        sx={{
          minHeight: 'calc(100vh - 78px)',
          bgcolor: 'background.default',
        }}
      >
        <Box component="section" sx={style}>
          <Link
            sx={{ m: 1, cursor: 'pointer', alignSelf: 'flex-end' }}
            component={NavLink}
            to="/main"
            underline="none"
          >
            <CloseIcon
              sx={{
                color: theme.palette.mode == 'dark' ? 'common.white' : 'primary.main',
              }}
            />
          </Link>
          <Avatar
            sx={{
              m: 1,
              bgcolor: theme.palette.mode === 'dark' ? 'warning.main' : 'primary.main',
            }}
          >
            <ManageAccountsIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            {t('title')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color="info"
                  error={errors.name && true}
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="Name"
                  label="New Name"
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
                  color="info"
                  error={errors.login && true}
                  required
                  fullWidth
                  id="login"
                  label="New Login"
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
                  color="info"
                  error={errors.password && true}
                  required
                  fullWidth
                  label="New Password"
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
          <Button sx={{ mt: 2, mb: 2 }} onClick={openModal} variant="outlined" color="error">
            {t('delete')}
          </Button>
          <ConfirmModal title={t('question')} type="profile" />
        </Box>
      </Box>
    </>
  );
}
