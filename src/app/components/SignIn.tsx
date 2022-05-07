import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Typography, FormHelperText } from '@mui/material';
import Copyright from './share/Copyright';
import { FormSignInValues } from '../../types';

export default function SignIn() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
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

  const onSubmit: SubmitHandler<FormSignInValues> = (formData) => {
    console.log(formData);
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

  return (
    <Container component="main" maxWidth="xs">
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
    </Container>
  );
}
