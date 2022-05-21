import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  FormHelperText,
  CircularProgress,
  Grow,
  useTheme,
  alpha,
} from '@mui/material';

import Copyright from '../../app/components/share/Copyright';
import { SignUpResponse, UserSignUpData } from '../../types';
import { userAPI } from '../../services/UserService';
import { userAuthSlice } from '../../app/store/reducers/UserAuthSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { t } = useTranslation('account');
  const [signUpUser, { isLoading, isError, isSuccess }] = userAPI.useUserSignUpMutation();
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const {
    isLoading: isChecking,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
  } = userAPI.useGetUserQuery(auth.userId as string);
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
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

  const onSubmit: SubmitHandler<UserSignUpData> = async (formData) => {
    setMessage('');
    const response = (await signUpUser(formData)) as SignUpResponse;
    if (response.error?.status) {
      setMessage(t('statusErrorSignUp'));
    } else {
      const userId = response.data?.id as string;
      localStorage.setItem('userId', userId);
      dispatch(setUserAuthData({ userId }));
      setMessage(t('statusOkSignUp'));
      setTimeout(() => {
        navigator('/signin');
      }, 1500);
    }
  };

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

  useEffect(() => {
    if (isErrorUser) {
      setIsShowForm(true);
      return;
    }
    if (isSuccessUser) {
      dispatch(setUserAuthData({ isAuth: true }));
      navigator('/main');
    }
  }, [isSuccessUser, isErrorUser, dispatch, setUserAuthData, navigator]);

  if (isChecking) {
    return (
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '94%',
          pl: 1,
          pr: 1,
          bgcolor: 'background.default',
        }}
      >
        <Container sx={{ mt: 8 }} maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={30} color="warning" />
          </Box>
        </Container>
      </Box>
    );
  }

  const clickHandler = () => {
    navigator('/');
  };
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '94%',
        pl: 1,
        pr: 1,
        bgcolor: 'background.default',
      }}
    >
      <Grow
        style={{ transformOrigin: '0 0 0' }}
        in={isShowForm}
        {...(isShowForm ? { timeout: 1000 } : {})}
      >
        <Container
          sx={{
            mt: 8,
            boxShadow:
              '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),0px 1px 10px 0px rgb(0 0 0 / 90%)',
          }}
          maxWidth="xs"
        >
          {isShowForm && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                  <PersonAddAltIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t('titleSignUp')}
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
                    {isLoading && <CircularProgress size={26} color="info" />}
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
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t('titleSignUp')}
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link
                        sx={{
                          color: theme.palette.mode === 'dark' ? `${alpha('#fff', 0.7)}` : '',
                        }}
                        component={NavLink}
                        to="/signin"
                        variant="body2"
                      >
                        {t('questionSignUp')}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright />
            </>
          )}
        </Container>
      </Grow>
    </Box>
  );
}
