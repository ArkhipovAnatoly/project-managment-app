import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
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
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

import Copyright from '../../app/components/share/Copyright';
import { SignInResponse, UserSignInData } from '../../types';
import { userAPI } from '../../services/UserService';
import { userAuthSlice } from '../../app/store/reducers/UserAuthSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Footer from '../../app/components/share/Footer/Footer';

export default function SignIn() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [signInUser, { isLoading, isError, isSuccess }] = userAPI.useUserSignInMutation();
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const {
    isLoading: isChecking,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
  } = userAPI.useGetUserQuery(auth.userId as string);
  const { setUserAuthData } = userAuthSlice.actions;

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted, isSubmitSuccessful, touchedFields },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserSignInData> = async (formData) => {
    setMessage('');
    const response = (await signInUser(formData)) as SignInResponse;
    if (response.error?.status) {
      setMessage(response.error.data.message);
    } else {
      const token = response.data?.token as string;
      localStorage.setItem('token', token);
      dispatch(setUserAuthData({ token, isAuth: true, isLogOut: false }));
      setMessage('Successful sign in');
      setTimeout(() => {
        navigator('/main');
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
  }, [touchedFields.login, touchedFields.password, touchedFields, isSubmitted]);

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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Container component="section" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={30} color="warning" />
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Grow
        style={{ transformOrigin: '0 0 0' }}
        in={isShowForm}
        {...(isShowForm ? { timeout: 1000 } : {})}
      >
        <Container
          component="section"
          sx={{ backgroundColor: 'white', marginTop: 8 }}
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                  <TextField
                    error={errors.login && true}
                    margin="normal"
                    required
                    id="Login"
                    label="Login"
                    fullWidth
                    autoComplete="given-login"
                    autoFocus
                    {...register('login', { required: true })}
                  />
                  {errors.login?.type === 'required' && (
                    <FormHelperText component="span" error>
                      Login is required
                    </FormHelperText>
                  )}

                  <TextField
                    error={errors.password && true}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                    Sign In
                  </Button>

                  <Grid container>
                    <Grid item>
                      <Link component={NavLink} to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
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
      <Footer />
    </Box>
  );
}
