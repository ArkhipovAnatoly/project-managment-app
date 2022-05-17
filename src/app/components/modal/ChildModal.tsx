import { useState } from 'react';
import { Button, Modal, Box, CircularProgress, FormHelperText, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAPI } from '../../../services/UserService';
import { DeleteUserResponse } from '../../../types';
import { userAuthSlice } from '../../store/reducers/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTranslation } from 'react-i18next';

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

export default function ChildModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [deleteUser, { isLoading: isDeleting, isError, isSuccess }] =
    userAPI.useUserDeleteMutation();
  const { auth } = useAppSelector((state) => state.userAuthReducer);
  const { setUserAuthData } = userAuthSlice.actions;
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { t } = useTranslation('profile');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setMessage('');
    setOpen(false);
  };
  const handleConfirm = async () => {
    setMessage('');
    const response = (await deleteUser(auth.userId as string)) as DeleteUserResponse;
    if (response.error?.status) {
      setMessage(response.error.data.message);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      dispatch(setUserAuthData({ userId: '', token: '', isAuth: false }));
      setMessage(t('status'));
      setTimeout(() => {
        setOpen(false);
        navigator('/');
      }, 2000);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="error" sx={{ mt: 3, mb: 2 }}>
        {t('deleteBtn')}
      </Button>
      <Modal hideBackdrop open={open} onClose={handleClose} aria-labelledby="child-modal-title">
        <Box sx={{ ...style, padding: { xs: 1, sm: 4 }, width: { xs: 300, sm: 350 } }}>
          <Avatar sx={{ m: 1, bgcolor: '#ff0000' }}>
            <PriorityHighIcon />
          </Avatar>
          <h3 id="child-modal-title">{t('message')}</h3>
          <Button onClick={handleConfirm}>{t('confirm')}</Button>
          <Button onClick={handleClose}>{t('back')}</Button>
          {isDeleting && <CircularProgress size={26} color="error" />}
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
      </Modal>
    </>
  );
}
