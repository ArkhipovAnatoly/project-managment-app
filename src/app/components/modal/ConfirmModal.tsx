import { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  CircularProgress,
  FormHelperText,
  Avatar,
  useTheme,
  Fade,
  Backdrop,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAPI } from '../../../services/UserService';
import { DeleteUserResponse } from '../../../types';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTranslation } from 'react-i18next';
import { modalSlice } from '../../store/reducers/ModalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal() {
  const { open } = useAppSelector((state) => state.modalReducer);
  const { showModal } = modalSlice.actions;
  const [message, setMessage] = useState<string>('');
  const [deleteUser, { isLoading: isDeleting, isError, isSuccess }] =
    userAPI.useUserDeleteMutation();
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { setUserAuthData } = userAuthSlice.actions;

  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { t } = useTranslation('profile');
  const theme = useTheme();

  const handleClose = () => {
    setMessage('');
    dispatch(showModal(false));
  };
  const handleConfirm = async () => {
    setMessage('');
    const response = (await deleteUser(auth.userId as string)) as DeleteUserResponse;
    if (response.error?.status) {
      setMessage(t('statusErrorUid'));
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      dispatch(setUserAuthData({ userId: '', token: '', isAuth: false }));
      setMessage(t('statusOk'));
      setTimeout(() => {
        dispatch(showModal(false));
        navigator('/');
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        BackdropComponent={Backdrop}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, padding: { xs: 1, sm: 4 }, width: { xs: 300, sm: 350 } }}>
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
              <PriorityHighIcon />
            </Avatar>
            <h3 id="modal-title">{t('message')}</h3>
            <Button
              sx={{
                mt: 2,
                color: theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main',
              }}
              onClick={handleConfirm}
            >
              {t('confirm')}
            </Button>
            <Button
              sx={{ color: theme.palette.mode === 'dark' ? 'secondary.main' : 'primary.main' }}
              onClick={handleClose}
            >
              {t('back')}
            </Button>
            {isDeleting && <CircularProgress size={26} color="error" />}
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
        </Fade>
      </Modal>
    </>
  );
}
