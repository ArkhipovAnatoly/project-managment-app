import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Typography, FormHelperText, CircularProgress } from '@mui/material';
import Copyright from './share/Copyright';
import { SignUpResponse, UserSignUpData } from '../../types';
import { userAPI } from '../../services/UserService';

export default function SignUp() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [signUpUser, { isLoading, isError, isSuccess }] = userAPI.useUserSignUpMutation();
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
      setMessage(response.error.data.message);
    } else {
      setMessage('Successful sign up');
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

  return (
    <Container component="section" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NavLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
